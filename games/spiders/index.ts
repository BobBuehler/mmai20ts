// DO NOT MODIFY THIS FILE

import { IGameNamespace } from "../../joueur/interfaces";
import { AI } from "./ai";
import { Game } from "./game";

import { BroodMother } from "./brood-mother";
import { Cutter } from "./cutter";
import { GameObject } from "./game-object";
import { Nest } from "./nest";
import { Player } from "./player";
import { Spider } from "./spider";
import { Spiderling } from "./spiderling";
import { Spitter } from "./spitter";
import { Weaver } from "./weaver";
import { Web } from "./web";

/**
 * This is a collection of all the classes that Spiders uses to work.
 * @hidden
 */
export const namespace: IGameNamespace = {
    AI,
    Game,
    GameObjectClasses: {
        BroodMother,
        Cutter,
        GameObject,
        Nest,
        Player,
        Spider,
        Spiderling,
        Spitter,
        Weaver,
        Web,
    },
};
