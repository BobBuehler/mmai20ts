// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { BaseGame } from "../../joueur/base-game";
import { Body } from "./body";
import { GameObject } from "./game-object";
import { Job } from "./job";
import { Player } from "./player";
import { Projectile } from "./projectile";
import { Unit } from "./unit";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Collect of the most of the rarest mineral orbiting aroung the sun and
 * outcompete your competetor.
 */
export class Game extends BaseGame {

    /**
     * All the celestial bodies in the game. The first two are planets and the
     * third is the sun. The fourth is the VP asteroid. Everything else is
     * normal asteroids.
     */
    public readonly bodies!: Body[];

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
     * The cost of dashing.
     */
    public readonly dashCost!: number;

    /**
     * The distance traveled each turn by dashing.
     */
    public readonly dashDistance!: number;

    /**
     * A mapping of every game object's ID to the actual game object. Primarily
     * used by the server and client to easily refer to the game objects via ID.
     */
    public readonly gameObjects!: { [id: string]: GameObject | undefined };

    /**
     * The value of every unit of genarium.
     */
    public readonly genariumValue!: number;

    /**
     * A list of all jobs. first item is corvette, second is missileboat, third
     * is martyr, fourth is transport, and fifth is miner.
     */
    public readonly jobs!: Job[];

    /**
     * The value of every unit of legendarium.
     */
    public readonly legendariumValue!: number;

    /**
     * The highest amount of material, that can be in a asteroid.
     */
    public readonly maxAsteroid!: number;

    /**
     * The maximum number of turns before the game will automatically end.
     */
    public readonly maxTurns!: number;

    /**
     * The smallest amount of material, that can be in a asteroid.
     */
    public readonly minAsteroid!: number;

    /**
     * The rate at which miners grab minerals from asteroids.
     */
    public readonly miningSpeed!: number;

    /**
     * The amount of mythicite that spawns at the start of the game.
     */
    public readonly mythiciteAmount!: number;

    /**
     * The number of orbit updates you cannot mine the mithicite asteroid.
     */
    public readonly orbitsProtected!: number;

    /**
     * The rarity modifier of the most common ore. This controls how much
     * spawns.
     */
    public readonly oreRarityGenarium!: number;

    /**
     * The rarity modifier of the rarest ore. This controls how much spawns.
     */
    public readonly oreRarityLegendarium!: number;

    /**
     * The rarity modifier of the second rarest ore. This controls how much
     * spawns.
     */
    public readonly oreRarityRarium!: number;

    /**
     * The amount of energy a planet can hold at once.
     */
    public readonly planetEnergyCap!: number;

    /**
     * The amount of energy the planets restore each round.
     */
    public readonly planetRechargeRate!: number;

    /**
     * List of all the players in the game.
     */
    public readonly players!: Player[];

    /**
     * The standard size of ships.
     */
    public readonly projectileRadius!: number;

    /**
     * The amount of distance missiles travel through space.
     */
    public readonly projectileSpeed!: number;

    /**
     * Every projectile in the game.
     */
    public readonly projectiles!: Projectile[];

    /**
     * The value of every unit of rarium.
     */
    public readonly rariumValue!: number;

    /**
     * The regeneration rate of asteroids.
     */
    public readonly regenerateRate!: number;

    /**
     * A unique identifier for the game instance that is being played.
     */
    public readonly session!: string;

    /**
     * The standard size of ships.
     */
    public readonly shipRadius!: number;

    /**
     * The size of the map in the X direction.
     */
    public readonly sizeX!: number;

    /**
     * The size of the map in the Y direction.
     */
    public readonly sizeY!: number;

    /**
     * The amount of time (in nano-seconds) added after each player performs a
     * turn.
     */
    public readonly timeAddedPerTurn!: number;

    /**
     * The number of turns it takes for a asteroid to orbit the sun. (Asteroids
     * move after each players turn).
     */
    public readonly turnsToOrbit!: number;

    /**
     * Every Unit in the game.
     */
    public readonly units!: Unit[];

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
