import { board } from "../../constants/constants";
import { GameLogicArgs } from "../../types/types";
import { getDojoBar, getDojoOfSymbols, getNextFigureOfSymbols } from "../AbstractGameLogic";

export class BarUp {
    dojo = getDojoOfSymbols(0);
    private tick = 0;
    nextTick(): GameLogicArgs {
        const index = (this.tick % board.HEIGHT) - 1;
        this.dojo[index - 1] = getDojoBar(0);
        this.dojo[index] = getDojoBar(1);
        return {
            score: 0,
            level: 0,
            speed: 0,
            nextFigure: getNextFigureOfSymbols(0),
            brickMap: this.dojo,
            isAnimating: false,
            isPaused: false,
        }
    }
}