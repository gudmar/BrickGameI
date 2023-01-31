import { GameLogic } from "../../cartridges/AbstractGameLogic";
import { Level, nextFigurePreview, OneToTen, Speed } from "../../types/types";

export enum BrickMode {
    GameOn, GameOff, Sticker, NoBrick
}

export enum StickersVariant {
    L, R,
}

export interface BrickInterface {
    mode: BrickMode
}

export interface BrickStickersProps {
    variant: StickersVariant
}

export interface Row {
    row: number[];
    brickMode: BrickMode;
}

export interface WallProps {
    rows: Row[];
    brickMode: BrickMode;
}

export interface GameProps {
    level: number,
    speed: number,
    setAvailableGameNames: (availableGameNames: string[]) => void,
    currentGameName: string,
}

export interface Navigation {
    speed: number,
    level: number,
    games: any[], // TO BE CHANGED
    currentGameName: string;
}

export interface DisplayProps {
    speed: Speed,
    level: Level,
    currentGame: typeof GameLogic,
}
