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
 * Can be bribed to change the next Forecast in some way.
 */
export class WeatherStation extends Building {

    /**
     * Bribe the weathermen to intensity the next Forecast by 1 or -1
     * @param negative By default the intensity will be increased by 1, setting
     * this to true decreases the intensity by 1.
     * @returns True if the intensity was changed, false otherwise.
     */
    public async intensify(negative: boolean = false): Promise<boolean> {
        return this.runOnServer("intensify", {
            negative,
        });
    }

    /**
     * Bribe the weathermen to change the direction of the next Forecast by
     * rotating it clockwise or counterclockwise.
     * @param counterclockwise By default the direction will be rotated
     * clockwise. If you set this to true we will rotate the forecast
     * counterclockwise instead.
     * @returns True if the rotation worked, false otherwise.
     */
    public async rotate(counterclockwise: boolean = false): Promise<boolean> {
        return this.runOnServer("rotate", {
            counterclockwise,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
