// !!!!!!!!!!!!!!!!!!!!!!!!!!
// Avoid: _(space), 's', 'l', 'p' in codes, as those chars have other effects on game
// !!!!!!!!!!!!!!!!!!!!!!!!!!

import { cartridges } from "./cartridgeLibrary"

export const STOP_TIMER = 'freeze'
export const START_TIMER = 'heat'
export const UP_LOCK = 'burden'
export const ADD_POINTS = 'money'
export const UP_UNLOCK = 'feather'
export const DONT_BUMP = 'lagiewka'
export const BUMP = 'hit'
export const SHORT_SNAKE = 'cut'

export const gameCodes = [
    STOP_TIMER, START_TIMER, UP_LOCK, ADD_POINTS, UP_UNLOCK, DONT_BUMP, BUMP, SHORT_SNAKE
]

export const codesDescription = {
    [cartridges.SNAKE]:[
        {
            code: SHORT_SNAKE,
            description: 'Snake will shrink to its initial size'
        },
        {
            code: STOP_TIMER,
            description: 'Stop timer',
        },
        {
            code: START_TIMER,
            description: 'Start timer',
        },
        {
            code: ADD_POINTS,
            description: 'Get 5000',
        },
        {
            code: DONT_BUMP,
            description: 'Not a cheat. Allow snake to teleport when hit a wall',
        },
        {
            code: BUMP,
            description: 'Not a cheat. Crash snake when hit a wall',
        }
    ],
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
    ],
    [cartridges.MAZE]: [
        {
            code: STOP_TIMER,
            description: 'Stop decrementing points when time passes'
        },
        {
            code: START_TIMER,
            description: 'Start decrementing points when time passes'
        },
        {
            code: DONT_BUMP,
            description: 'Don`t decrement score on wall hit',
        },
        {
            code: BUMP,
            description: 'Decrement score on wall hit',
        }
    ]
}
