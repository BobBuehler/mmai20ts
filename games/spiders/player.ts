// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { BroodMother } from "./brood-mother";
import { GameObject } from "./game-object";
import { Spider } from "./spider";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A player in this game. Every AI controls one player.
 */
export class Player extends GameObject {

    /**
     * This player's BroodMother. If it dies they lose the game.
     */
    public readonly broodMother!: BroodMother;

    /**
     * What type of client this is, e.g. 'Python', 'JavaScript', or some other
     * language. For potential data mining purposes.
     */
    public readonly clientType!: string;

    /**
     * If the player lost the game or not.
     */
    public readonly lost!: boolean;

    /**
     * The max number of Spiderlings players can spawn.
     */
    public readonly maxSpiderlings!: number;

    /**
     * The name of the player.
     */
    public readonly name!: string;

    /**
     * The number of nests this player controls.
     */
    public readonly numberOfNestsControlled!: number;

    /**
     * This player's opponent in the game.
     */
    public readonly opponent!: Player;

    /**
     * The reason why the player lost the game.
     */
    public readonly reasonLost!: string;

    /**
     * The reason why the player won the game.
     */
    public readonly reasonWon!: string;

    /**
     * All the Spiders owned by this player.
     */
    public readonly spiders!: Spider[];

    /**
     * The amount of time (in ns) remaining for this AI to send commands.
     */
    public readonly timeRemaining!: number;

    /**
     * If the player won the game or not.
     */
    public readonly won!: boolean;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
