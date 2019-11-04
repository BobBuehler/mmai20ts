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
 * A port on a Tile.
 */
export class Port extends GameObject {

    /**
     * For players, how much more gold this Port can spend this turn. For
     * merchants, how much gold this Port has accumulated (it will spawn a ship
     * when the Port can afford one).
     */
    public readonly gold!: number;

    /**
     * (Merchants only) How much gold was invested into this Port. Investment
     * determines the strength and value of the next ship.
     */
    public readonly investment!: number;

    /**
     * The owner of this Port, or null if owned by merchants.
     */
    public readonly owner!: Player | undefined;

    /**
     * The Tile this Port is on.
     */
    public readonly tile!: Tile;

    /**
     * Spawn a Unit on this port.
     * @param type What type of Unit to create ('crew' or 'ship').
     * @returns True if Unit was created successfully, false otherwise.
     */
    public async spawn(type: "crew" | "ship"): Promise<boolean> {
        return this.runOnServer("spawn", {
            type,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
