import { NamedEvent, StartEvent, LobbiedEvent, RanEvent, ClientEvent, ServerEvent, OrderEvent, DeltaEvent, InvalidEvent, FatalEvent, OverEvent } from "@cadre/ts-utils/cadre";
import chalk from "chalk";
import { Socket } from "net";
import { BaseAI } from "./base-ai";
import { BaseGame } from "./base-game";
import { BaseGameObject } from "./base-game-object";
import { BaseGameManager } from "./game-manager";
import { ErrorCode, handleError } from "./handle-error";
import * as Serializer from "./serializer";

const EOT_CHAR = String.fromCharCode(4);

// tslint:disable:no-console

/**
 * Talks to the server receiving game information and sending commands to
 * execute via TCP socket. Clients perform no game logic
 */
export class Client {
    /** The manager of the game. */
    public gameManager?: BaseGameManager;

    /** The host name we are connected to. */
    private host = "";

    /** If we should print network IO to the console. */
    private printIO = false;

    /** Cached string awaiting and EOT_CHAR to parse into an event string. */
    private awaitingEOT = "";

    /**
     * String event names to a list of resolve promises to resolve when that
     * event happens from the network.
     */
    private awaitingEvents: {
        [event: string]: Array<(value: any) => void> | undefined;
    } = {};

    /** If the client will resolve orders (if the AI has started). */
    private acceptingOrders = false;

    /** Orders cached that will be fired once we are accepting orders. */
    private cachedOrders: any[] = [];

    /** The net.Socket we use for network communication. */
    private socket?: Socket;

    /** The game this client is playing. */
    private game?: BaseGame;

    /** The AI this client is communicating on behalf of. */
    private ai?: BaseAI;

    /**
     * Connects this client to some remote game server
     * @param host The host name to connect to.
     * @param port The port to connect to.
     * @param options An object of key/value options for the connection.
     * @returns A promise that resolves if the connection is successful.
     * If it is not the promise is **not** rejected. Instead the process
     * exits.
     */
    public connect(host: string, port: number, options: {
        printIO: boolean;
    }): Promise<void> {
        return new Promise((resolve, reject) => {
            this.host = host;
            this.printIO = options.printIO;

            console.log(chalk.cyan(`Connecting to: ${host}:${port}`));

            try {
                this.socket = new Socket();
                this.socket.connect({ host, port });
            }
            catch (err) {
                return handleError(
                    ErrorCode.COULD_NOT_CONNECT,
                    err,
                    `Could not connect to ${host}:${port}.`,
                );
            }

            this.socket.on("connect", () => {
                resolve();
            });

            const disconnected = (message: string) => () => {
                handleError(ErrorCode.DISCONNECTED_UNEXPECTEDLY, message);
            };

            this.socket.on("error", disconnected("Socket errored unexpectedly"));
            this.socket.on("close", disconnected("Server closed connection"));

            this.socket.on("data", (data) => {
                this.onData(data.toString());
            });
        });
    }

    /**
     * Used to setup the client with its game related instances.
     * @param ai The AI this client will control.
     * @param game The Game this client will control.
     * @param gameManager The GameManager this client will control.
     */
    public setup(
        ai: BaseAI,
        game: BaseGame,
        gameManager: BaseGameManager,
    ): void {
        this.ai = ai;
        this.game = game;
        this.gameManager = gameManager;
    }

    /**
     * Sends an event with data to the game server.
     * @param event The name of the event to send
     * @param data Optional data to send with the event.
     */
    public send<T extends ClientEvent>(event: T["event"], data: T["data"]): void {
        this.sendRaw(
            JSON.stringify({
                sentTime: (new Date()).getTime(),
                event,
                data: Serializer.serialize(data as {}),
            }) + EOT_CHAR,
        );
    }

