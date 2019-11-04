import { BaseAI } from "./base-ai";
import { BaseGame } from "./base-game";
import { BaseGameObject } from "./base-game-object";

/** The form of a games/game-name/ module export */
export interface IGameNamespace {
    AI: typeof BaseAI;
    Game: typeof BaseGame;
    GameObjectClasses: {
        [className: string]: typeof BaseGameObject;
    };
}
