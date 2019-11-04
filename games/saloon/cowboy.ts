// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { Furnishing } from "./furnishing";
import { GameObject } from "./game-object";
import { Player } from "./player";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A person on the map that can move around and interact within the saloon.
 */
export class Cowboy extends GameObject {

    /**
     * If the Cowboy can be moved this turn via its owner.
     */
    public readonly canMove!: boolean;

    /**
     * The direction this Cowboy is moving while drunk. Will be 'North', 'East',
     * 'South', or 'West' when drunk; or '' (empty string) when not drunk.
     */
    public readonly drunkDirection!: string;

    /**
     * How much focus this Cowboy has. Different Jobs do different things with
     * their Cowboy's focus.
     */
    public readonly focus!: number;

    /**
     * How much health this Cowboy currently has.
     */
    public readonly health!: number;

    /**
     * If this Cowboy is dead and has been removed from the game.
     */
    public readonly isDead!: boolean;

    /**
     * If this Cowboy is drunk, and will automatically walk.
     */
    public readonly isDrunk!: boolean;

    /**
     * The job that this Cowboy does, and dictates how they fight and interact
     * within the Saloon.
     */
    public readonly job!: "Bartender" | "Brawler" | "Sharpshooter";

    /**
     * The Player that owns and can control this Cowboy.
     */
    public readonly owner!: Player;

    /**
     * The Tile that this Cowboy is located on.
     */
    public readonly tile!: Tile | undefined;

    /**
     * How many times this unit has been drunk before taking their siesta and
     * reseting this to 0.
     */
    public readonly tolerance!: number;

    /**
     * How many turns this unit has remaining before it is no longer busy and
     * can `act()` or `play()` again.
     */
    public readonly turnsBusy!: number;

    /**
     * Does their job's action on a Tile.
     * @param tile The Tile you want this Cowboy to act on.
     * @param drunkDirection The direction the bottle will cause drunk cowboys
     * to be in, can be 'North', 'East', 'South', or 'West'.
     * @returns True if the act worked, false otherwise.
     */
    public async act(
        tile: Tile,
        drunkDirection: "" | "North" | "East" | "South" | "West" = "",
    ): Promise<boolean> {
        return this.runOnServer("act", {
            tile,
            drunkDirection,
        });
    }

    /**
     * Moves this Cowboy from its current Tile to an adjacent Tile.
     * @param tile The Tile you want to move this Cowboy to.
     * @returns True if the move worked, false otherwise.
     */
    public async move(tile: Tile): Promise<boolean> {
        return this.runOnServer("move", {
            tile,
        });
    }

    /**
     * Sits down and plays a piano.
     * @param piano The Furnishing that is a piano you want to play.
     * @returns True if the play worked, false otherwise.
     */
    public async play(piano: Furnishing): Promise<boolean> {
        return this.runOnServer("play", {
            piano,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
