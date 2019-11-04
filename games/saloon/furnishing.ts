// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * An furnishing in the Saloon that must be pathed around, or destroyed.
 */
export class Furnishing extends GameObject {

    /**
     * How much health this Furnishing currently has.
     */
    public readonly health!: number;

    /**
     * If this Furnishing has been destroyed, and has been removed from the
     * game.
     */
    public readonly isDestroyed!: boolean;

    /**
     * True if this Furnishing is a piano and can be played, False otherwise.
     */
    public readonly isPiano!: boolean;

    /**
     * If this is a piano and a Cowboy is playing it this turn.
     */
    public readonly isPlaying!: boolean;

    /**
     * The Tile that this Furnishing is located on.
     */
    public readonly tile!: Tile | undefined;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
