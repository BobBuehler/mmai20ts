// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { BaseGame } from "../../joueur/base-game";
import { GameObject } from "./game-object";
import { Player } from "./player";
import { Port } from "./port";
import { Tile } from "./tile";
import { Unit } from "./unit";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Steal from merchants and become the most infamous pirate.
 */
export class Game extends BaseGame {

    /**
     * The rate buried gold increases each turn.
     */
    public readonly buryInterestRate!: number;

    /**
     * How much gold it costs to construct a single crew.
     */
    public readonly crewCost!: number;

    /**
     * How much damage crew deal to each other.
     */
    public readonly crewDamage!: number;

    /**
     * The maximum amount of health a crew member can have.
     */
    public readonly crewHealth!: number;

    /**
     * The number of moves Units with only crew are given each turn.
     */
    public readonly crewMoves!: number;

    /**
     * A crew's attack range. Range is circular.
     */
    public readonly crewRange!: number;

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
     * A mapping of every game object's ID to the actual game object. Primarily
     * used by the server and client to easily refer to the game objects via ID.
     */
    public readonly gameObjects!: { [id: string]: GameObject | undefined };

    /**
     * How much health a Unit recovers when they rest.
     */
    public readonly healFactor!: number;

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
     * How much gold merchant Ports get each turn.
     */
    public readonly merchantGoldRate!: number;

    /**
     * When a merchant ship spawns, the amount of additional gold it has
     * relative to the Port's investment.
     */
    public readonly merchantInterestRate!: number;

    /**
     * The Euclidean distance buried gold must be from the Player's Port to
     * accumulate interest.
     */
    public readonly minInterestDistance!: number;

    /**
     * List of all the players in the game.
     */
    public readonly players!: Player[];

    /**
     * Every Port in the game. Merchant ports have owner set to null.
     */
    public readonly ports!: Port[];

    /**
     * How far a Unit can be from a Port to rest. Range is circular.
     */
    public readonly restRange!: number;

    /**
     * A unique identifier for the game instance that is being played.
     */
    public readonly session!: string;

    /**
     * How much gold it costs to construct a ship.
     */
    public readonly shipCost!: number;

    /**
     * How much damage ships deal to ships and ports.
     */
    public readonly shipDamage!: number;

    /**
     * The maximum amount of health a ship can have.
     */
    public readonly shipHealth!: number;

    /**
     * The number of moves Units with ships are given each turn.
     */
    public readonly shipMoves!: number;

    /**
     * A ship's attack range. Range is circular.
     */
    public readonly shipRange!: number;

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
     * Every Unit in the game. Merchant units have targetPort set to a port.
     */
    public readonly units!: Unit[];

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
