import {KeyPress, GameLogicArgs, Speed, DoWithBar, nextFigurePreview, BrickMap} from '../types/types'
import { shouldGenerateNextMove } from '../functions/shouldGenerateNextMove';
import { board, nextFigure } from '../constants/constants';
import { INDEX_OUT_OF_RANGE, TYPE_MISMATCH } from './constants';

// type NextFigureFieldContent = [number[], number[], number[] ,number[]];
// type NextFigureFieldContent = number[][];


export const arrayOfElements  = <T>(length: number, element: T): T[] => Array(length).fill(null).map(
    ( _ ) => {
        const e = element;
        return e;
    }
);
const getArrayOfDigits = (length: number, element: number): number[] => {
    const arr = [];
    for(let i = 0; i < length; i++) {
        arr.push(parseInt(`${element}`))
    }
    return arr;
}

export const getDojoOfSymbols = (digit: number) => {
    let arr = []
    for(let i = 0; i < board.HEIGHT; i++) {
        arr.push(getArrayOfDigits(board.WIDTH, digit))
    }
    return arr;
}

// export const getDojoOfSymbols = (digit:number) => {
//     return arrayOfElements<number[]>(board.HEIGHT, getArrayOfDigits(board.WIDTH, digit));
// }
export const getNextFigureOfSymbols = (digit:number):nextFigurePreview => {
    return arrayOfElements<number[]>(nextFigure.HEIGHT, arrayOfElements<number>(nextFigure.WIDTH, digit));
}

export const getDojoBar = (digit: number) => {
    return arrayOfElements<number>(board.WIDTH, digit)
}

export const doWithVerticalBar = ({ dojo, index, pixelModificationFunction }: DoWithBar) => {
    if (!Array.isArray(dojo)) throw(TYPE_MISMATCH);
    if (index < 0 || index >= dojo[0].length) throw(INDEX_OUT_OF_RANGE)
    const newDojo = dojo.map(row => {
        row[index] = pixelModificationFunction(row[index]);
        return row;
    });
    return newDojo;
}


export class GameLogic {
    protected EMPTY_FIELD_CONTENT = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    protected getDojoOfSymbols(digit: number) {
        getDojoOfSymbols(digit);
    }
    protected EMPRY_BRICK_COORDINANTES: number[][] = getDojoOfSymbols(0);
    protected score: number = 0;
    protected level: number = 0;
    protected speed: number = 0;
    protected nextFigureFieldContent = this.EMPTY_FIELD_CONTENT;
    protected paused: boolean = false;
    protected brickCoordinantes = this.EMPRY_BRICK_COORDINANTES

    init({ score, level, speed, nextFigure, brickMap }: GameLogicArgs) {
        this.score = score;
        this.level = level;
        this.speed = speed;
        this.nextFigureFieldContent = nextFigure;
        this.brickCoordinantes = brickMap;
    }

    setPaused(value: boolean): void {
        this.paused = value;
    }

    protected getEmptyGameLogicArgs():GameLogicArgs {
        return {
            score:this.score, 
            level: this.level, 
            speed: this.speed, 
            nextFigure : this.EMPTY_FIELD_CONTENT,
            brickMap: this.EMPRY_BRICK_COORDINANTES,
            isPaused: false,
            isAnimating: false,
        }
    }

    protected shouldMoveOnTick(speed: Speed, clockValue: number): boolean {
        return shouldGenerateNextMove(speed, clockValue);
    }

    getNextStateOnTick(clockValue: number):GameLogicArgs{
        return this.getEmptyGameLogicArgs();
    };

    getNextStateOnKeyPress(keyPresses: KeyPress):GameLogicArgs{
        return this.getEmptyGameLogicArgs();
    };


}
