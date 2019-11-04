// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { BaseGame } from "../../joueur/base-game";
import { Building } from "./building";
import { Forecast } from "./forecast";
import { GameObject } from "./game-object";
import { Player } from "./player";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Two player grid based game where each player tries to burn down the other
 * player's buildings. Let it burn.
 */
export class Game extends BaseGame {

    /**
     * How many bribes players get at the beginning of their turn, not counting
     * their burned down Buildings.
     */
    public readonly baseBribesPerTurn!: number;

    /**
     * All the buildings in the game.
     */
    public readonly buildings!: Building[];

    /**
     * The current Forecast, which will be applied at the end of the turn.
     */
    public readonly currentForecast!: Forecast;

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
     * All the forecasts in the game, indexed by turn number.
     */
    public readonly forecasts!: Forecast[];

    /**
     * A mapping of every game object's ID to the actual game object. Primarily
     * used by the server and client to easily refer to the game objects via ID.
     */
    public readonly gameObjects!: { [id: string]: GameObject | undefined };

    /**
     * The width of the entire map along the vertical (y) axis.
     */
    public readonly mapHeight!: number;

    /**
     * The width of the entire map along the horizontal (x) axis.
     */
    public readonly mapWidth!: number;

    /**
     * The maximum amount of fire value for any Building.
     */
    public readonly maxFire!: number;

    /**
     * The maximum amount of intensity value for any Forecast.
     */
    public readonly maxForecastIntensity!: number;

    /**
     * The maximum number of turns before the game will automatically end.
     */
    public readonly maxTurns!: number;

    /**
     * The next Forecast, which will be applied at the end of your opponent's
     * turn. This is also the Forecast WeatherStations can control this turn.
     */
    public readonly nextForecast!: Forecast | undefined;

    /**
     * List of all the players in the game.
     */
    public readonly players!: Player[];

    /**
     * A unique identifier for the game instance that is being played.
     */
    public readonly session!: string;

    /**
     * The amount of time (in nano-seconds) added after each player performs a
     * turn.
     */
    public readonly timeAddedPerTurn!: number;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
