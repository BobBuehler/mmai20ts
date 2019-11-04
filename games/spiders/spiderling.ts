// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { Nest } from "./nest";
import { Spider } from "./spider";
import { Web } from "./web";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A Spider spawned by the BroodMother.
 */
export class Spiderling extends Spider {

    /**
     * When empty string this Spiderling is not busy, and can act. Otherwise a
     * string representing what it is busy with, e.g. 'Moving', 'Attacking'.
     */
    public readonly busy!: "" | "Moving" | "Attacking" | "Strengthening" | "Weakening" | "Cutting" | "Spitting";

    /**
     * The Web this Spiderling is using to move. Null if it is not moving.
     */
    public readonly movingOnWeb!: Web | undefined;

    /**
     * The Nest this Spiderling is moving to. Null if it is not moving.
     */
    public readonly movingToNest!: Nest | undefined;

    /**
     * The number of Spiderlings busy with the same work this Spiderling is
     * doing, speeding up the task.
     */
    public readonly numberOfCoworkers!: number;

    /**
     * How much work needs to be done for this Spiderling to finish being busy.
     * See docs for the Work forumla.
     */
    public readonly workRemaining!: number;

    /**
     * Attacks another Spiderling
     * @param spiderling The Spiderling to attack.
     * @returns True if the attack was successful, false otherwise.
     */
    public async attack(spiderling: Spiderling): Promise<boolean> {
        return this.runOnServer("attack", {
            spiderling,
        });
    }

    /**
     * Starts moving the Spiderling across a Web to another Nest.
     * @param web The Web you want to move across to the other Nest.
     * @returns True if the move was successful, false otherwise.
     */
    public async move(web: Web): Promise<boolean> {
        return this.runOnServer("move", {
            web,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
