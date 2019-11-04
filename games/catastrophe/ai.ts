// This is where you build your AI for the Catastrophe game.

import { BaseAI } from "../../joueur/base-ai";
import { Game } from "./game";
import { Player } from "./player";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be required here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * This is the class to play the Catastrophe game.
 * This is where you should build your AI.
 */
export class AI extends BaseAI {
    /**
     * The reference to the Game instance this AI is playing.
     */
    public readonly game!: Game;

    /**
     * The reference to the Player this AI controls in the Game.
     */
    public readonly player!: Player;
    /**
     * This is the name you send to the server so your AI
     * will control the player named this string.
     *
     * @returns A string for the name of your player.
     */
    public getName(): string {
        // <<-- Creer-Merge: getName -->>
        return "Catastrophe JavaScript Player";
        // <<-- /Creer-Merge: getName -->>
    }

    /**
     * This is called once the game starts and your AI knows its playerID and game.
     * You can initialize your AI here.
     */
    public async start(): Promise<void> {
        // <<-- Creer-Merge: start -->>
        // pass
        // <<-- /Creer-Merge: start -->>
    }

    /**
     * This is called every time the game's state updates, so if you are tracking anything you can update it here.
     */
    public async gameUpdated(): Promise<void> {
        // <<-- Creer-Merge: gameUpdated -->>
        // pass
        // <<-- /Creer-Merge: gameUpdated -->>
    }

    /**
     * This is called when the game ends, you can clean up your data and dump files here if need be.
     *
     * @param won True means you won, false means you lost.
     * @param reason The human readable string explaining why you won or lost.
     */
    public async ended(won: boolean, reason: string): Promise<void> {
        // <<-- Creer-Merge: ended -->>
        // pass
        // <<-- /Creer-Merge: ended -->>
    }
    /**
     * This is called every time it is this AI.player's turn.
     * @returns Represents if you want to end your turn. True means end your
     * turn, False means to keep your turn going and re-call this function.
     */
    public async runTurn(): Promise<boolean> {
        // <<-- Creer-Merge: runTurn -->>
        // Put your game logic here for runTurn
        return false;
        // <<-- /Creer-Merge: runTurn -->>
    }

    /**
     * A very basic path finding algorithm (Breadth First Search) that when
     * given a starting Tile, will return a valid path to the goal Tile.
     *
     * @param start - the starting Tile.
     * @param goal - the goal Tile.
     * @returns An array of Tiles representing the path, with
     * the first element being a valid adjacent Tile to the start, and the last
     * element being the goal.
     */
    protected findPath(start: Tile | undefined, goal: Tile | undefined): Tile[] {
        if (start === goal || !start || !goal) {
            // no need to make a path to here...
            return [];
        }

        // queue of the tiles that will have their neighbors searched for 'goal'
        const fringe: Tile[] = [];

        // How we got to each tile that went into the fringe.
        const cameFrom = new Map<Tile, Tile>();

        // Enqueue start as the first tile to have its neighbors searched.
        fringe.push(start);

        // keep exploring neighbors of neighbors... until there are no more.
        while (fringe.length > 0) {
            // the tile we are currently exploring.
            let inspect = fringe.shift() as Tile;

            // cycle through the tile's neighbors.
            for (const neighbor of inspect.getNeighbors()) {
                // if we found the goal, we have the path!
                if (neighbor === goal) {
                    // Follow the path backward to the start from the goal and
                    // return it.
                    const path = [goal];

                    // Starting at the tile we are currently at, insert them
                    // retracing our steps till we get to the starting tile
                    while (inspect !== start) {
                        path.unshift(inspect);
                        inspect = cameFrom.get(inspect) as Tile;
                    }

                    return path;
                }
                // else we did not find the goal, so enqueue this tile's
                // neighbors to be inspected

                // if the tile exists, has not been explored or added to the
                // fringe yet, and it is pathable
                if (neighbor && neighbor.id && !cameFrom.get(neighbor) && neighbor.isPathable()) {
                    // add it to the tiles to be explored and add where it came
                    // from for path reconstruction.
                    fringe.push(neighbor);
                    cameFrom.set(neighbor, inspect);
                }
            }
        }

        // if we got here, no path was found
        return [];
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add for your AI
    // <<-- /Creer-Merge: functions -->>
}
