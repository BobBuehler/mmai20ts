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
 * A Spiderling that can cut existing Webs.
 */
export class Cutter extends Spiderling {

    /**
     * The Web that this Cutter is trying to cut. Null if not cutting.
     */
    public readonly cuttingWeb!: Web | undefined;

    /**
     * Cuts a web, destroying it, and any Spiderlings on it.
     * @param web The web you want to Cut. Must be connected to the Nest this
     * Cutter is currently on.
     * @returns True if the cut was successfully started, false otherwise.
     */
    public async cut(web: Web): Promise<boolean> {
        return this.runOnServer("cut", {
            web,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
