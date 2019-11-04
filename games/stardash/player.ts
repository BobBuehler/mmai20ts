// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { Body } from "./body";
import { GameObject } from "./game-object";
import { Projectile } from "./projectile";
import { Unit } from "./unit";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A player in this game. Every AI controls one player.
 */
export class Player extends GameObject {

    /**
     * What type of client this is, e.g. 'Python', 'JavaScript', or some other
     * language. For potential data mining purposes.
     */
    public readonly clientType!: string;

    /**
     * The home base of the player.
     */
    public readonly homeBase!: Body;

    /**
     * If the player lost the game or not.
     */
    public readonly lost!: boolean;

    /**
     * The amount of money this Player has.
     */
    public readonly money!: number;

    /**
     * The name of the player.
     */
    public readonly name!: string;

    /**
     * This player's opponent in the game.
     */
    public readonly opponent!: Player;

    /**
     * Every Projectile owned by this Player. The earlier in the list the older
     * they are.
     */
    public readonly projectiles!: Projectile[];

    /**
     * The reason why the player lost the game.
     */
    public readonly reasonLost!: string;

    /**
     * The reason why the player won the game.
     */
    public readonly reasonWon!: string;

    /**
     * The amount of time (in ns) remaining for this AI to send commands.
     */
    public readonly timeRemaining!: number;

    /**
     * Every Unit owned by this Player. The earlier in the list the older they
     * are.
     */
    public readonly units!: Unit[];

    /**
     * The number of victory points the player has.
     */
    public readonly victoryPoints!: number;

    /**
     * If the player won the game or not.
     */
    public readonly won!: boolean;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
