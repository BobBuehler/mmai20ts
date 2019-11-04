// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { Spiderling } from "./spiderling";
import { Web } from "./web";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A Spiderling that can alter existing Webs by weaving to add or remove silk
 * from the Webs, thus altering its strength.
 */
export class Weaver extends Spiderling {

    /**
     * The Web that this Weaver is strengthening. Null if not strengthening.
     */
    public readonly strengtheningWeb!: Web | undefined;

    /**
     * The Web that this Weaver is weakening. Null if not weakening.
     */
    public readonly weakeningWeb!: Web | undefined;

    /**
     * Weaves more silk into an existing Web to strengthen it.
     * @param web The web you want to strengthen. Must be connected to the Nest
     * this Weaver is currently on.
     * @returns True if the strengthen was successfully started, false
     * otherwise.
     */
    public async strengthen(web: Web): Promise<boolean> {
        return this.runOnServer("strengthen", {
            web,
        });
    }

    /**
     * Weaves more silk into an existing Web to strengthen it.
     * @param web The web you want to weaken. Must be connected to the Nest this
     * Weaver is currently on.
     * @returns True if the weaken was successfully started, false otherwise.
     */
    public async weaken(web: Web): Promise<boolean> {
        return this.runOnServer("weaken", {
            web,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
