// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { Spider } from "./spider";
import { Spiderling } from "./spiderling";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * The Spider Queen. She alone can spawn Spiderlings for each Player, and if she
 * dies the owner loses.
 */
export class BroodMother extends Spider {

    /**
     * How many eggs the BroodMother has to spawn Spiderlings this turn.
     */
    public readonly eggs!: number;

    /**
     * How much health this BroodMother has left. When it reaches 0, she dies
     * and her owner loses.
     */
    public readonly health!: number;

    /**
     * Consumes a Spiderling of the same owner to regain some eggs to spawn more
     * Spiderlings.
     * @param spiderling The Spiderling to consume. It must be on the same Nest
     * as this BroodMother.
     * @returns True if the Spiderling was consumed. False otherwise.
     */
    public async consume(spiderling: Spiderling): Promise<boolean> {
        return this.runOnServer("consume", {
            spiderling,
        });
    }

    /**
     * Spawns a new Spiderling on the same Nest as this BroodMother, consuming
     * an egg.
     * @param spiderlingType The string name of the Spiderling class you want to
     * Spawn. Must be 'Spitter', 'Weaver', or 'Cutter'.
     * @returns The newly spwaned Spiderling if successful. Null otherwise.
     */
    public async spawn(
        spiderlingType: "Spitter" | "Weaver" | "Cutter",
    ): Promise<Spiderling | undefined> {
        return this.runOnServer("spawn", {
            spiderlingType,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
