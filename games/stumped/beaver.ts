// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Job } from "./job";
import { Player } from "./player";
import { Spawner } from "./spawner";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A beaver in the game.
 */
export class Beaver extends GameObject {

    /**
     * The number of actions remaining for the Beaver this turn.
     */
    public readonly actions!: number;

    /**
     * The amount of branches this Beaver is holding.
     */
    public readonly branches!: number;

    /**
     * The amount of food this Beaver is holding.
     */
    public readonly food!: number;

    /**
     * How much health this Beaver has left.
     */
    public readonly health!: number;

    /**
     * The Job this Beaver was recruited to do.
     */
    public readonly job!: Job;

    /**
     * How many moves this Beaver has left this turn.
     */
    public readonly moves!: number;

    /**
     * The Player that owns and can control this Beaver.
     */
    public readonly owner!: Player;

    /**
     * True if the Beaver has finished being recruited and can do things, False
     * otherwise.
     */
    public readonly recruited!: boolean;

    /**
     * The Tile this Beaver is on.
     */
    public readonly tile!: Tile | undefined;

    /**
     * Number of turns this Beaver is distracted for (0 means not distracted).
     */
    public readonly turnsDistracted!: number;

    /**
     * Attacks another adjacent beaver.
     * @param beaver The Beaver to attack. Must be on an adjacent Tile.
     * @returns True if successfully attacked, false otherwise.
     */
    public async attack(beaver: Beaver): Promise<boolean> {
        return this.runOnServer("attack", {
            beaver,
        });
    }

    /**
     * Builds a lodge on the Beavers current Tile.
     * @returns True if successfully built a lodge, false otherwise.
     */
    public async buildLodge(): Promise<boolean> {
        return this.runOnServer("buildLodge", {
        });
    }

    /**
     * Drops some of the given resource on the beaver's Tile.
     * @param tile The Tile to drop branches/food on. Must be the same Tile that
     * the Beaver is on, or an adjacent one.
     * @param resource The type of resource to drop ('branches' or 'food').
     * @param amount The amount of the resource to drop, numbers <= 0 will drop
     * all the resource type.
     * @returns True if successfully dropped the resource, false otherwise.
     */
    public async drop(
        tile: Tile,
        resource: "branches" | "food",
        amount: number = 0,
    ): Promise<boolean> {
        return this.runOnServer("drop", {
            tile,
            resource,
            amount,
        });
    }

    /**
     * Harvests the branches or food from a Spawner on an adjacent Tile.
     * @param spawner The Spawner you want to harvest. Must be on an adjacent
     * Tile.
     * @returns True if successfully harvested, false otherwise.
     */
    public async harvest(spawner: Spawner): Promise<boolean> {
        return this.runOnServer("harvest", {
            spawner,
        });
    }

    /**
     * Moves this Beaver from its current Tile to an adjacent Tile.
     * @param tile The Tile this Beaver should move to.
     * @returns True if the move worked, false otherwise.
     */
    public async move(tile: Tile): Promise<boolean> {
        return this.runOnServer("move", {
            tile,
        });
    }

    /**
     * Picks up some branches or food on the beaver's tile.
     * @param tile The Tile to pickup branches/food from. Must be the same Tile
     * that the Beaver is on, or an adjacent one.
     * @param resource The type of resource to pickup ('branches' or 'food').
     * @param amount The amount of the resource to drop, numbers <= 0 will
     * pickup all of the resource type.
     * @returns True if successfully picked up a resource, false otherwise.
     */
    public async pickup(
        tile: Tile,
        resource: "branches" | "food",
        amount: number = 0,
    ): Promise<boolean> {
        return this.runOnServer("pickup", {
            tile,
            resource,
            amount,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
