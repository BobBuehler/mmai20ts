// This is where you build your AI for the Catastrophe game.

import * as _ from "lodash";
import { BaseAI } from "../../joueur/base-ai";
import { Game } from "./game";
import { Player } from "./player";
import { Tile } from "./tile";
import { Job } from "./job";
import * as act from "./act";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be required here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * This is the class to play the Catastrophe game.
 * This is where you should build your AI.
 */
export class AI extends BaseAI {
    static Game: Game;
    static Jobs: Record<Job["title"], Job>;
    static Tiles: Tile[];

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
        AI.Game = this.game;
        AI.Jobs = _.keyBy(this.game.jobs, "title") as any;
        AI.Tiles = Array(this.game.tiles.length);
        this.game.tiles.forEach(t => (AI.Tiles[t.y * this.game.mapWidth + t.x] = t));
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
        console.log("Turn", this.game.currentTurn);
        for (const unit of this.player.units) {
            if (unit.job === AI.Jobs["fresh human"]) {
                await act.moveAndRestAndChangeJob(unit, AI.Jobs.missionary);
            }
            if (unit.job === AI.Jobs.missionary) {
                await act.moveAndRestAndConvert(unit, this.game.units.filter(u => u.job === AI.Jobs["fresh human"] && u.owner == null));
            }
        }

        return true;
        // <<-- /Creer-Merge: runTurn -->>
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add for your AI
    // <<-- /Creer-Merge: functions -->>
}
