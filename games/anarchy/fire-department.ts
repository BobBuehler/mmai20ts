// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { Building } from "./building";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Can put out fires completely.
 */
export class FireDepartment extends Building {

    /**
     * The amount of fire removed from a building when bribed to extinguish a
     * building.
     */
    public readonly fireExtinguished!: number;

    /**
     * Bribes this FireDepartment to extinguish the some of the fire in a
     * building.
     * @param building The Building you want to extinguish.
     * @returns True if the bribe worked, false otherwise.
     */
    public async extinguish(building: Building): Promise<boolean> {
        return this.runOnServer("extinguish", {
            building,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
