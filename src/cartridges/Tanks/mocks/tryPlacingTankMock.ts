import { directions, Variants } from "../../../types/types";
import { getEmptyBoard } from "../../constants";
import { Bullet } from "../bullet";
import { Tank } from "../tank";

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
    { variant: Variants.ENEMY, cords: {row: 1, col: 1 }},
    { variant: Variants.ENEMY, cords: {row: 1, col: 8 }},
    { variant: Variants.ENEMY, cords: {row: 18, col: 1 }},
    { variant: Variants.ENEMY, cords: {row: 18, col: 7 }},
]

export const TANKS_COLISION_EMPTY = [
    { variant: Variants.ENEMY, cords: {row: 1, col: 1 }},
    { variant: Variants.ENEMY, cords: {row: 1, col: 2 }},
    { variant: Variants.ENEMY, cords: {row: 18, col: 1 }},
    { variant: Variants.ENEMY, cords: {row: 18, col: 7 }},
]

export const TANKS_COLISION_WITH_BULLET = [
    { variant: Variants.ENEMY, cords: {row: 1, col: 1 }},
    { variant: Variants.ENEMY, cords: {row: 1, col: 8 }},
    { variant: Variants.ENEMY, cords: {row: 18, col: 1 }},
    { variant: Variants.ENEMY, cords: {row: 18, col: 7 }},
]

export const createBullet = () => {
    const bullet = new Bullet({
        sourceTank: {
            variant: Variants.ENEMY,
            direction: directions.UP,
        } as Tank,
        startCords: {col: 1, row: 1},
        hitCallback: ()=>{},
    })

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
