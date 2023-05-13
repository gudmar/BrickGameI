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
export const GHOST = 'wraith'
export const IMMORTALITY = 'iddqd'
export const JUGGERNAUT = 'juggernaut'

const GET_POINTS_TEXT = 'Get extra 5000 and cheater label';
const START_TIMER_TEXT = 'Start timer';
const STOP_TIMER_TEXT = 'Stop timer';

export const gameCodes = [
    STOP_TIMER,
    START_TIMER,
    UP_LOCK,
    ADD_POINTS,
    UP_UNLOCK,
    DONT_BUMP,
    BUMP,
    SHORT_SNAKE,
    GHOST,
    IMMORTALITY,
    JUGGERNAUT,
]

export const codesDescription = {
    [cartridges.TENNIS]:[
        {
            code: IMMORTALITY,
            description: 'Infinite nr of lifes',
        },
        {
            code: ADD_POINTS,
            description: 'Adds extra 5000 points'
        },
        {
            code: JUGGERNAUT,
            description: 'More then one brick are destroyed at one hit'
        }
    ],
    [cartridges.RACE]:[
        {
            code: ADD_POINTS,
            description: GET_POINTS_TEXT,
        },
        {
            code: GHOST,
            description: 'Penetrate other cars'
        },
        {
            code: STOP_TIMER,
            description: STOP_TIMER_TEXT,
        },
        {
            code: START_TIMER,
            description: START_TIMER_TEXT,
        }
    ],
    [cartridges.SNAKE]:[
        {
            code: SHORT_SNAKE,
            description: 'Snake will shrink to its initial size'
        },
        {
            code: STOP_TIMER,
            description: STOP_TIMER_TEXT,
        },
        {
            code: START_TIMER,
            description: START_TIMER_TEXT,
        },
        {
            code: ADD_POINTS,
            description: GET_POINTS_TEXT,
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
            description: STOP_TIMER_TEXT,
        },
        {
            code: START_TIMER,
            description: START_TIMER_TEXT,
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
            description: GET_POINTS_TEXT,
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
    ],
    [cartridges.TANKS]: [
        {
            code: STOP_TIMER,
            description: 'Stops timer, and other tanks cannot perform any action. Beware. In this game it works only a while. You become a cheater. Is it worth it?'
        },
        {
            code: ADD_POINTS,
            description: GET_POINTS_TEXT,
        },

    ]
}
