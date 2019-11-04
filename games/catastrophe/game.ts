// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { BaseGame } from "../../joueur/base-game";
import { GameObject } from "./game-object";
import { Job } from "./job";
import { Player } from "./player";
import { Structure } from "./structure";
import { Tile } from "./tile";
import { Unit } from "./unit";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Convert as many humans to as you can to survive in this post-apocalyptic
 * wasteland.
 */
export class Game extends BaseGame {

    /**
     * The multiplier for the amount of energy regenerated when resting in a
     * shelter with the cat overlord.
     */
    public readonly catEnergyMult!: number;

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
     * The amount of turns it takes for a Tile that was just harvested to grow
     * food again.
     */
    public readonly harvestCooldown!: number;

    /**
     * All the Jobs that Units can have in the game.
     */
    public readonly jobs!: Job[];

    /**
     * The amount that the harvest rate is lowered each season.
     */
    public readonly lowerHarvestAmount!: number;

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
     * The multiplier for the cost of actions when performing them in range of a
     * monument. Does not effect pickup cost.
     */
    public readonly monumentCostMult!: number;

    /**
     * The number of materials in a monument.
     */
    public readonly monumentMaterials!: number;

    /**
     * The number of materials in a neutral Structure.
     */
    public readonly neutralMaterials!: number;

    /**
     * List of all the players in the game.
     */
    public readonly players!: Player[];

    /**
     * A unique identifier for the game instance that is being played.
     */
    public readonly session!: string;

    /**
     * The number of materials in a shelter.
     */
    public readonly shelterMaterials!: number;

    /**
     * The amount of food Players start with.
     */
    public readonly startingFood!: number;

    /**
     * The multiplier for the amount of energy regenerated when resting while
     * starving.
     */
    public readonly starvingEnergyMult!: number;

    /**
     * Every Structure in the game.
     */
    public readonly structures!: Structure[];

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
     * After a food tile is harvested, the number of turns before it can be
     * harvested again.
     */
    public readonly turnsBetweenHarvests!: number;

    /**
     * The number of turns between fresh humans being spawned on the road.
     */
    public readonly turnsToCreateHuman!: number;

    /**
     * The number of turns before the harvest rate is lowered (length of each
     * season basically).
     */
    public readonly turnsToLowerHarvest!: number;

    /**
     * Every Unit in the game.
     */
    public readonly units!: Unit[];

    /**
     * The number of materials in a wall.
     */
    public readonly wallMaterials!: number;

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
