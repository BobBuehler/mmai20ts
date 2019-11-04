// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { BaseGame } from "../../joueur/base-game";
import { Beaver } from "./beaver";
import { GameObject } from "./game-object";
import { Job } from "./job";
import { Player } from "./player";
import { Spawner } from "./spawner";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Gather branches and build up your lodge as beavers fight to survive.
 */
export class Game extends BaseGame {

    /**
     * Every Beaver in the game.
     */
    public readonly beavers!: Beaver[];

    /**
     * The player whose turn it is currently. That player can send commands.
     * Other players cannot.
     */
    public readonly currentPlayer!: Player;

    /**
     * The current turn number, starting at 0 for the first player's turn.
     */
    public readonly currentTurn!: number;

    /**
     * When a Player has less Beavers than this number, then recruiting other
     * Beavers is free.
     */
    public readonly freeBeaversCount!: number;

    /**
     * A mapping of every game object's ID to the actual game object. Primarily
     * used by the server and client to easily refer to the game objects via ID.
     */
    public readonly gameObjects!: { [id: string]: GameObject | undefined };

    /**
     * All the Jobs that Beavers can have in the game.
     */
    public readonly jobs!: Job[];

    /**
     * Constant number used to calculate what it costs to spawn a new lodge.
     */
    public readonly lodgeCostConstant!: number;

    /**
     * How many lodges must be owned by a Player at once to win the game.
     */
    public readonly lodgesToWin!: number;

    /**
     * The number of Tiles in the map along the y (vertical) axis.
     */
    public readonly mapHeight!: number;

    /**
     * The number of Tiles in the map along the x (horizontal) axis.
     */
    public readonly mapWidth!: number;

    /**
     * The maximum number of turns before the game will automatically end.
     */
    public readonly maxTurns!: number;

    /**
     * List of all the players in the game.
     */
    public readonly players!: Player[];

    /**
     * A unique identifier for the game instance that is being played.
     */
    public readonly session!: string;

    /**
     * Every Spawner in the game.
     */
    public readonly spawner!: Spawner[];

    /**
     * Constant number used to calculate how many branches/food Beavers harvest
     * from Spawners.
     */
    public readonly spawnerHarvestConstant!: number;

    /**
     * All the types of Spawners in the game.
     */
    public readonly spawnerTypes!: string[];

    /**
     * All the tiles in the map, stored in Row-major order. Use `x + y *
     * mapWidth` to access the correct index.
     */
    public readonly tiles!: Tile[];

    /**
     * The amount of time (in nano-seconds) added after each player performs a
     * turn.
     */
    public readonly timeAddedPerTurn!: number;

    /**
     * Gets the Tile at a specified (x, y) position
     * @param x an integer between 0 and the mapWidth
     * @param y an integer between 0 and the mapHeight
     * @returns the Tile at (x, y) or null if out of bounds
     */
    public getTileAt(x: number, y: number): Tile | undefined {
        if (x < 0 || y < 0 || x >= this.mapWidth || y >= this.mapHeight) {
            // out of bounds
            return undefined;
        }

        return this.tiles[x + y * this.mapWidth];
    }
    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
