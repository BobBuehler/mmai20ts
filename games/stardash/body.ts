// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Player } from "./player";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A celestial body located within the game.
 */
export class Body extends GameObject {

    /**
     * The amount of material the object has, or energy if it is a planet.
     */
    public readonly amount!: number;

    /**
     * The type of celestial body it is. Either 'planet', 'asteroid', or 'sun'.
     */
    public readonly bodyType!: "planet" | "asteroid" | "sun";

    /**
     * The type of material the celestial body has. Either 'none', 'genarium',
     * 'rarium', 'legendarium', or 'mythicite'.
     */
    public readonly materialType!: "none" | "genarium" | "rarium" | "legendarium" | "mythicite";

    /**
     * The Player that owns and can control this Body.
     */
    public readonly owner!: Player | undefined;

    /**
     * The radius of the circle that this body takes up.
     */
    public readonly radius!: number;

    /**
     * The x value this celestial body is on.
     */
    public readonly x!: number;

    /**
     * The y value this celestial body is on.
     */
    public readonly y!: number;

    /**
     * The x value of this body a number of turns from now. (0-how many you
     * want).
     * @param num The number of turns in the future you wish to check.
     * @returns The x position of the body the input number of turns in the
     * future.
     */
    public async nextX(num: number): Promise<number> {
        return this.runOnServer("nextX", {
            num,
        });
    }

    /**
     * The x value of this body a number of turns from now. (0-how many you
     * want).
     * @param num The number of turns in the future you wish to check.
     * @returns The x position of the body the input number of turns in the
     * future.
     */
    public async nextY(num: number): Promise<number> {
        return this.runOnServer("nextY", {
            num,
        });
    }

    /**
     * Spawn a unit on some value of this celestial body.
     * @param x The x value of the spawned unit.
     * @param y The y value of the spawned unit.
     * @param title The job title of the unit being spawned.
     * @returns True if successfully taken, false otherwise.
     */
    public async spawn(
        x: number,
        y: number,
        title: string,
    ): Promise<boolean> {
        return this.runOnServer("spawn", {
            x,
            y,
            title,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
