import { IBaseGame, IBasePlayer } from "@cadre/ts-utils/cadre";
import { BaseGameObject } from "./base-game-object";

/*
 * The basics of any game, basically state management. Competitors do not modify
 */
export class BaseGame implements IBaseGame {
    /**
     * All the game objects in the game, indexed by their game object ID.
     */
    public readonly gameObjects: {
        [id: string]: BaseGameObject | undefined;
    } = {};

    /** The players in this game. */
    public readonly players!: IBasePlayer[];

    /** The session this game is occuring in. */
    public readonly session!: string;
}
