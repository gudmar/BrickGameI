import { GameLogic } from "../cartridges/AbstractGameLogic";

export type OneToTen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type Speed = OneToTen;

export type Level = OneToTen;

export type nextFigurePreview = number[][]
export type BrickMap = number[][];

export interface ScheaduleProps {
    background: BrickMap,
    animationSequencer: any,
    repetitions: number,
    tickDivider?: number,
    scheaduler?: any,
}

export interface GameLogicArgs {
    score: number,
    level: OneToTen,
    speed: OneToTen,
    // nextFigureFieldContent: [number[], number[], number[] ,number[]],
    nextFigure: nextFigurePreview,
    brickMap: BrickMap,
    isPaused: boolean,
    isAnimating: boolean,
}

export interface GameState {
    nextFigure: nextFigurePreview,
    level: OneToTen,
    speed: OneToTen,
    score: number,
    isPaused: false,
    isAnimating: false,
    brickMap: BrickMap,
}

// export interface KeyPress {
//     up: number,
//     down: number,
//     right: number,
//     left: number,
// }

export enum KeyPress {
    Up, Down, Left, Right, Level, Speed, Pause, Rotate
}

export interface ConsoleArgs {
    currentGame: string,
    speed: OneToTen,
    level: OneToTen,
    setSpeed: (val: OneToTen) => void,
    setLevel: (val: OneToTen) => void,
}

export interface DoWithBar {
    dojo: number[][],
    index: number,
    pixelModificationFunction: (currentValue: number) => number
}
