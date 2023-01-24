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
