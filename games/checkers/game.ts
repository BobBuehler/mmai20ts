// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { BaseGame } from "../../joueur/base-game";
import { Checker } from "./checker";
import { GameObject } from "./game-object";
import { Player } from "./player";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * The simple version of American Checkers. An 8x8 board with 12 checkers on
 * each side that must move diagonally to the opposing side until kinged.
 */
export class Game extends BaseGame {

    /**
     * The height of the board for the Y component of a checker.
     */
    public readonly boardHeight!: number;

    /**
     * The width of the board for X component of a checker.
     */
    public readonly boardWidth!: number;

    /**
     * The checker that last moved and must be moved because only one checker
     * can move during each players turn.
     */
    public readonly checkerMoved!: Checker | undefined;

    /**
     * If the last checker that moved jumped, meaning it can move again.
     */
    public readonly checkerMovedJumped!: boolean;

    /**
     * All the checkers currently in the game.
     */
    public readonly checkers!: Checker[];

    /**
     * The player whose turn it is currently. That player can send commands.
     * Other players cannot.
     */
    public readonly currentPlayer!: Player;

    /**
     * The current turn number, starting at 0 for the first player's turn.
     */
    public readonly currentTurn!: number;

    /**
     * A mapping of every game object's ID to the actual game object. Primarily
     * used by the server and client to easily refer to the game objects via ID.
     */
    public readonly gameObjects!: { [id: string]: GameObject | undefined };

    /**
     * The maximum number of turns before the game will automatically end.
     */
    public readonly maxTurns!: number;

    /**
     * List of all the players in the game.
     */
    public readonly players!: Player[];

    /**
     * A unique identifier for the game instance that is being played.
     */
    public readonly session!: string;

    /**
     * The amount of time (in nano-seconds) added after each player performs a
     * turn.
     */
    public readonly timeAddedPerTurn!: number;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
