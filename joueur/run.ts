import chalk from "chalk";
import { BaseAI, setAISettings } from "./base-ai";
import { BaseGame } from "./base-game";
import { client } from "./client";
import { BaseGameManager } from "./game-manager";
import { ErrorCode, handleError } from "./handle-error";
import { IGameNamespace } from "./interfaces";

/**
 * Transforms a string to kebab case (e.g. `someVariable` --> `some-variable`)
 * @param str the string to transform the case of
 * @returns str now in kebab-case
 */
function kebabCase(str: string): string {
    return str
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/\s+/g, "-")
        .toLowerCase();
}

/**
 * Invoked to actually run the client, connecting to the game server, then
 * playing with the AI and game objects
 * @param args the command line args already parsed into a key/value dict
 */
export async function run(args: {
    server: string;
    port: string;

    game: string;

    aiSettings?: string;
    playerName?: string;
    password?: string;
    session?: string;
    index?: number;
    gameSettings?: string;

    printIO: boolean;
}): Promise<void> {
    const splitServer = args.server.split(":");
    args.server = splitServer[0];
    args.port = splitServer[1] || args.port;

    try {
        await client.connect(args.server, Number(args.port), {
            printIO: args.printIO,
        });
    }
    catch (err) {
        return handleError(
            ErrorCode.COULD_NOT_CONNECT,
            err,
            `Error connecting to ${args.server}:${args.port}.`,
        );
    }

    client.send("alias", args.game);
    const gameName = await client.waitForEvent("named");

    let imported: any;
    try {
        // the game directory should export 1 variable `namespace`s
        imported = await import(`../games/${kebabCase(gameName)}`);
    }
    catch (err) {
        return handleError(
            ErrorCode.GAME_NOT_FOUND,
            err,
            `Cannot find Game '${gameName}'.`,
        );
    }

    const gameNamespace: IGameNamespace | undefined = imported.namespace;

    if (!gameNamespace) {
        return handleError(
            ErrorCode.GAME_NOT_FOUND,
            `Game namespace for '${gameName}' is empty.`,
        );
    }

    if (!gameNamespace.AI
     || !gameNamespace.Game
     || !gameNamespace.GameObjectClasses
    ) {
        return handleError(
            ErrorCode.GAME_NOT_FOUND,
            `Game namespace malformed for '${gameName}'.`,
        );
    }

    let game: BaseGame | undefined;
    try {
        game = new gameNamespace.Game();
    }
    catch (err) {
        return handleError(
            ErrorCode.REFLECTION_FAILED,
            err,
            `Error constructing the Game for '${gameName}'.`,
        );
    }

    let ai: BaseAI | undefined;
    try {
        ai = new gameNamespace.AI(game);
    }
    catch (err) {
        return handleError(
            ErrorCode.REFLECTION_FAILED,
            err,
            `Error constructing the AI for '${gameName}'.`,
        );
    }

    const gameManager = new BaseGameManager(
        game,
        gameNamespace.GameObjectClasses,
    );

    client.setup(ai, game, gameManager);

    setAISettings(ai, args.aiSettings || "");

    client.send("play", {
        gameName,
        password: args.password,
        requestedSession: args.session,
        clientType: "TypeScript",
        playerName: args.playerName
                 || ai.getName()
                 || "TypeScript Player",
        playerIndex: args.index,
        gameSettings: args.gameSettings,
    });

    const lobbyData = await client.waitForEvent("lobbied");

    // tslint:disable-next-line:no-console
    console.log(chalk.cyan(
        `In lobby for game '${lobbyData.gameName}' in`
      + ` session '${lobbyData.gameSession}'.`,
    ));

    gameManager.serverConstants = lobbyData.constants;

    // NOTE: if we try to use async/await syntax here it does NOT work
    // instead the order will execute before control is returned after this
    // waitForEvent("start") to resolve... for some reason...

    const startData = await client.waitForEvent("start");

    // tslint:disable-next-line:no-console
    console.log(chalk.green(`Game is starting.`));

    // player is readonly but that's so competitors don't change it,
    // so cast to any here so we can set it
    (ai as any).player = game.gameObjects[startData.playerID];
    try {
        await ai.start();
        await ai.gameUpdated();
    }
    catch (err) {
        handleError(
            ErrorCode.AI_ERRORED,
            err,
            "AI errored when game initially started.",
        );
    }

    client.acceptOrders();

    // The client will now wait for order(s) asynchronously.
    // The process will exit when "end" is sent from the game server.
}
