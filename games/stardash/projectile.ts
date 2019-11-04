// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Player } from "./player";
import { Unit } from "./unit";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Tracks any projectiles moving through space.
 */
export class Projectile extends GameObject {

    /**
     * The remaining health of the projectile.
     */
    public readonly energy!: number;

    /**
     * The amount of remaining distance the projectile can move.
     */
    public readonly fuel!: number;

    /**
     * The Player that owns and can control this Projectile.
     */
    public readonly owner!: Player | undefined;

    /**
     * The unit that is being attacked by this projectile.
     */
    public readonly target!: Unit;

    /**
     * The x value this projectile is on.
     */
    public readonly x!: number;

    /**
     * The y value this projectile is on.
     */
    public readonly y!: number;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