    /**
     * Runs some game logic on the game server on behalf of a game object.
     * @param caller The game object calling the function.
     * @param functionName The name of the function to run for the caller.
     * @param args An object of key/values as parameters for the function.
     * @returns A promise that eventually resolves when the run logic has been
     * ran with the "return" value.
     */
    public async runOnServer(caller: BaseGameObject, functionName: string, args: {
        [key: string]: any;
    }): Promise<any> {
        this.send("run", {
            caller,
            functionName,
            args,
        });

        const ranData = await this.waitForEvent("ran");
        return Serializer.deSerialize(ranData, this.game!);
    }

    /** Waits for the named event to resolve with the actual game name. */
    public waitForEvent(event: "named"): Promise<NamedEvent["data"]>;

    /** Waits for the start event with our player's ID. */
    public waitForEvent(event: "start"): Promise<Required<StartEvent["data"]>>;

    /** Waits for the lobbied event which contains game information. */
    public waitForEvent(event: "lobbied"): Promise<LobbiedEvent["data"]>;

    /** Waits for a ran event to resolve our run commands. */
    public waitForEvent(event: "ran"): Promise<RanEvent["data"]>;

    /** Waits for an event to resolve something. */
    public waitForEvent(event: string): Promise<ServerEvent["data"]> {
        return new Promise((resolve, reject) => {
            if (!this.awaitingEvents[event]) {
                this.awaitingEvents[event] = [];
            }

            this.awaitingEvents[event]!.push(resolve);
        });
    }

    /**
     * Invoked to disconnect this client from the game server (if connected).
     */
    public disconnect(): void {
        if (this.socket) {
            try {
                this.socket.removeAllListeners("close");
                this.socket.removeAllListeners("error");

                this.socket.destroy();
            }
            catch (err) {
                // Ignore errors on disconnecting; as this should only happen
                // during times we don't care about error, such as handleError()
            }
        }
    }

    /**
     * Invoked to start accepting orders for the AI.
     */
    public acceptOrders(): void {
        this.acceptingOrders = true;
        for (const order of this.cachedOrders) {
            this.autoHandleOrder(order);
        }
    }

    /**
     * Sends a raw string to the game server
     * @param str The string to send.
     */
    private sendRaw(str: string): void {
        if (!this.socket) {
            throw new Error("Cannot write to socket that has not been initialized");
        }

        if (this.printIO) {
            console.log(chalk.magenta(`TO SERVER <-- ${str}`));
        }

        try {
            this.socket.write(str);
        }
        catch (err) {
            handleError(
                ErrorCode.DISCONNECTED_UNEXPECTEDLY,
                err,
                "Could not send string through server.",
            );
        }
    }

    /**
     * A callback invoked when any data is received from the game server.
     * @param data The data received, unparsed and potentially a part of a
     * longer event.
     */
    private onData(data: string): void {
        if (this.printIO) {
            console.log(chalk.magenta(`FROM SERVER --> ${data}`));
        }

        const unparsedEvents = (this.awaitingEOT + data).split(EOT_CHAR);

        // The last element does not have an EOT_CHAR yet, so cache it
        this.awaitingEOT = unparsedEvents.pop()!; // There will always be at least 1 element

        for (const sent of unparsedEvents) {
            let parsed: any;
            try {
                parsed = JSON.parse(sent);
            }
            catch (err) {
                handleError(ErrorCode.MALFORMED_JSON, err, `Error parsing json: '${sent}'.`);
            }

            const callbacks = this.awaitingEvents[parsed.event];

            if (callbacks) {
                for (const callback of callbacks) {
                    callback(parsed.data);
                }

                continue;
            }

            if (this.tryToAutoHandle(parsed)) {
                continue;
            }

            return handleError(
                ErrorCode.UNKNOWN_EVENT_FROM_SERVER,
                `Cannot handle event '${parsed.event}'.`,
            );
        }
    }

    // --- auto handle events --- \\

    /**
     * Tries to auto handle an event.
     * @param event The event name to attempt to automatically handle.
     * @param data The data that game with the event (if any).
     * @returns True if the event was automatically handled, false otherwise.
     */
    private tryToAutoHandle(event: ServerEvent): boolean {
        switch (event.event) {
            case "order":
                this.autoHandleOrder(event.data);
                return true;
            case "delta":
                this.autoHandleDelta(event.data);
                return true;
            case "invalid":
                this.autoHandleInvalid(event.data);
                return true;
            case "fatal":
                this.autoHandleFatal(event.data);
                return true;
            case "over":
                this.autoHandleOver(event.data);
                return true;
            default:
                return false;
        }
    }

