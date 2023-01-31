import {KeyPress, GameLogicArgs, Speed} from '../types/types'
import { shouldGenerateNextMove } from '../functions/shouldGenerateNextMove';

// type NextFigureFieldContent = [number[], number[], number[] ,number[]];
// type NextFigureFieldContent = number[][];


const arrayOfElements  = <T>(length: number, element: T) => Array(length).fill(element);

export class GameLogic {
    protected EMPTY_FIELD_CONTENT = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    protected getDojoOfSymbols(digit: number) {
        return arrayOfElements<number[]>(20, arrayOfElements<number>(10, digit));
    }
    protected EMPRY_BRICK_COORDINANTES: number[][] = this.getDojoOfSymbols(0);
    protected score: number = 0;
    protected level: number = 0;
    protected speed: number = 0;
    protected nextFigureFieldContent = this.EMPTY_FIELD_CONTENT;
    protected paused: boolean = false;
    protected brickCoordinantes = this.EMPRY_BRICK_COORDINANTES

    init({ score, level, speed, nextFigureFieldContent, brickCoordinantes }: GameLogicArgs) {
        this.score = score;
        this.level = level;
        this.speed = speed;
        this.nextFigureFieldContent = nextFigureFieldContent;
        this.brickCoordinantes = brickCoordinantes;
    }

    setPaused(value: boolean): void {
        this.paused = value;
    }

    protected getEmptyGameLogicArgs():GameLogicArgs {
        return {
            score:this.score, 
            level: this.level, 
            speed: this.speed, 
            nextFigureFieldContent : this.EMPTY_FIELD_CONTENT,
            brickCoordinantes: this.EMPRY_BRICK_COORDINANTES,
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
