import { directions, Variants } from "../../../types/types";
import { getEmptyBoard } from "../../constants";
import { Bullet } from "../bullet";

export const getEmptyLayerForPlacingTank = () => [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
];

export const TANKS_NO_COLISION_EMPTY = [
    { variant: Variants.ENEMY, cords: {row: 1, col: 1 }, isPlaced: false},
    { variant: Variants.ENEMY, cords: {row: 1, col: 8 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 18, col: 1 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 18, col: 7 }, isPlaced: true},
]

export const TANKS_COLISION_EMPTY = [
    { variant: Variants.ENEMY, cords: {row: 1, col: 1 }, isPlaced: false},
    { variant: Variants.ENEMY, cords: {row: 1, col: 3 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 18, col: 1 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 18, col: 7 }, isPlaced: true},
]

export const TANKS_NO_COLISION_BULLET = [
    { variant: Variants.ENEMY, cords: {row: 1, col: 1 }, isPlaced: false},
    { variant: Variants.ENEMY, cords: {row: 1, col: 8 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 18, col: 1 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 18, col: 7 }, isPlaced: true},
]

export const createBullet = () => {
    const bullet = new Bullet(Variants.ENEMY, {col: 1, row: 1}, directions.UP)
}


export const TANK_OPONENT = [
    [0, 1, 0],
    [1, 1, 1],
    [1, 0, 1],
]

export const TANK_PLAYER = [
    [0, 1, 0],
    [1, 1, 1],
    [1, 1, 1],
]

export const VISITED_EMPTY = {
    background: getEmptyBoard(),
    pawnLayer: getEmptyBoard(),
}
