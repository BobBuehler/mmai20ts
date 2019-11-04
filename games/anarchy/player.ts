// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { Building } from "./building";
import { FireDepartment } from "./fire-department";
import { GameObject } from "./game-object";
import { PoliceDepartment } from "./police-department";
import { Warehouse } from "./warehouse";
import { WeatherStation } from "./weather-station";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A player in this game. Every AI controls one player.
 */
export class Player extends GameObject {

    /**
     * How many bribes this player has remaining to use during their turn. Each
     * action a Building does costs 1 bribe. Any unused bribes are lost at the
     * end of the player's turn.
     */
    public readonly bribesRemaining!: number;

    /**
     * All the buildings owned by this player.
     */
    public readonly buildings!: Building[];

    /**
     * What type of client this is, e.g. 'Python', 'JavaScript', or some other
     * language. For potential data mining purposes.
     */
    public readonly clientType!: string;

    /**
     * All the FireDepartments owned by this player.
     */
    public readonly fireDepartments!: FireDepartment[];

    /**
     * The Warehouse that serves as this player's headquarters and has extra
     * health. If this gets destroyed they lose.
     */
    public readonly headquarters!: Warehouse;

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
     * All the PoliceDepartments owned by this player.
     */
    public readonly policeDepartments!: PoliceDepartment[];

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
     * All the warehouses owned by this player. Includes the Headquarters.
     */
    public readonly warehouses!: Warehouse[];

    /**
     * All the WeatherStations owned by this player.
     */
    public readonly weatherStations!: WeatherStation[];

    /**
     * If the player won the game or not.
     */
    public readonly won!: boolean;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
