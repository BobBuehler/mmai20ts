// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { Nest } from "./nest";
import { Spiderling } from "./spiderling";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A Spiderling that creates and spits new Webs from the Nest it is on to
 * another Nest, connecting them.
 */
export class Spitter extends Spiderling {

    /**
     * The Nest that this Spitter is creating a Web to spit at, thus connecting
     * them. Null if not spitting.
     */
    public readonly spittingWebToNest!: Nest | undefined;

    /**
     * Creates and spits a new Web from the Nest the Spitter is on to another
     * Nest, connecting them.
     * @param nest The Nest you want to spit a Web to, thus connecting that Nest
     * and the one the Spitter is on.
     * @returns True if the spit was successful, false otherwise.
     */
    public async spit(nest: Nest): Promise<boolean> {
        return this.runOnServer("spit", {
            nest,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
