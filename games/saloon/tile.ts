// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { Bottle } from "./bottle";
import { Cowboy } from "./cowboy";
import { Furnishing } from "./furnishing";
import { GameObject } from "./game-object";
import { YoungGun } from "./young-gun";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A Tile in the game that makes up the 2D map grid.
 */
export class Tile extends GameObject {

    /**
     * Gets the valid directions that tiles can be in, "North", "East", "South",
     * or "West"
     * @returns [ "North", "East", "South", "West" ]
     */
    public static directions: ["North", "East", "South", "West"]
                            = ["North", "East", "South", "West"];

    /**
     * The beer Bottle currently flying over this Tile, null otherwise.
     */
    public readonly bottle!: Bottle | undefined;

    /**
     * The Cowboy that is on this Tile, null otherwise.
     */
    public readonly cowboy!: Cowboy | undefined;

    /**
     * The furnishing that is on this Tile, null otherwise.
     */
    public readonly furnishing!: Furnishing | undefined;

    /**
     * If this Tile is pathable, but has a hazard that damages Cowboys that path
     * through it.
     */
    public readonly hasHazard!: boolean;

    /**
     * If this Tile is a balcony of the Saloon that YoungGuns walk around on,
     * and can never be pathed through by Cowboys.
     */
    public readonly isBalcony!: boolean;

    /**
     * The Tile to the 'East' of this one (x+1, y). Null if out of bounds of the
     * map.
     */
    public readonly tileEast!: Tile | undefined;

    /**
     * The Tile to the 'North' of this one (x, y-1). Null if out of bounds of
     * the map.
     */
    public readonly tileNorth!: Tile | undefined;

    /**
     * The Tile to the 'South' of this one (x, y+1). Null if out of bounds of
     * the map.
     */
    public readonly tileSouth!: Tile | undefined;

    /**
     * The Tile to the 'West' of this one (x-1, y). Null if out of bounds of the
     * map.
     */
    public readonly tileWest!: Tile | undefined;

    /**
     * The x (horizontal) position of this Tile.
     */
    public readonly x!: number;

    /**
     * The y (vertical) position of this Tile.
     */
    public readonly y!: number;

    /**
     * The YoungGun on this tile, null otherwise.
     */
    public readonly youngGun!: YoungGun | undefined;

    /**
     * Gets the neighbors of this Tile.
     *
     * @returns The neighboring (adjacent) Tiles to this tile.
     */
    public getNeighbors(): Tile[] {
        const neighbors = [];

        if (this.tileNorth) {
            neighbors.push(this.tileNorth);
        }

        if (this.tileEast) {
            neighbors.push(this.tileEast);
        }

        if (this.tileSouth) {
            neighbors.push(this.tileSouth);
        }

        if (this.tileWest) {
            neighbors.push(this.tileWest);
        }

        return neighbors;
    }

    /**
     * Checks if a Tile is pathable to units
     * @returns True if pathable, false otherwise
     */
    public isPathable(): boolean {
        // <<-- Creer-Merge: is-pathable-builtin -->>
        return false; // DEVELOPER ADD LOGIC HERE
        // <<-- /Creer-Merge: is-pathable-builtin -->>
    }

    /**
     * Checks if this Tile has a specific neighboring Tile
     * @returns true if the tile is a neighbor of this Tile, false otherwise
     */
    public hasNeighbor(tile: Tile | undefined): boolean {
        return Boolean(tile && (
            this.tileNorth === tile ||
            this.tileEast === tile ||
            this.tileSouth === tile ||
            this.tileEast === tile),
        );
    }
    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
