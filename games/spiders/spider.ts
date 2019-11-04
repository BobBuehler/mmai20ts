// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Nest } from "./nest";
import { Player } from "./player";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A Spider in the game. The most basic unit.
 */
export class Spider extends GameObject {

    /**
     * If this Spider is dead and has been removed from the game.
     */
    public readonly isDead!: boolean;

    /**
     * The Nest that this Spider is currently on. Null when moving on a Web.
     */
    public readonly nest!: Nest | undefined;

    /**
     * The Player that owns this Spider, and can command it.
     */
    public readonly owner!: Player;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
