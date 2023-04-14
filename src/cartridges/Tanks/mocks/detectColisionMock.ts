import { Variants } from "../../../types/types";
import { getEmptyBoard } from "../../constants";

const EMPTY = [
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
    { variant: Variants.ENEMY, cords: {row: 1, col: 1 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 1, col: 8 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 18, col: 1 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 18, col: 7 }, isPlaced: true},
]

export const TANKS_OUTSIDE_BOARD_EMPTY = [
    { variant: Variants.ENEMY, cords: {row: 1, col: 1 }, isPlaced: true}, 
    { variant: Variants.ENEMY, cords: {row: 1, col: 8 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 18, col: 1 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 18, col: 8 }, isPlaced: true},// colision
]

export const TANKS_COLISION_EMPTY = [
    { variant: Variants.ENEMY, cords: {row: 1, col: 1 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 1, col: 3 }, isPlaced: true}, // colision
    { variant: Variants.ENEMY, cords: {row: 18, col: 1 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 18, col: 7 }, isPlaced: true},
]

export const TANKS_COLISION_OBSTACLE = [
    { variant: Variants.PLAYER, cords: {row: 1, col: 1 }, isPlaced: true}, // colision
    { variant: Variants.ENEMY, cords: {row: 1, col: 8 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 18, col: 1 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 18, col: 7 }, isPlaced: true},
]

export const TANKS_NO_COLISION_OBSTACLES = [
    { variant: Variants.ENEMY, cords: {row: 1, col: 8 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 18, col: 1 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 18, col: 7 }, isPlaced: true},
]

export const TANKS_NO_COLISION_WITH_NOT_PLACED = [
    { variant: Variants.ENEMY, cords: {row: 1, col: 1 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 1, col: 3 }, isPlaced: false}, // colision, but not placed
    { variant: Variants.ENEMY, cords: {row: 18, col: 1 }, isPlaced: true},
    { variant: Variants.ENEMY, cords: {row: 18, col: 7 }, isPlaced: true},
]

export const getBoardObatacles = () => [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0,],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0,],
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

export const VISITED_OBSTACLES = {
    background: getBoardObatacles(),
    pawnLayer: getEmptyBoard(),
}
