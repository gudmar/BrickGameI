import { GameLogic } from "../cartridges/AbstractGameLogic";

export type OneToTen = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Speed = OneToTen;

export type Level = OneToTen;

export type nextFigurePreview = number[][]

export interface GameLogicArgs {
    score: number,
    level: number,
    speed: number,
    // nextFigureFieldContent: [number[], number[], number[] ,number[]],
    nextFigureFieldContent: nextFigurePreview,
    brickCoordinantes: number[][],
}

export interface KeyPress {
    up: number,
    down: number,
    right: number,
    left: number,
}

export interface ConsoleArgs {
    currentGame: typeof GameLogic,
    speed: OneToTen,
    level: OneToTen,
    setSpeed: (val: OneToTen) => void,
    setLevel: (val: OneToTen) => void,
}
