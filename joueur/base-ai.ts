import { IBasePlayer } from "@cadre/ts-utils/cadre";
import chalk from "chalk";
import { BaseGame } from "./base-game";

/**
 * A helper function to set "private" properties of the AI classes
 * @param ai the AI instance to set settings inside of
 * @param aiSettings unparsed key/value strings to set
 */
export function setAISettings(ai: BaseAI, aiSettings: string): void {
    if (aiSettings) {
        const settings = aiSettings.split("&");
        for (const setting of settings) {
            const kv = setting.split("=");
             // cast to any to use private field
            (ai as any).settings[kv[0]] = kv[1];
        }
    }
}

/**
 * The base interactions all AIs require to work on any game
 */
export class BaseAI {
    /**
     * A static method to get the name of the player for this AI before
     * gameplay starts.
     * @returns A string of their name.
     */
    public getName(): string {
         // Intended to be overridden by the AI class
        return "TypeScript Player";
    }

    /** The base game this AI is player */
    public readonly game!: BaseGame;

    /** The base player this AI controls */
    public readonly player!: IBasePlayer;

    // will be set by the setAISettings function above
    private settings: { [key: string]: string | undefined } = {};

    /**
     * Creates an instance of the AI. Competitors should never invoke this.
     * @hidden
     * @param game The game this AI is playing.
     */
    public constructor(game: BaseGame) {
        this.game = game;
    }

    /**
     * Called when the game starts, after the first delta is sent. Kind of a
     * lazy constructor as at construction time we don't know our player.
     */
    public async start(): Promise<void> {
        // Intended to be overridden by the AI class
    }

    /**
     * Invoked after a delta update happens (for any player in the game).
     */
    public async gameUpdated(): Promise<void> {
        // Intended to be overridden by the AI class
    }

    /**
     * Invoked after this AI sends some run that is invalid
     * @param message The human readable error message about why it did
     * something invalid.
     */
    public async invalid(message: string): Promise<void> {
        // tslint:disable-next-line:no-console
        console.warn(chalk.yellow(`Invalid: ${message}`));
    }

    /**
     * Invoked when the game is over. Think of this as a deconstructor.
     * @param won If this AI's player won the game or not.
     * @param reason The human readable reason why they won or lost the game.
     */
    public async ended(won: boolean, reason: string): Promise<void> {
        // Intended to be overridden by the AI class
    }

    /**
     * Gets an AI setting passed to the program via the `--aiSettings` flag.
     * If the flag was set it will be returned as a string value, undefined
     * otherwise.
     *
     * @param key - The key of the setting you wish to get the value
     * for.
     * @returns A string representing the value set via
     * command line, or undefined if the key was not set.
     */
    public getSetting(key: string): string | undefined {
        return this.settings[key];
    }
}
