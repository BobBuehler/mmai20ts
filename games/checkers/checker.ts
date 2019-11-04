// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Player } from "./player";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A checker on the game board.
 */
export class Checker extends GameObject {

    /**
     * If the checker has been kinged and can move backwards.
     */
    public readonly kinged!: boolean;

    /**
     * The player that controls this Checker.
     */
    public readonly owner!: Player;

    /**
     * The x coordinate of the checker.
     */
    public readonly x!: number;

    /**
     * The y coordinate of the checker.
     */
    public readonly y!: number;

    /**
     * Returns if the checker is owned by your player or not.
     * @returns True if it is yours, false if it is not yours.
     */
    public async isMine(): Promise<boolean> {
        return this.runOnServer("isMine", {
        });
    }

    /**
     * Moves the checker from its current location to the given (x, y).
     * @param x The x coordinate to move to.
     * @param y The y coordinate to move to.
     * @returns Returns the same checker that moved if the move was successful.
     * null otherwise.
     */
    public async move(x: number, y: number): Promise<Checker | undefined> {
        return this.runOnServer("move", {
            x,
            y,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
