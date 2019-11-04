// DO NOT MODIFY THIS FILE

import { IGameNamespace } from "../../joueur/interfaces";
import { AI } from "./ai";
import { Game } from "./game";

import { Bottle } from "./bottle";
import { Cowboy } from "./cowboy";
import { Furnishing } from "./furnishing";
import { GameObject } from "./game-object";
import { Player } from "./player";
import { Tile } from "./tile";
import { YoungGun } from "./young-gun";

/**
 * This is a collection of all the classes that Saloon uses to work.
 * @hidden
 */
export const namespace: IGameNamespace = {
    AI,
    Game,
    GameObjectClasses: {
        Bottle,
        Cowboy,
        Furnishing,
        GameObject,
        Player,
        Tile,
        YoungGun,
    },
};
