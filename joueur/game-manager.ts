import { IDeltaMergeConstants } from "@cadre/ts-utils/cadre";
import { BaseGame } from "./base-game";
import { BaseGameObject } from "./base-game-object";
import { ErrorCode, handleError } from "./handle-error";
import * as Serializer from "./serializer";

// tslint:disable typedef no-any no-parameter-properties

// @class GameManager: basically state management. Competitors do not modify.
export class BaseGameManager {
    /** constants used to parse delta merges */
    public serverConstants: IDeltaMergeConstants = {
        DELTA_LIST_LENGTH: "",
        DELTA_REMOVED: "",
    };

    /** Sets up the game manager. */
    public constructor(
        /** The game this game manager controls. */
        private game: BaseGame,
        /**
         * The game object class constructors to create new game objects from.
         */
        private gameObjectClasses: {
            [className: string]: typeof BaseGameObject;
        },
    ) {
        // Pass
    }

    /**
     * Applies a delta state (change in state information) to this game.
     * @param delta The delta to merge into the game.
     */
    public applyDeltaState(delta: any): void {
        if (delta.gameObjects !== undefined) {
            this.initGameObjects(delta.gameObjects);
        }

        this.mergeDelta(this.game, delta);
    }

    /**
     * Game objects can be references in the delta states for cycles, they will
     * all point to the game objects here.
     * @param ALl the game objects currently in the game, indexed by their ID.
     */
    private initGameObjects(gameObjects: { [ id: string ]: any }): void {
        for (const [id, gameObject] of Object.entries(gameObjects)) {
            if (this.game.gameObjects[id] === undefined) {
                // Then this a new game object that we need to create as a class instance
                const gameObjectClass = this.gameObjectClasses[gameObject.gameObjectName];

                if (!gameObjectClass) {
                    handleError(
                        ErrorCode.DELTA_MERGE_FAILURE,
                        `Cannot create game object class ${gameObject.gameObjectName} for #${id}`,
                    );
                }

                // the class constructor is protected so competitors don't try
                // to instantiate instances, but we actually need to here;
                // so cast it to any to fake make it public
                this.game.gameObjects[id] = new (gameObjectClass as any)();
            }
        }
    }

    /**
     * Recursively merges delta changes to the game.
     * @param state A state to merge from the `delta`.
     * @param delta The delta to apply into the `state`.
     * @returns The value we delta merged at this depth.
     */
    private mergeDelta(state: any, delta: any): any {
        const deltaLength: number | undefined = delta[this.serverConstants.DELTA_LIST_LENGTH];

        if (deltaLength !== undefined) {
            // Then this part in the state is an array

            // We don't want to copy this key/value over to the state, it was just to signify the delta is an array
            // tslint:disable-next-line:no-dynamic-delete
            delete delta[this.serverConstants.DELTA_LIST_LENGTH];

            while (state.length > deltaLength) {
                // Pop elements off the array until the array is short enough.
                // An increase in array size will be added below as arrays resize when keys larger are set
                state.pop();
            }
        }

        for (const [key, d] of Object.entries<any>(delta)) {
            let stateKey: any = key;
            if (deltaLength !== undefined) {
                stateKey = Number(key);
            }

            if (d === this.serverConstants.DELTA_REMOVED) {
                // tslint:disable-next-line:no-dynamic-delete
                delete state[stateKey];
            } else if (Serializer.isGameObjectReference(d)) {
                state[stateKey] = this.game.gameObjects[d.id];
            } else if (Serializer.isObject(d) && Serializer.isObject(state[stateKey])) {
                this.mergeDelta(state[stateKey], d);
            } else {
                if (Serializer.isObject(d)) {
                    const dIsArray = (d[this.serverConstants.DELTA_LIST_LENGTH] !== undefined);
                    state[stateKey] = this.mergeDelta(dIsArray ? [] : {}, d);
                } else {
                    state[stateKey] = d;
                }
            }
        }

        return state;
    }
}
