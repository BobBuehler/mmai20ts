// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Job } from "./job";
import { Player } from "./player";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A unit in the game.
 */
export class Unit extends GameObject {

    /**
     * Whether this Unit has performed its action this turn.
     */
    public readonly acted!: boolean;

    /**
     * The amount of energy this Unit has (from 0.0 to 100.0).
     */
    public readonly energy!: number;

    /**
     * The amount of food this Unit is holding.
     */
    public readonly food!: number;

    /**
     * The Job this Unit was recruited to do.
     */
    public readonly job!: Job;

    /**
     * The amount of materials this Unit is holding.
     */
    public readonly materials!: number;

    /**
     * The tile this Unit is moving to. This only applies to neutral fresh
     * humans spawned on the road. Otherwise, the tile this Unit is on.
     */
    public readonly movementTarget!: Tile | undefined;

    /**
     * How many moves this Unit has left this turn.
     */
    public readonly moves!: number;

    /**
     * The Player that owns and can control this Unit, or null if the Unit is
     * neutral.
     */
    public readonly owner!: Player | undefined;

    /**
     * The Units in the same squad as this Unit. Units in the same squad attack
     * and defend together.
     */
    public readonly squad!: Unit[];

    /**
     * Whether this Unit is starving. Starving Units regenerate energy at half
     * the rate they normally would while resting.
     */
    public readonly starving!: boolean;

    /**
     * The Tile this Unit is on.
     */
    public readonly tile!: Tile | undefined;

    /**
     * The number of turns before this Unit dies. This only applies to neutral
     * fresh humans created from combat. Otherwise, 0.
     */
    public readonly turnsToDie!: number;

    /**
     * Attacks an adjacent Tile. Costs an action for each Unit in this Unit's
     * squad. Units in the squad without an action don't participate in combat.
     * Units in combat cannot move afterwards. Attacking structures will not
     * give materials.
     * @param tile The Tile to attack.
     * @returns True if successfully attacked, false otherwise.
     */
    public async attack(tile: Tile): Promise<boolean> {
        return this.runOnServer("attack", {
            tile,
        });
    }

    /**
     * Changes this Unit's Job. Must be at max energy (100.0) to change Jobs.
     * @param job The name of the Job to change to.
     * @returns True if successfully changed Jobs, false otherwise.
     */
    public async changeJob(
        job: "soldier" | "gatherer" | "builder" | "missionary",
    ): Promise<boolean> {
        return this.runOnServer("changeJob", {
            job,
        });
    }

    /**
     * Constructs a Structure on an adjacent Tile.
     * @param tile The Tile to construct the Structure on. It must have enough
     * materials on it for a Structure to be constructed.
     * @param type The type of Structure to construct on that Tile.
     * @returns True if successfully constructed a structure, false otherwise.
     */
    public async construct(
        tile: Tile,
        type: "neutral" | "shelter" | "monument" | "wall" | "road",
    ): Promise<boolean> {
        return this.runOnServer("construct", {
            tile,
            type,
        });
    }

    /**
     * Converts an adjacent Unit to your side.
     * @param tile The Tile with the Unit to convert.
     * @returns True if successfully converted, false otherwise.
     */
    public async convert(tile: Tile): Promise<boolean> {
        return this.runOnServer("convert", {
            tile,
        });
    }

    /**
     * Removes materials from an adjacent Tile's Structure. You cannot
     * deconstruct friendly structures (see Unit.attack).
     * @param tile The Tile to deconstruct. It must have a Structure on it.
     * @returns True if successfully deconstructed, false otherwise.
     */
    public async deconstruct(tile: Tile): Promise<boolean> {
        return this.runOnServer("deconstruct", {
            tile,
        });
    }

    /**
     * Drops some of the given resource on or adjacent to the Unit's Tile. Does
     * not count as an action.
     * @param tile The Tile to drop materials/food on.
     * @param resource The type of resource to drop ('materials' or 'food').
     * @param amount The amount of the resource to drop. Amounts <= 0 will drop
     * as much as possible.
     * @returns True if successfully dropped the resource, false otherwise.
     */
    public async drop(
        tile: Tile,
        resource: "materials" | "food",
        amount: number = 0,
    ): Promise<boolean> {
        return this.runOnServer("drop", {
            tile,
            resource,
            amount,
        });
    }

    /**
     * Harvests the food on an adjacent Tile.
     * @param tile The Tile you want to harvest.
     * @returns True if successfully harvested, false otherwise.
     */
    public async harvest(tile: Tile): Promise<boolean> {
        return this.runOnServer("harvest", {
            tile,
        });
    }

    /**
     * Moves this Unit from its current Tile to an adjacent Tile.
     * @param tile The Tile this Unit should move to.
     * @returns True if it moved, false otherwise.
     */
    public async move(tile: Tile): Promise<boolean> {
        return this.runOnServer("move", {
            tile,
        });
    }

    /**
     * Picks up some materials or food on or adjacent to the Unit's Tile. Does
     * not count as an action.
     * @param tile The Tile to pickup materials/food from.
     * @param resource The type of resource to pickup ('materials' or 'food').
     * @param amount The amount of the resource to pickup. Amounts <= 0 will
     * pickup as much as possible.
     * @returns True if successfully picked up a resource, false otherwise.
     */
    public async pickup(
        tile: Tile,
        resource: "materials" | "food",
        amount: number = 0,
    ): Promise<boolean> {
        return this.runOnServer("pickup", {
            tile,
            resource,
            amount,
        });
    }

    /**
     * Regenerates energy. Must be in range of a friendly shelter to rest. Costs
     * an action. Units cannot move after resting.
     * @returns True if successfully rested, false otherwise.
     */
    public async rest(): Promise<boolean> {
        return this.runOnServer("rest", {
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
