
import { BrickMap, GameLogicArgs, KeyPress, OneToTen } from "../../types/types";
import { GameLogic } from "../AbstractGameLogic";
import { EMPTY_BOARD, EMPTY_NEXT_FIGURE, MAZE } from "../constants";
import { GameCreator } from "../GameCreator";
import { xor } from "../layers/toggle/toggleFunction";

export class MazeMoverDecorator {
    constructor() {
        const decoratedClass = new GameCreator(PawnMover);
        return decoratedClass;
    }
}

class PawnMover {
    // NOT a pure functions, has own state
    getNextStateOnTick(currentGameState:any){
        return currentGameState;
    }
    getNextStateOnKeyPress(currentGameState:any, keyPresses: KeyPress){
        return currentGameState;
    }
}