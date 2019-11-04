// This is where you build your AI for the Catastrophe game.

import * as _ from "lodash";
import { BaseAI } from "../../joueur/base-ai";
import { Game } from "./game";
import { Player } from "./player";
import { Job } from "./job";
import * as act from "./act";
import { Unit } from "./unit";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be required here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * This is the class to play the Catastrophe game.
 * This is where you should build your AI.
 */
export class AI extends BaseAI {
    static Game: Game;
    static Us: Player;
    static Them: Player;

    static Jobs: Record<Job["title"], Job>;
    static CatOverlord: Job;
    static FreshHuman: Job;
    static Missionary: Job;
    static Soldier: Job;
    static Builder: Job;
    static Gatherer: Job;

    static SpawnTiles: [Tile, Tile];

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
        AI.Us = this.player;
        AI.Them = this.game.players.find(p => p !== AI.Us)!;

        AI.Jobs = _.keyBy(this.game.jobs, "title") as any;
        AI.CatOverlord = AI.Jobs["cat overlord"];
        AI.FreshHuman = AI.Jobs["fresh human"];
        AI.Missionary = AI.Jobs.missionary;
        AI.Soldier = AI.Jobs.soldier;
        AI.Builder = AI.Jobs.builder;
        AI.Gatherer = AI.Jobs.gatherer;

        AI.SpawnTiles = [
            AI.Game.getTileAt(0, Math.floor((AI.Game.mapHeight - 1) / 2))!,
            AI.Game.getTileAt(AI.Game.mapWidth - 1, Math.floor(AI.Game.mapHeight / 2))!
        ];
        console.log(0, (AI.Game.mapHeight - 1) / 2, AI.SpawnTiles[0].x, AI.SpawnTiles[0].y);
        console.log(AI.Game.mapWidth - 1, AI.Game.mapHeight / 2, AI.SpawnTiles[1].x, AI.SpawnTiles[1].y);
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

        await this.jobs();
        await this.missionaries();

        return true;
        // <<-- /Creer-Merge: runTurn -->>
    }

    async jobs(): Promise<void> {
        let desiredJobs = [
            AI.Missionary,
            AI.Gatherer,
            AI.Builder,
            AI.Soldier,
            AI.Missionary,
            AI.Soldier,
            AI.Soldier,
            AI.Missionary,
            AI.Gatherer,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier,
            AI.Soldier
        ];

        const slottedUnits: Array<Unit | null> = [];
        let unslottedUnits: Array<Unit | null> = this.getUnits(AI.Us).filter(u => u !== AI.Us.cat);
        for (let desiredJob of desiredJobs.slice(0, unslottedUnits.length)) {
            let unslottedIndex = unslottedUnits.findIndex(u => u && u.job === desiredJob);
            if (unslottedIndex !== -1) {
                slottedUnits.push(unslottedUnits[unslottedIndex]);
                unslottedUnits[unslottedIndex] = null;
            } else {
                slottedUnits.push(null);
            }
        }

        for (const unslotted of unslottedUnits.filter<Unit>(isNotNil)) {
            const nullSlotIndex = slottedUnits.findIndex(u => u == null);
            slottedUnits[nullSlotIndex] = unslotted;
            await act.moveAndRestAndChangeJob(unslotted, desiredJobs[nullSlotIndex]);
        }
    }

    async missionaries(): Promise<void> {
        for (const missionary of this.getUnits(AI.Us, AI.Missionary)) {
            await act.moveAndRestAndConvert(missionary, AI.Game.units);
        }

        const spawnPair1 = act.getNearestPair(this.getUnits(AI.Us, AI.Missionary), t => AI.SpawnTiles.includes(t));
        if (spawnPair1) {
            console.log("spawnPair1", spawnPair1[0].id, spawnPair1[1].id);
            const [spawnMissionary1, spawnTile1] = spawnPair1;
            await act.move(spawnMissionary1, t => act.isInStepRange(spawnTile1, t, AI.Missionary.moves));

            const spawnTile2 = AI.SpawnTiles.find(t => t !== spawnTile1);
            const spawnPair2 = act.getNearestPair(
                this.getUnits(AI.Us, AI.Missionary).filter(u => u !== spawnMissionary1),
                t => t === spawnTile2
            );
            if (spawnPair2) {
                const [spawnMissionary2, spawnTile2] = spawnPair2;
                await act.move(spawnMissionary2, t => act.isInStepRange(spawnTile2, t, AI.Missionary.moves));
            }
        }

        const remainder = this.getUnits(AI.Us, AI.Missionary).find(m => m.moves > 0);
        if (remainder) {
            const brinkOfDeath = AI.Game.units.filter(u => u.owner && u.energy < 50);
            const smellingDeath = AI.Game.tiles.filter(t =>
                brinkOfDeath.some(b => act.isInStepRange(t, b.tile!, AI.Missionary.moves))
            );
            await act.moveToAndRest(remainder, act.tilePredicate(smellingDeath)); // moveTO
        }
    }

    getUnits(player: Player, job?: Job): Unit[] {
        return this.game.units.filter(u => u.owner === player && (job == null || u.job === job));
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add for your AI
    // <<-- /Creer-Merge: functions -->>
}

function isNotNil<T>(value: T | null | undefined): value is T {
    return value != null;
}
