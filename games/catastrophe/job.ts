// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Information about a Unit's job.
 */
export class Job extends GameObject {

    /**
     * The amount of energy this Job normally uses to perform its actions.
     */
    public readonly actionCost!: number;

    /**
     * How many combined resources a Unit with this Job can hold at once.
     */
    public readonly carryLimit!: number;

    /**
     * The number of moves this Job can make per turn.
     */
    public readonly moves!: number;

    /**
     * The amount of energy normally regenerated when resting at a shelter.
     */
    public readonly regenRate!: number;

    /**
     * The Job title.
     */
    public readonly title!: "fresh human" | "cat overlord" | "soldier" | "gatherer" | "builder" | "missionary";

    /**
     * The amount of food per turn this Unit consumes. If there isn't enough
     * food for every Unit, all Units become starved and do not consume food.
     */
    public readonly upkeep!: number;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