    /**
     * Automatically handles an order for the AI
     * @param data The data about the order for the AI.
     * @returns A promise that resolves once the AI has executed the order.
     */
    private async autoHandleOrder(data: OrderEvent["data"]): Promise<void> {
        if (!this.acceptingOrders) {
            this.cachedOrders.push(data);
            return; // it's cached and will be re0invoked later
        }

        let returned: any;
        const aiOrderCallback: (...args: any[]) => Promise<any> | undefined
            = (this.ai as any)[data.name];

        if (aiOrderCallback) {
            const args: any[] = Serializer.deSerialize(data.args, this.game!);
            try {
                returned = await aiOrderCallback.apply(this.ai, args);
            }
            catch (err) {
                handleError(
                    ErrorCode.AI_ERRORED,
                    err,
                    `AI errored in order '${data.name}'.`,
                );
            }
        }
        else {
            handleError(
                ErrorCode.REFLECTION_FAILED,
                `Could not find AI order function '${data.name}'.`,
            );
        }

        this.send("finished", {
            orderIndex: data.index,
            returned,
        });
    }

    /**
     * A delta event to update the game state.
     * @param delta The delta to merge into the game.
     * @returns A promise that resolves once the AI and Game have been updated
     * and have been notified.
     */
    private async autoHandleDelta(delta: DeltaEvent["data"]): Promise<void> {
        try {
            this.gameManager!.applyDeltaState(delta);
        }
        catch (err) {
            handleError(
                ErrorCode.DELTA_MERGE_FAILURE,
                err,
                "Error applying delta state.",
            );
        }

        if (this.ai!.player) { // The AI is ready for updates
            try {
                await this.ai!.gameUpdated();
            }
            catch (err) {
                handleError(
                    ErrorCode.AI_ERRORED,
                    err,
                    "AI errored in gameUpdate() after delta.",
                );
            }
        }
    }

    /**
     * An invalid event was sent back from the game server for the AI to know.
     * @param data Contains a human readable message as to why the run was
     * invalid.
     * @returns A promise that resolves once the AI has handled it.
     */
    private autoHandleInvalid(data: InvalidEvent["data"]): void {
        try {
            this.ai!.invalid(data.message);
        }
        catch (err) {
            handleError(ErrorCode.AI_ERRORED, err, "AI errored in invalid().");
        }
    }

    /**
     * A fatal event on the game server so we must close down.
     * @param data Contains a human readable message as to why the game server
     * encountered a fatal event.
     * @returns This never returns, process.exit will be invoked instead
     */
    private autoHandleFatal(data: FatalEvent["data"]): never {
        return handleError(
            ErrorCode.FATAL_EVENT,
            `Got fatal event from server: ${data.message}`,
        );
    }

    /**
     * Handles when the game is over, and closes the client
     * @param data No important data is sent to us.
     * @returns. This never resolves as the client exits after the AI is
     * notified.
     */
    private autoHandleOver(data: OverEvent["data"]): never {
        const won = this.ai!.player.won;
        const reason = won ? this.ai!.player.reasonWon : this.ai!.player.reasonLost;

        console.log(chalk.green(
            `Game is over. ${won ? "I Won!" : "I Lost :("} because: ${reason}`,
        ));

        try {
            this.ai!.ended(won, reason);
        }
        catch (err) {
            handleError(ErrorCode.AI_ERRORED, err, "AI errored in ended().");
        }

        if (data.message) {
            const message = data.message.replace("__HOSTNAME__", this.host);
            console.log(chalk.cyan(message));
        }

        this.disconnect();

        return process.exit(0);
    }
}

/**
 * A singleton instance of the Client, as no two clients will ever run
 * concurrently.
 */
export const client = new Client();
