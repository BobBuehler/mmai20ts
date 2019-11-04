// This is where you build your AI for the Chess game.

import { BaseAI } from "../../joueur/base-ai";
import { Game } from "./game";
import { Player } from "./player";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be required here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * This is the class to play the Chess game.
 * This is where you should build your AI.
 */
export class AI extends BaseAI {
    /**
     * The reference to the Game instance this AI is playing.
     */
    public readonly game!: Game;

    /**
     * The reference to the Player this AI controls in the Game.
     */
    public readonly player!: Player;
    /**
     * This is the name you send to the server so your AI
     * will control the player named this string.
     *
     * @returns A string for the name of your player.
     */
    public getName(): string {
        // <<-- Creer-Merge: getName -->>
        return "Chess JavaScript Player";
        // <<-- /Creer-Merge: getName -->>
    }

    /**
     * This is called once the game starts and your AI knows its playerID and game.
     * You can initialize your AI here.
     */
    public async start(): Promise<void> {
        // <<-- Creer-Merge: start -->>
        // pass
        // <<-- /Creer-Merge: start -->>
    }

    /**
     * This is called every time the game's state updates, so if you are tracking anything you can update it here.
     */
    public async gameUpdated(): Promise<void> {
        // <<-- Creer-Merge: gameUpdated -->>
        // pass
        // <<-- /Creer-Merge: gameUpdated -->>
    }

    /**
     * This is called when the game ends, you can clean up your data and dump files here if need be.
     *
     * @param won True means you won, false means you lost.
     * @param reason The human readable string explaining why you won or lost.
     */
    public async ended(won: boolean, reason: string): Promise<void> {
        // <<-- Creer-Merge: ended -->>
        // pass
        // <<-- /Creer-Merge: ended -->>
    }
    /**
     * This is called every time it is this AI.player's turn to make a move.
     * @returns A string in Standard Algebriac Notation (SAN) for the move you
     * want to make. If the move is invalid or not properly formatted you will
     * lose the game.
     */
    public async makeMove(): Promise<string> {
        // <<-- Creer-Merge: makeMove -->>
        // Put your game logic here for makeMove
        return "";
        // <<-- /Creer-Merge: makeMove -->>
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add for your AI
    // <<-- /Creer-Merge: functions -->>
}
