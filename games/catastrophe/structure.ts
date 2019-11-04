// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Player } from "./player";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A structure on a Tile.
 */
export class Structure extends GameObject {

    /**
     * The range of this Structure's effect. For example, a radius of 1 means
     * this Structure affects a 3x3 square centered on this Structure.
     */
    public readonly effectRadius!: number;

    /**
     * The number of materials in this Structure. Once this number reaches 0,
     * this Structure is destroyed.
     */
    public readonly materials!: number;

    /**
     * The owner of this Structure if any, otherwise null.
     */
    public readonly owner!: Player | undefined;

    /**
     * The Tile this Structure is on.
     */
    public readonly tile!: Tile | undefined;

    /**
     * The type of Structure this is ('shelter', 'monument', 'wall', 'road',
     * 'neutral').
     */
    public readonly type!: "neutral" | "shelter" | "monument" | "wall" | "road";

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
