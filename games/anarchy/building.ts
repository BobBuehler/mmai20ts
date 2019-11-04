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
 * A basic building. It does nothing besides burn down. Other Buildings inherit
 * from this class.
 */
export class Building extends GameObject {

    /**
     * When true this building has already been bribed this turn and cannot be
     * bribed again this turn.
     */
    public readonly bribed!: boolean;

    /**
     * The Building directly to the east of this building, or null if not
     * present.
     */
    public readonly buildingEast!: Building | undefined;

    /**
     * The Building directly to the north of this building, or null if not
     * present.
     */
    public readonly buildingNorth!: Building | undefined;

    /**
     * The Building directly to the south of this building, or null if not
     * present.
     */
    public readonly buildingSouth!: Building | undefined;

    /**
     * The Building directly to the west of this building, or null if not
     * present.
     */
    public readonly buildingWest!: Building | undefined;

    /**
     * How much fire is currently burning the building, and thus how much damage
     * it will take at the end of its owner's turn. 0 means no fire.
     */
    public readonly fire!: number;

    /**
     * How much health this building currently has. When this reaches 0 the
     * Building has been burned down.
     */
    public readonly health!: number;

    /**
     * True if this is the Headquarters of the owning player, false otherwise.
     * Burning this down wins the game for the other Player.
     */
    public readonly isHeadquarters!: boolean;

    /**
     * The player that owns this building. If it burns down (health reaches 0)
     * that player gets an additional bribe(s).
     */
    public readonly owner!: Player;

    /**
     * The location of the Building along the x-axis.
     */
    public readonly x!: number;

    /**
     * The location of the Building along the y-axis.
     */
    public readonly y!: number;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
