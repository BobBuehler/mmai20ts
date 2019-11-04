// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { Cowboy } from "./cowboy";
import { GameObject } from "./game-object";
import { Player } from "./player";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * An eager young person that wants to join your gang, and will call in the
 * veteran Cowboys you need to win the brawl in the saloon.
 */
export class YoungGun extends GameObject {

    /**
     * The Tile that a Cowboy will be called in on if this YoungGun calls in a
     * Cowboy.
     */
    public readonly callInTile!: Tile;

    /**
     * True if the YoungGun can call in a Cowboy, false otherwise.
     */
    public readonly canCallIn!: boolean;

    /**
     * The Player that owns and can control this YoungGun.
     */
    public readonly owner!: Player;

    /**
     * The Tile this YoungGun is currently on.
     */
    public readonly tile!: Tile;

    /**
     * Tells the YoungGun to call in a new Cowboy of the given job to the open
     * Tile nearest to them.
     * @param job The job you want the Cowboy being brought to have.
     * @returns The new Cowboy that was called in if valid. They will not be
     * added to any `cowboys` lists until the turn ends. Null otherwise.
     */
    public async callIn(
        job: "Bartender" | "Brawler" | "Sharpshooter",
    ): Promise<Cowboy | undefined> {
        return this.runOnServer("callIn", {
            job,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
