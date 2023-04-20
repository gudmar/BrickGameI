import { GameLogic } from "../cartridges/AbstractGameLogic";
import { PawnCords } from "../cartridges/GameCreator";

export type OneToTen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type Speed = OneToTen;

export type Level = OneToTen;

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
    variant: Variants,
    startCords: PawnCords,
    direction: directions,
    hitCallback: (...args:any) => any,
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
    speed: OneToTen,
    level: OneToTen,
    setSpeed: (val: OneToTen) => void,
    setLevel: (val: OneToTen) => void,
    setIsGameSelectionAllowed: (val: boolean) => void,
}

export interface DoWithBar {
    dojo: number[][],
    index: number,
    pixelModificationFunction: (currentValue: number) => number
}
