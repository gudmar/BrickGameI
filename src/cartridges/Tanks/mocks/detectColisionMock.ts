import { getEmptyBoard } from "../../constants";
import { variants } from "../tank";

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
    { variant: variants.ENEMY, cords: {row: 1, col: 1 }},
    { variant: variants.ENEMY, cords: {row: 1, col: 8 }},
    { variant: variants.ENEMY, cords: {row: 18, col: 1 }},
    { variant: variants.ENEMY, cords: {row: 18, col: 7 }},
]

export const TANKS_OUTSIDE_BOARD_EMPTY = [
    { variant: variants.ENEMY, cords: {row: 1, col: 1 }}, 
    { variant: variants.ENEMY, cords: {row: 1, col: 8 }},
    { variant: variants.ENEMY, cords: {row: 18, col: 1 }},
    { variant: variants.ENEMY, cords: {row: 18, col: 8 }},// colision
]

export const TANKS_COLISION_EMPTY = [
    { variant: variants.ENEMY, cords: {row: 1, col: 1 }},
    { variant: variants.ENEMY, cords: {row: 1, col: 3 }}, // colision
    { variant: variants.ENEMY, cords: {row: 18, col: 1 }},
    { variant: variants.ENEMY, cords: {row: 18, col: 7 }},
]

export const TANKS_COLISION_OBSTACLE = [
    { variant: variants.PLAYER, cords: {row: 1, col: 1 }}, // colision
    { variant: variants.ENEMY, cords: {row: 1, col: 8 }},
    { variant: variants.ENEMY, cords: {row: 18, col: 1 }},
    { variant: variants.ENEMY, cords: {row: 18, col: 7 }},
]

export const TANKS_NO_COLISION_OBSTACLES = [
    { variant: variants.ENEMY, cords: {row: 1, col: 8 }},
    { variant: variants.ENEMY, cords: {row: 18, col: 1 }},
    { variant: variants.ENEMY, cords: {row: 18, col: 7 }},
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
