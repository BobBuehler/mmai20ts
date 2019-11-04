// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Player } from "./player";
import { Port } from "./port";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A unit group in the game. This may consist of a ship and any number of crew.
 */
export class Unit extends GameObject {

    /**
     * Whether this Unit has performed its action this turn.
     */
    public readonly acted!: boolean;

    /**
     * How many crew are on this Tile. This number will always be <= crewHealth.
     */
    public readonly crew!: number;

    /**
     * How much total health the crew on this Tile have.
     */
    public readonly crewHealth!: number;

    /**
     * How much gold this Unit is carrying.
     */
    public readonly gold!: number;

    /**
     * How many more times this Unit may move this turn.
     */
    public readonly moves!: number;

    /**
     * The Player that owns and can control this Unit, or null if the Unit is
     * neutral.
     */
    public readonly owner!: Player | undefined;

    /**
     * (Merchants only) The path this Unit will follow. The first element is the
     * Tile this Unit will move to next.
     */
    public readonly path!: Tile[];

    /**
     * If a ship is on this Tile, how much health it has remaining. 0 for no
     * ship.
     */
    public readonly shipHealth!: number;

    /**
     * (Merchants only) The number of turns this merchant ship won't be able to
     * move. They will still attack. Merchant ships are stunned when they're
     * attacked.
     */
    public readonly stunTurns!: number;

    /**
     * (Merchants only) The Port this Unit is moving to.
     */
    public readonly targetPort!: Port | undefined;

    /**
     * The Tile this Unit is on.
     */
    public readonly tile!: Tile | undefined;

    /**
     * Attacks either the 'crew' or 'ship' on a Tile in range.
     * @param tile The Tile to attack.
     * @param target Whether to attack 'crew' or 'ship'. Crew deal damage to
     * crew and ships deal damage to ships. Consumes any remaining moves.
     * @returns True if successfully attacked, false otherwise.
     */
    public async attack(
        tile: Tile,
        target: "crew" | "ship",
    ): Promise<boolean> {
        return this.runOnServer("attack", {
            tile,
            target,
        });
    }

    /**
     * Buries gold on this Unit's Tile. Gold must be a certain distance away for
     * it to get interest (Game.minInterestDistance).
     * @param amount How much gold this Unit should bury. Amounts <= 0 will bury
     * as much as possible.
     * @returns True if successfully buried, false otherwise.
     */
    public async bury(amount: number): Promise<boolean> {
        return this.runOnServer("bury", {
            amount,
        });
    }

    /**
     * Puts gold into an adjacent Port. If that Port is the Player's port, the
     * gold is added to that Player. If that Port is owned by merchants, it adds
     * to that Port's investment.
     * @param amount The amount of gold to deposit. Amounts <= 0 will deposit
     * all the gold on this Unit.
     * @returns True if successfully deposited, false otherwise.
     */
    public async deposit(amount: number = 0): Promise<boolean> {
        return this.runOnServer("deposit", {
            amount,
        });
    }

    /**
     * Digs up gold on this Unit's Tile.
     * @param amount How much gold this Unit should take. Amounts <= 0 will dig
     * up as much as possible.
     * @returns True if successfully dug up, false otherwise.
     */
    public async dig(amount: number = 0): Promise<boolean> {
        return this.runOnServer("dig", {
            amount,
        });
    }

    /**
     * Moves this Unit from its current Tile to an adjacent Tile. If this Unit
     * merges with another one, the other Unit will be destroyed and its tile
     * will be set to null. Make sure to check that your Unit's tile is not null
     * before doing things with it.
     * @param tile The Tile this Unit should move to.
     * @returns True if it moved, false otherwise.
     */
    public async move(tile: Tile): Promise<boolean> {
        return this.runOnServer("move", {
            tile,
        });
    }

    /**
     * Regenerates this Unit's health. Must be used in range of a port.
     * @returns True if successfully rested, false otherwise.
     */
    public async rest(): Promise<boolean> {
        return this.runOnServer("rest", {
        });
    }

    /**
     * Moves a number of crew from this Unit to the given Tile. This will
     * consume a move from those crew.
     * @param tile The Tile to move the crew to.
     * @param amount The number of crew to move onto that Tile. Amount <= 0 will
     * move all the crew to that Tile.
     * @param gold The amount of gold the crew should take with them. Gold < 0
     * will move all the gold to that Tile.
     * @returns True if successfully split, false otherwise.
     */
    public async split(
        tile: Tile,
        amount: number = 1,
        gold: number = 0,
    ): Promise<boolean> {
        return this.runOnServer("split", {
            tile,
            amount,
            gold,
        });
    }

    /**
     * Takes gold from the Player. You can only withdraw from your own Port.
     * @param amount The amount of gold to withdraw. Amounts <= 0 will withdraw
     * everything.
     * @returns True if successfully withdrawn, false otherwise.
     */
    public async withdraw(amount: number = 0): Promise<boolean> {
        return this.runOnServer("withdraw", {
            amount,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
