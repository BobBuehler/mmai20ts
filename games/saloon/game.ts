// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { BaseGame } from "../../joueur/base-game";
import { Bottle } from "./bottle";
import { Cowboy } from "./cowboy";
import { Furnishing } from "./furnishing";
import { GameObject } from "./game-object";
import { Player } from "./player";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Use cowboys to have a good time and play some music on a Piano, while
 * brawling with enemy Cowboys.
 */
export class Game extends BaseGame {

    /**
     * How many turns a Bartender will be busy for after throwing a Bottle.
     */
    public readonly bartenderCooldown!: number;

    /**
     * All the beer Bottles currently flying across the saloon in the game.
     */
    public readonly bottles!: Bottle[];

    /**
     * How much damage is applied to neighboring things bit by the Sharpshooter
     * between turns.
     */
    public readonly brawlerDamage!: number;

    /**
     * Every Cowboy in the game.
     */
    public readonly cowboys!: Cowboy[];

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
     * Every furnishing in the game.
     */
    public readonly furnishings!: Furnishing[];

    /**
     * A mapping of every game object's ID to the actual game object. Primarily
     * used by the server and client to easily refer to the game objects via ID.
     */
    public readonly gameObjects!: { [id: string]: GameObject | undefined };

    /**
     * All the jobs that Cowboys can be called in with.
     */
    public readonly jobs!: string[];

    /**
     * The number of Tiles in the map along the y (vertical) axis.
     */
    public readonly mapHeight!: number;

    /**
     * The number of Tiles in the map along the x (horizontal) axis.
     */
    public readonly mapWidth!: number;

    /**
     * The maximum number of Cowboys a Player can bring into the saloon of each
     * specific job.
     */
    public readonly maxCowboysPerJob!: number;

    /**
     * The maximum number of turns before the game will automatically end.
     */
    public readonly maxTurns!: number;

    /**
     * List of all the players in the game.
     */
    public readonly players!: Player[];

    /**
     * When a player's rowdiness reaches or exceeds this number their Cowboys
     * take a collective siesta.
     */
    public readonly rowdinessToSiesta!: number;

    /**
     * A unique identifier for the game instance that is being played.
     */
    public readonly session!: string;

    /**
     * How much damage is applied to things hit by Sharpshooters when they act.
     */
    public readonly sharpshooterDamage!: number;

    /**
     * How long siestas are for a player's team.
     */
    public readonly siestaLength!: number;

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
     * How many turns a Cowboy will be drunk for if a bottle breaks on it.
     */
    public readonly turnsDrunk!: number;

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
