// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { Building } from "./building";
import { Warehouse } from "./warehouse";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Used to keep cities under control and raid Warehouses.
 */
export class PoliceDepartment extends Building {

    /**
     * Bribe the police to raid a Warehouse, dealing damage equal based on the
     * Warehouse's current exposure, and then resetting it to 0.
     * @param warehouse The warehouse you want to raid.
     * @returns The amount of damage dealt to the warehouse, or -1 if there was
     * an error.
     */
    public async raid(warehouse: Warehouse): Promise<number> {
        return this.runOnServer("raid", {
            warehouse,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
