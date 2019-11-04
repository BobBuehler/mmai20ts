import { IBaseGameObject } from "@cadre/ts-utils/cadre";
import { client } from "./client";

/**
 * The base class that every game object within a game inherit from for
 * runtime manipulation that would be redundant via Creer
 */
export class BaseGameObject implements IBaseGameObject {
    /** The name of the top class that this game object is in its module. */
    public readonly gameObjectName: string = "";

    /**
     * A unique ID (unique to the game instance) of the game object.
     * Will never change, and IDs are never re-used.
     */
    public readonly id: string = "";

    /** The logs logged to this game object. */
    public readonly logs!: string[];

    /**
     * The constructor is protected to discourage competitors from
     * instantiating game objects (which would break things).
     * @hidden
     */
    protected constructor() {}

    /**
     * A toString override for easier debugging.
     * @returns A human readable representation of the game object.
     * @example `String(gameObject);` 🠞 `"GameObjectName #1245"`
     */
    public toString(): string {
        return `${this.gameObjectName} #${this.id}`;
    }

    /**
     * Runs a function on the game server on behalf of this game object.
     * @hidden
     * @param functionName The name of the member function of this class.
     * @param args Object of key/value args to send to the server.
     * @returns A promise that should eventually resolve into the return
     * value of the run command.
     */
    protected runOnServer(functionName: string, args: {
        [key: string]: any;
    }): Promise<any> {
        return client.runOnServer(this, functionName, args);
    }
}
