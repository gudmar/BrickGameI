
import { PawnCords } from "../cartridges/GameCreator";
import { Tank } from "../cartridges/Tanks/tank";
import { TankVisitor } from "../cartridges/Tanks/tanks";

export type OneToTen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type Speed = OneToTen;

export type Level = OneToTen;

export enum ObstacleLocations {
    above, below, left, right, noTouch, bottomLeft, bottomRight, topLeft, topRight, gameLost,
}

export enum BallDirections {
    upLeft, upRight, downRight, downLeft, gameLost,
}


// export type NextFigurePreview = number[][]
export type NextFigurePreview = number[][]

export type BrickMap = number[][];

export enum directions {DOWN, LEFT, RIGHT, UP, STALE}

export interface ScheaduleProps {
    background: BrickMap,
    animationSequencer: any,
    repetitions: number,
    tickDivider?: number,
    scheaduler?: any,
}

export interface Bulletable {
    startCords: PawnCords,
    sourceTank: Tank,
    hitCallback: (...args:any) => any,
    nextStateCalculator?: TankVisitor,
}

export enum Variants {PLAYER, ENEMY}

export type DigitDisplayType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | '' | '-';
export const digitDisplaySymbols = [...'1234567890-'.split(''), ''];


export interface GameLogicArgs {
    score: number,
    level: OneToTen,
    speed: OneToTen,
    // nextFigureFieldContent: [number[], number[], number[] ,number[]],
    nextFigure: NextFigurePreview,
    brickMap: BrickMap,
    isPaused: boolean,
    isAnimating: boolean,
    isGameOver?: boolean,
    isGameWon?: boolean,
    isGameStarted?: boolean,
    isCheater?: boolean,
}

export interface GameState {
    nextFigure: NextFigurePreview,
    level: OneToTen,
    speed: OneToTen,
    score: number,
    isPaused: boolean,
    isAnimating: boolean,
    brickMap: BrickMap,
    isGameOver: boolean,
    isGameWon?: boolean,
    isGameStarted?: boolean,
    isCheater?:boolean,
    isGameSelectionAllowed?:boolean,
}

console.warn('GameState and GameLogicArgs seem too similar. Combine them')

// export interface KeyPress {
//     up: number,
//     down: number,
//     right: number,
//     left: number,
// }

export type NextFigure = (0 | 1)[][];

export interface FigureHandlePoint {
    row: number, col: number,
};

// export enum KeyPress {
//     Up, Down, Left, Right, Level, Speed, Pause, Rotate, Start
// }

export interface ConsoleArgs {
    currentGame: string,
    setIsGameSelectionAllowed: (val: boolean) => void,
}

export interface DoWithBar {
    dojo: number[][],
    index: number,
    pixelModificationFunction: (currentValue: number) => number
}
