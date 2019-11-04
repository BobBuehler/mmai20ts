// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { Body } from "./body";
import { GameObject } from "./game-object";
import { Job } from "./job";
import { Player } from "./player";
import { Projectile } from "./projectile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A unit in the game. May be a corvette, missleboat, martyr, transport, miner.
 */
export class Unit extends GameObject {

    /**
     * Whether or not this Unit has performed its action this turn.
     */
    public readonly acted!: boolean;

    /**
     * The x value this unit is dashing to.
     */
    public readonly dashX!: number;

    /**
     * The y value this unit is dashing to.
     */
    public readonly dashY!: number;

    /**
     * The remaining health of the unit.
     */
    public readonly energy!: number;

    /**
     * The amount of Genarium ore carried by this unit. (0 to job carry capacity
     * - other carried items).
     */
    public readonly genarium!: number;

    /**
     * Tracks wheither or not the ship is dashing or Mining. If true, it cannot
     * do anything else.
     */
    public readonly isBusy!: boolean;

    /**
     * The Job this Unit has.
     */
    public readonly job!: Job;

    /**
     * The amount of Legendarium ore carried by this unit. (0 to job carry
     * capacity - other carried items).
     */
    public readonly legendarium!: number;

    /**
     * The distance this unit can still move.
     */
    public readonly moves!: number;

    /**
     * The amount of Mythicite carried by this unit. (0 to job carry capacity -
     * other carried items).
     */
    public readonly mythicite!: number;

    /**
     * The Player that owns and can control this Unit.
     */
    public readonly owner!: Player | undefined;

    /**
     * The martyr ship that is currently shielding this ship if any.
     */
    public readonly protector!: Unit | undefined;

    /**
     * The amount of Rarium carried by this unit. (0 to job carry capacity -
     * other carried items).
     */
    public readonly rarium!: number;

    /**
     * The sheild that a martyr ship has.
     */
    public readonly shield!: number;

    /**
     * The x value this unit is on.
     */
    public readonly x!: number;

    /**
     * The y value this unit is on.
     */
    public readonly y!: number;

    /**
     * Attacks the specified unit.
     * @param enemy The Unit being attacked.
     * @returns True if successfully attacked, false otherwise.
     */
    public async attack(enemy: Unit): Promise<boolean> {
        return this.runOnServer("attack", {
            enemy,
        });
    }

    /**
     * Causes the unit to dash towards the designated destination.
     * @param x The x value of the destination's coordinates.
     * @param y The y value of the destination's coordinates.
     * @returns True if it moved, false otherwise.
     */
    public async dash(x: number, y: number): Promise<boolean> {
        return this.runOnServer("dash", {
            x,
            y,
        });
    }

    /**
     * allows a miner to mine a asteroid
     * @param body The object to be mined.
     * @returns True if successfully acted, false otherwise.
     */
    public async mine(body: Body): Promise<boolean> {
        return this.runOnServer("mine", {
            body,
        });
    }

    /**
     * Moves this Unit from its current location to the new location specified.
     * @param x The x value of the destination's coordinates.
     * @param y The y value of the destination's coordinates.
     * @returns True if it moved, false otherwise.
     */
    public async move(x: number, y: number): Promise<boolean> {
        return this.runOnServer("move", {
            x,
            y,
        });
    }

    /**
     * tells you if your ship can move to that location from were it is without
     * clipping the sun.
     * @param x The x position of the location you wish to arrive.
     * @param y The y position of the location you wish to arrive.
     * @returns True if pathable by this unit, false otherwise.
     */
    public async safe(x: number, y: number): Promise<boolean> {
        return this.runOnServer("safe", {
            x,
            y,
        });
    }

    /**
     * Attacks the specified projectile.
     * @param missile The projectile being shot down.
     * @returns True if successfully attacked, false otherwise.
     */
    public async shootdown(missile: Projectile): Promise<boolean> {
        return this.runOnServer("shootdown", {
            missile,
        });
    }

    /**
     * Grab materials from a friendly unit. Doesn't use a action.
     * @param unit The unit you are grabbing the resources from.
     * @param amount The amount of materials to you with to grab. Amounts <= 0
     * will pick up all the materials that the unit can.
     * @param material The material the unit will pick up. 'genarium', 'rarium',
     * 'legendarium', or 'mythicite'.
     * @returns True if successfully taken, false otherwise.
     */
    public async transfer(
        unit: Unit,
        amount: number,
        material: "genarium" | "rarium" | "legendarium" | "mythicite",
    ): Promise<boolean> {
        return this.runOnServer("transfer", {
            unit,
            amount,
            material,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
