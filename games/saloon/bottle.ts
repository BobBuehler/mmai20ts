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
 * A bottle thrown by a bartender at a Tile.
 */
export class Bottle extends GameObject {

    /**
     * The Direction this Bottle is flying and will move to between turns, can
     * be 'North', 'East', 'South', or 'West'.
     */
    public readonly direction!: string;

    /**
     * The direction any Cowboys hit by this will move, can be 'North', 'East',
     * 'South', or 'West'.
     */
    public readonly drunkDirection!: string;

    /**
     * True if this Bottle has impacted and has been destroyed (removed from the
     * Game). False if still in the game flying through the saloon.
     */
    public readonly isDestroyed!: boolean;

    /**
     * The Tile this bottle is currently flying over.
     */
    public readonly tile!: Tile | undefined;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
