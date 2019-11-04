// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Nest } from "./nest";
import { Spiderling } from "./spiderling";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A connection (edge) to a Nest (node) in the game that Spiders can converge on
 * (regardless of owner). Spiders can travel in either direction on Webs.
 */
export class Web extends GameObject {

    /**
     * How long this Web is, i.e., the distance between its nestA and nestB.
     */
    public readonly length!: number;

    /**
     * How much weight this Web currently has on it, which is the sum of all its
     * Spiderlings weight.
     */
    public readonly load!: number;

    /**
     * The first Nest this Web is connected to.
     */
    public readonly nestA!: Nest | undefined;

    /**
     * The second Nest this Web is connected to.
     */
    public readonly nestB!: Nest | undefined;

    /**
     * All the Spiderlings currently moving along this Web.
     */
    public readonly spiderlings!: Spiderling[];

    /**
     * How much weight this Web can take before snapping and destroying itself
     * and all the Spiders on it.
     */
    public readonly strength!: number;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
