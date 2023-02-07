import {KeyPress, GameLogicArgs, Speed} from '../types/types'
import { shouldGenerateNextMove } from '../functions/shouldGenerateNextMove';

// type NextFigureFieldContent = [number[], number[], number[] ,number[]];
// type NextFigureFieldContent = number[][];


export const arrayOfElements  = <T>(length: number, element: T) => Array(length).fill(element);
export const getDojoOfSymbols = (digit:number) => {
    return arrayOfElements<number[]>(20, arrayOfElements<number>(10, digit));
}
export const getNextFigureOfSymbols = (digit:number) => {
    return arrayOfElements<number[]>(4, arrayOfElements<number>(4, digit));
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
