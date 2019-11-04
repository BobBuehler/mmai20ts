// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Player } from "./player";
import { Spider } from "./spider";
import { Web } from "./web";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A location (node) connected to other Nests via Webs (edges) in the game that
 * Spiders can converge on, regardless of owner.
 */
export class Nest extends GameObject {

    /**
     * The Player that 'controls' this Nest as they have the most Spiders on
     * this nest.
     */
    public readonly controllingPlayer!: Player | undefined;

    /**
     * All the Spiders currently located on this Nest.
     */
    public readonly spiders!: Spider[];

    /**
     * Webs that connect to this Nest.
     */
    public readonly webs!: Web[];

    /**
     * The X coordinate of the Nest. Used for distance calculations.
     */
    public readonly x!: number;

    /**
     * The Y coordinate of the Nest. Used for distance calculations.
     */
    public readonly y!: number;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
