// !!!!!!!!!!!!!!!!!!!!!!!!!!
// Avoid: _(space), 's', 'l', 'p' in codes, as those chars have other effects on game
// !!!!!!!!!!!!!!!!!!!!!!!!!!

import { cartridges } from "./games"

export const STOP_TIMER = 'freeze'
export const START_TIMER = 'heat'
export const UP_LOCK = 'burden'
export const ADD_POINTS = 'extortion'
export const UP_UNLOCK = 'feather'

export const gameCodes = [
    STOP_TIMER, START_TIMER, UP_LOCK, ADD_POINTS, UP_UNLOCK,
]

export const codesDescription = {
    [cartridges.TETRIS]: [
        {
            code: STOP_TIMER,
            description: 'Stop timer',
        },
        {
            code: START_TIMER,
            description: 'Start timer',
        },
        {
            code: UP_UNLOCK,
            description: 'Allow up arrow',
        },
        {
            code: UP_UNLOCK,
            description: 'Forbid up arrow',
        },
        {
            code: ADD_POINTS,
            description: 'Get 5000',
        },
    ]
}
