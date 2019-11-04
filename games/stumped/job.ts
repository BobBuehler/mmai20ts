// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { Beaver } from "./beaver";
import { GameObject } from "./game-object";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Information about a beaver's job.
 */
export class Job extends GameObject {

    /**
     * The number of actions this Job can make per turn.
     */
    public readonly actions!: number;

    /**
     * How many combined resources a beaver with this Job can hold at once.
     */
    public readonly carryLimit!: number;

    /**
     * Scalar for how many branches this Job harvests at once.
     */
    public readonly chopping!: number;

    /**
     * How much food this Job costs to recruit.
     */
    public readonly cost!: number;

    /**
     * The amount of damage this Job does per attack.
     */
    public readonly damage!: number;

    /**
     * How many turns a beaver attacked by this Job is distracted by.
     */
    public readonly distractionPower!: number;

    /**
     * The amount of starting health this Job has.
     */
    public readonly health!: number;

    /**
     * The number of moves this Job can make per turn.
     */
    public readonly moves!: number;

    /**
     * Scalar for how much food this Job harvests at once.
     */
    public readonly munching!: number;

    /**
     * The Job title.
     */
    public readonly title!: string;

    /**
     * Recruits a Beaver of this Job to a lodge
     * @param tile The Tile that is a lodge owned by you that you wish to spawn
     * the Beaver of this Job on.
     * @returns The recruited Beaver if successful, null otherwise.
     */
    public async recruit(tile: Tile): Promise<Beaver | undefined> {
        return this.runOnServer("recruit", {
            tile,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
