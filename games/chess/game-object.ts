// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { BaseGameObject } from "../../joueur/base-game-object";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * An object in the game. The most basic class that all game classes should
 * inherit from automatically.
 */
export class GameObject extends BaseGameObject {

    /**
     * String representing the top level Class that this game object is an
     * instance of. Used for reflection to create new instances on clients, but
     * exposed for convenience should AIs want this data.
     */
    public readonly gameObjectName!: string;

    /**
     * A unique id for each instance of a GameObject or a sub class. Used for
     * client and server communication. Should never change value after being
     * set.
     */
    public readonly id!: string;

    /**
     * Any strings logged will be stored here. Intended for debugging.
     */
    public readonly logs!: string[];

    /**
     * Adds a message to this GameObject's logs. Intended for your own debugging
     * purposes, as strings stored here are saved in the gamelog.
     * @param message A string to add to this GameObject's log. Intended for
     * debugging.
     */
    public async log(message: string): Promise<void> {
        return this.runOnServer("log", {
            message,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
