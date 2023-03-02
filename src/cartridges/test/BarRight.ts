import { board } from "../../constants/constants";
import { GameLogicArgs } from "../../types/types";
import { doWithVerticalBar, getDojoBar, getDojoOfSymbols, getNextFigureOfSymbols } from "../AbstractGameLogic";

const setColumn = (dojo: number[][], index:number) => doWithVerticalBar({
    dojo,
    index,
    pixelModificationFunction: () => 1,
})

const unsetColumn = (dojo: number[][], index:number) => doWithVerticalBar({
    dojo,
    index,
    pixelModificationFunction: () => 0,
})

export class BarRight {
    dojo = getDojoOfSymbols(0);
    nextTick(time:number): GameLogicArgs {
        const index = (time % board.WIDTH);
        if (time % board.WIDTH === 0) {
            unsetColumn(this.dojo, board.WIDTH - 1)
        } else {
            unsetColumn(this.dojo, index - 1);
        }
        setColumn(this.dojo, index);
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