import { SAWTOOTH, TRIANGLE } from "../constants/constants"
import { Melody, MelodySettings, Oscillators } from "../types/types"

const plasairDAmour = [
    {time: 0, note: 'C4', duration: '4n'},
    {time: '1:0', note: 'F4', duration: '2n.'},

    {time: '2:0', note: 'G4', duration: '2n.'},

    {time: '3:0', note: 'A4', duration: '2n.'},

    {time: '4:0', note: 'A4', duration: '2n'},
    {time: '4:2', note: 'A4', duration: '4n'},

    {time: '5:0', note: 'A#4', duration: '2n'},
    {time: '5:2', note: 'A#4', duration: '4n'},

    {time: '6:0', note: 'A4', duration: '4n'},
    {time: '6:1', note: 'G4', duration: '4n'},
    {time: '6:2', note: 'A4', duration: '4n'},

    {time: '7:0', note: 'G4', duration: '2n.'},

    {time: '8:0', note: 'G4', duration: '2n'},
    {time: '8:2', note: 'C4', duration: '1n'},

    {time: '9:0', note: 'D4', duration: '2n.'},

    {time: '10:0', note: 'E4', duration: '2n.'},

    {time: '11:0', note: 'F4', duration: '4n'},
    {time: '11:1', note: 'G4', duration: '4n'},
    {time: '11:2', note: 'A4', duration: '4n'},

    {time: '12:1', note: 'D4', duration: '4n'},
    {time: '12:2', note: 'G4', duration: '4n'},
    {time: '12:3', note: 'A#4', duration: '4n'},

    {time: '13:0', note: 'A4', duration: '2n.'},

    {time: '14:0', note: 'G4', duration: '2n.'},

    {time: '15:0', note: 'F4', duration: '2n.'},

    {time: '16:0', note: 'F4', duration: '2n'},
]

const plasairDAmourBassLine = [
    {time: 0, note: 0, duration: '4n'},

    {time: '1:0', note: 'F3', duration: '4n'},
    {time: '1:1', note: 'A3', duration: '4n'},
    {time: '1:2', note: 'C4', duration: '4n'},

    {time: '2:0', note: 'G3', duration: '4n'},
    {time: '2:1', note: 'A#3', duration: '4n'},
    {time: '2:2', note: 'C4', duration: '4n'},

    {time: '3:0', note: 'F3', duration: '4n'},
    {time: '3:1', note: 'A3', duration: '4n'},
    {time: '3:2', note: 'C4', duration: '4n'},

    {time: '4:0', note: 'F3', duration: '4n'},
    {time: '4:1', note: 'A3', duration: '4n'},
    {time: '4:2', note: 'C4', duration: '4n'},

    {time: '5:0', note: 'G3', duration: '4n'},
    {time: '5:1', note: 'A#3', duration: '4n'},
    {time: '5:2', note: 'C4', duration: '4n'},

    {time: '6:0', note: 'F3', duration: '4n'},
    {time: '6:1', note: 'A3', duration: '4n'},
    {time: '6:2', note: 'C4', duration: '4n'},

    {time: '7:0', note: 'E3', duration: '4n'},
    {time: '7:1', note: 'A#3', duration: '4n'},
    {time: '7:2', note: 'C4', duration: '4n'},

    {time: '8:0', note: 'E3', duration: '4n'},
    {time: '8:1', note: 'A#3', duration: '4n'},
    {time: '8:2', note: '0', duration: '4n'},

    {time: '9:0', note: 'A#2', duration: '4n'},
    {time: '9:1', note: 'D2', duration: '4n'},
    {time: '9:2', note: 'F3', duration: '4n'},

    {time: '10:0', note: 'A#2', duration: '4n'},
    {time: '10:1', note: 'C2', duration: '4n'},
    {time: '10:2', note: 'E3', duration: '4n'},

    {time: '11:0', note: 'A2', duration: '2n.'},

    {time: '12:0', note: 'A#2', duration: '2n.'},

    {time: '13:0', note: 'C2', duration: '4n'},
    {time: '13:1', note: 'F3', duration: '4n'},
    {time: '13:2', note: 'C3', duration: '4n'},
    
    {time: '14:0', note: 'C2', duration: '4n'},
    {time: '14:1', note: 'E3', duration: '4n'},
    {time: '14:2', note: 'G3', duration: '4n'},

    {time: '15:0', note: 'F2', duration: '4n'},
    {time: '15:1', note: 'A2', duration: '4n'},
    {time: '15:2', note: 'C4', duration: '4n'},

    {time: '16:0', note: 'F2', duration: '2n'},
]

const settings: MelodySettings = {
    timeSignature: [3, 4],
    tempo: 150,
}

export const melody: Melody = {
    instruments: [
        { notes: plasairDAmour, oscillator: SAWTOOTH },
        { notes: plasairDAmourBassLine, oscillator: TRIANGLE }
    ],
    settings,
    name: 'Plassiar DAmour',
    author: 'Giovanni Marini',
}
