// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { Cowboy } from "./cowboy";
import { GameObject } from "./game-object";
import { YoungGun } from "./young-gun";

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
     * Every Cowboy owned by this Player.
     */
    public readonly cowboys!: Cowboy[];

    /**
     * How many enemy Cowboys this player's team has killed.
     */
    public readonly kills!: number;

    /**
     * If the player lost the game or not.
     */
    public readonly lost!: boolean;

    /**
     * The name of the player.
     */
    public readonly name!: string;

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
     * How rowdy their team is. When it gets too high their team takes a
     * collective siesta.
     */
    public readonly rowdiness!: number;

    /**
     * How many times their team has played a piano.
     */
    public readonly score!: number;

    /**
     * 0 when not having a team siesta. When greater than 0 represents how many
     * turns left for the team siesta to complete.
     */
    public readonly siesta!: number;

    /**
     * The amount of time (in ns) remaining for this AI to send commands.
     */
    public readonly timeRemaining!: number;

    /**
     * If the player won the game or not.
     */
    public readonly won!: boolean;

    /**
     * The YoungGun this Player uses to call in new Cowboys.
     */
    public readonly youngGun!: YoungGun;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
