// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { BaseGame } from "../../joueur/base-game";
import { GameObject } from "./game-object";
import { Nest } from "./nest";
import { Player } from "./player";
import { Web } from "./web";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * There's an infestation of enemy spiders challenging your queen broodmother
 * spider! Protect her and attack the other broodmother in this turn based, node
 * based, game.
 */
export class Game extends BaseGame {

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
     * The speed at which Cutters work to do cut Webs.
     */
    public readonly cutSpeed!: number;

    /**
     * Constant used to calculate how many eggs BroodMothers get on their
     * owner's turns.
     */
    public readonly eggsScalar!: number;

    /**
     * A mapping of every game object's ID to the actual game object. Primarily
     * used by the server and client to easily refer to the game objects via ID.
     */
    public readonly gameObjects!: { [id: string]: GameObject | undefined };

    /**
     * The starting strength for Webs.
     */
    public readonly initialWebStrength!: number;

    /**
     * The maximum number of turns before the game will automatically end.
     */
    public readonly maxTurns!: number;

    /**
     * The maximum strength a web can be strengthened to.
     */
    public readonly maxWebStrength!: number;

    /**
     * The speed at which Spiderlings move on Webs.
     */
    public readonly movementSpeed!: number;

    /**
     * Every Nest in the game.
     */
    public readonly nests!: Nest[];

    /**
     * List of all the players in the game.
     */
    public readonly players!: Player[];

    /**
     * A unique identifier for the game instance that is being played.
     */
    public readonly session!: string;

    /**
     * The speed at which Spitters work to spit new Webs.
     */
    public readonly spitSpeed!: number;

    /**
     * The amount of time (in nano-seconds) added after each player performs a
     * turn.
     */
    public readonly timeAddedPerTurn!: number;

    /**
     * How much web strength is added or removed from Webs when they are weaved.
     */
    public readonly weavePower!: number;

    /**
     * The speed at which Weavers work to do strengthens and weakens on Webs.
     */
    public readonly weaveSpeed!: number;

    /**
     * Every Web in the game.
     */
    public readonly webs!: Web[];

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
