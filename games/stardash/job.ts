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
 * Information about a unit's job.
 */
export class Job extends GameObject {

    /**
     * How many combined resources a unit with this Job can hold at once.
     */
    public readonly carryLimit!: number;

    /**
     * The amount of damage this Job does per attack.
     */
    public readonly damage!: number;

    /**
     * The amount of starting health this Job has.
     */
    public readonly energy!: number;

    /**
     * The distance this job can move per turn.
     */
    public readonly moves!: number;

    /**
     * The distance at which this job can effect things.
     */
    public readonly range!: number;

    /**
     * The reserve the martyr use to protect allies.
     */
    public readonly shield!: number;

    /**
     * The Job title. 'corvette', 'missileboat', 'martyr', 'transport', or
     * 'miner'. (in this order from 0-4).
     */
    public readonly title!: "corvette" | "missileboat" | "martyr" | "transport" | "miner";

    /**
     * How much money it costs to spawn a unit.
     */
    public readonly unitCost!: number;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
