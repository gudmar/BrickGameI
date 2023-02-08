import { board } from "../../constants/constants";
import { GameLogicArgs } from "../../types/types";
import { getDojoBar, getDojoOfSymbols, getNextFigureOfSymbols } from "../AbstractGameLogic";

export class BarDown {
    dojo = getDojoOfSymbols(0);
    nextTick(time:number): GameLogicArgs {
        if (time % board.HEIGHT === 0) this.dojo[board.HEIGHT - 1] = getDojoBar(0)
        const index = (time % board.HEIGHT);
        this.dojo[index-1] = getDojoBar(0);
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