import { board } from "../../constants/constants";
import { GameLogicArgs } from "../../types/types";
import { getDojoBar, getDojoOfSymbols, getNextFigureOfSymbols } from "../AbstractGameLogic";

export class BarUp {
    dojo = getDojoOfSymbols(0);
    nextTick(time:number): GameLogicArgs {
        const index = (board.HEIGHT - time % board.HEIGHT - 1);
        if (board.HEIGHT - time % board.HEIGHT === board.HEIGHT) {
            this.dojo[0] = getDojoBar(0)
        } else { 
            this.dojo[index + 1] = getDojoBar(0);
        }
        this.dojo[index] = getDojoBar(1);
        return {
            score: 0,
            level: 1,
            speed: 1,
            nextFigure: getNextFigureOfSymbols(0),
            brickMap: this.dojo,
            isAnimating: false,
            isPaused: false,
        }
    }
}