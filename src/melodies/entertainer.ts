import { SAWTOOTH, TRIANGLE } from "../constants/constants"
import { Melody, MelodySettings } from "../types/types"

const entertainer = [
    {time: '0:0', note: ['D5'], duration: '4n'},
    {time: '0:1', note: ['E5'], duration: '4n'},
    {time: '0:2', note: ['C5'], duration: '4n'},
    {time: '0:3', note: ['A4'], duration: '2n'},

    // {time: '1:0', note: ['A4'], duration: '4n'},
    {time: '1:1', note: ['B4'], duration: '4n'},
    {time: '1:2', note: ['G4'], duration: '4n'},
    // {time: '1:3', note: [0], duration: '4n'},

    {time: '2:0', note: ['D5'], duration: '4n'},
    {time: '2:1', note: ['E5'], duration: '4n'},
    {time: '2:2', note: ['C5'], duration: '4n'},
    {time: '2:3', note: ['A4'], duration: '2n'},

    // {time: '3:0', note: ['A4'], duration: '4n'},
    {time: '3:1', note: ['B4'], duration: '4n'},
    {time: '3:2', note: ['G4'], duration: '4n'},
    // {time: '3:0', note: [0], duration: '4n'},

    {time: '4:0', note: ['D4'], duration: '4n'},
    {time: '4:1', note: ['E4'], duration: '4n'},
    {time: '4:2', note: ['C4'], duration: '4n'},
    // {time: '4:3', note: [0], duration: '4n'},

    //==========================================

    // {time: '5:0', note: [0], duration: '1n'},

    // {time: '6:0', note: [0], duration: '1n'},

    {time: '7:0', note: ['G5'], duration: '4n'},
    // {time: '7:1', note: [0], duration: '4n'},
    {time: '7:2', note: ['D4'], duration: '4n'},
    {time: '7:3', note: ['D#4'], duration: '4n'},

    {time: '8:0', note: ['E4'], duration: '4n'},
    {time: '8:1', note: ['C5'], duration: '2n'},
    {time: '8:3', note: ['E4'], duration: '4n'},

    {time: '9:0', note: ['C5'], duration: '2n'},
    {time: '9:2', note: ['E4'], duration: '4n'},
    {time: '9:3', note: ['C5'], duration: '4n'},

    //=============================================

    {time: '10:0', note: ['C5'], duration: '1n'},

    {time: '11:0', note: [0], duration: '4n'},
    {time: '11:1', note: ['C5'], duration: '4n'},
    {time: '11:2', note: ['D5'], duration: '4n'},
    {time: '11:3', note: ['D#5'], duration: '5n'},

    {time: '12:0', note: ['E5'], duration: '4n'},
    {time: '12:1', note: ['C5'], duration: '4n'},
    {time: '12:2', note: ['D5'], duration: '4n'},
    {time: '12:3', note: ['E5'], duration: '2n'},

    // {time: '13:0', note: ['E5'], duration: '4n'},
    {time: '13:1', note: ['B4'], duration: '4n'},
    {time: '13:2', note: ['D5'], duration: '2n'},

    {time: '14:0', note: ['C5'], duration: '1n'},

    //==========================================

    {time: '15:0', note: ['D5'], duration: '4n'},
    {time: '15:1', note: ['D4'], duration: '4n'},
    {time: '15:2', note: ['D#4'], duration: '2n'},

    {time: '16:0', note: ['E4'], duration: '4n'},
    {time: '16:1', note: ['C5'], duration: '2n'},
    {time: '16:3', note: ['E4'], duration: '4n'},

    {time: '17:0', note: ['C5'], duration: '2n'},
    {time: '17:2', note: ['E4'], duration: '4n'},
    {time: '17:3', note: ['C5'], duration: '4n'},

    {time: '18:0', note: ['C5'], duration: '1n'},

    {time: '19:0', note: ['C5'], duration: '4n'},
    {time: '19:1', note: [0], duration: '4n'},
    {time: '19:2', note: ['A4'], duration: '4n'},
    {time: '19:3', note: ['G4'], duration: '4n'},

    //==========================================
    
    {time: '20:0', note: ['F#4'], duration: '4n'},
    {time: '20:1', note: ['A4'], duration: '4n'},
    {time: '20:2', note: ['C5'], duration: '4n'},
    {time: '20:3', note: ['E5'], duration: '2n'},

    // {time: '21:0', note: ['E5'], duration: '4n'},
    {time: '21:1', note: ['D5'], duration: '4n'},
    {time: '21:2', note: ['C5'], duration: '4n'},
    {time: '21:3', note: ['A4'], duration: '4n'},

    {time: '22:0', note: ['D5'], duration: '1n'},

    {time: '23:0', note: ['D5'], duration: '4n'},
    {time: '23:1', note: [0], duration: '4n'},
    {time: '23:2', note: ['D4'], duration: '4n'},
    {time: '23:3', note: ['D#4'], duration: '4n'},

    {time: '24:0', note: ['E4'], duration: '4n'},
    {time: '24:1', note: ['C5'], duration: '4n'},
    {time: '24:3', note: ['E4'], duration: '4n'},

    //==========================================

    {time: '25:0', note: ['C5'], duration: '2n'},
    {time: '25:2', note: ['E4'], duration: '4n'},
    {time: '25:3', note: ['C5'], duration: '4n'},

    {time: '26:0', note: ['C5'], duration: '1n'},

    {time: '27:0', note: [0], duration: '4n'},
    {time: '27:1', note: ['C5'], duration: '4n'},
    {time: '27:2', note: ['D5'], duration: '4n'},
    {time: '27:3', note: ['D#5'], duration: '4n'},

    {time: '28:0', note: ['E5'], duration: '4n'},
    {time: '28:1', note: ['C5'], duration: '4n'},
    {time: '28:2', note: ['D5'], duration: '4n'},
    {time: '28:3', note: ['E5'], duration: '2n'},

    // {time: '29:0', note: ['E5'], duration: '4n'},
    {time: '29:1', note: ['B4'], duration: '4n'},
    {time: '29:2', note: ['D5'], duration: '2n'},

//=============================================

    {time: '30:0', note: ['C5'], duration: '1n'},

    {time: '31:0', note: ['C5'], duration: '4n'},
    {time: '31:1', note: [0], duration: '4n'},
    {time: '31:2', note: ['C5'], duration: '4n'},
    {time: '31:3', note: ['D5'], duration: '4n'},

    {time: '32:0', note: ['E5'], duration: '4n'},
    {time: '32:1', note: ['C5'], duration: '4n'},
    {time: '32:2', note: ['D5'], duration: '4n'},
    {time: '32:3', note: ['E5'], duration: '2n'},

    // {time: '33:0', note: ['E5'], duration: '4n'},
    {time: '33:1', note: ['C5'], duration: '4n'},
    {time: '33:2', note: ['D5'], duration: '4n'},
    {time: '33:3', note: ['C5'], duration: '4n'},

    {time: '34:0', note: ['E5'], duration: '4n'},
    {time: '34:1', note: ['C5'], duration: '4n'},
    {time: '34:2', note: ['D5'], duration: '4n'},
    {time: '34:3', note: ['E5'], duration: '2n'},

    //=================================================

    // {time: '35:0', note: ['E5'], duration: '4n'},
    {time: '35:1', note: ['C5'], duration: '4n'},
    {time: '35:2', note: ['D5'], duration: '4n'},
    {time: '35:3', note: ['C5'], duration: '4n'},

    {time: '36:0', note: ['E5'], duration: '4n'},
    {time: '36:1', note: ['C5'], duration: '4n'},
    {time: '36:2', note: ['D5'], duration: '4n'},
    {time: '36:3', note: ['E5'], duration: '2n'},

    // {time: '37:0', note: ['E5'], duration: '4n'},
    {time: '37:1', note: ['B4'], duration: '4n'},
    {time: '37:2', note: ['D5'], duration: '2n'},
    
    {time: '38:0', note: ['C5'], duration: '2n.'},
    {time: '38:0', note: [0], duration: '1n'},

    {time: '39:0', note: ['D6'], duration: '4n'},
    {time: '39:0', note: [0], duration: '2n.'},
    
]

const entertainerBassLine = [
    {time: '0:0', note:[0], duration: '1n'},

    {time: '1:0', note:[0], duration: '1n'},

    {time: '2:0', note:[0], duration: '1n'},

    {time: '3:0', note:[0], duration: '1n'},

    {time: '4:0', note:[0], duration: '2n.'},
    {time: '4:3', note:['A3'], duration: '4n'},

    //===================

    {time: '5:0', note:['A3'], duration: '4n'},
    {time: '5:1', note:['B3'], duration: '4n'},
    {time: '5:2', note:['A3'], duration: '4n'},
    {time: '5:3', note:['G#3'], duration: '4n'},

    {time: '6:0', note:['G3'], duration: '2n'},
    {time: '6:0', note:[0], duration: '2n'},

    {time: '7:0', note:['G2'], duration: '4n'},
    {time: '7:1', note:[0], duration: '2n.'},

    {time: '8:0', note:['C3'], duration: '4n'},
    {time: '8:1', note:[0], duration: '4n'},
    {time: '8:2', note:['E3'], duration: '4n'},
    {time: '8:3', note:[0], duration: '4n'},

    {time: '9:0', note:['C3'], duration: '4n'},
    {time: '9:1', note:[0], duration: '4n'},
    {time: '9:2', note:['G3'], duration: '4n'},
    {time: '9:3', note:[0], duration: '4n'},

    {time: '10:0', note:['F2'], duration: '4n'},
    {time: '10:1', note:[0], duration: '4n'},
    {time: '10:2', note:['F3'], duration: '4n'},
    {time: '10:3', note:[0], duration: '4n'},

    {time: '11:0', note:['E3', 'G3'], duration: '4n'},
    {time: '11:1', note:[0], duration: '2n.'},
    
    {time: '12:0', note:['C3'], duration: '4n'},
    {time: '12:1', note:[0], duration: '4n'},
    {time: '12:2', note:['E3'], duration: '4n'},
    {time: '12:3', note:[0], duration: '4n'},
    
    {time: '13:0', note:['B2'], duration: '4n'},
    {time: '13:1', note:[0], duration: '4n'},
    {time: '13:2', note:['F3'], duration: '4n'},
    {time: '13:3', note:[0], duration: '4n'},

    {time: '14:0', note:['C3'], duration: '4n'},
    {time: '14:1', note:[0], duration: '4n'},
    {time: '14:2', note:['G3'], duration: '4n'},
    {time: '14:3', note:[0], duration: '4n'},

    //===================

    {time: '15:0', note:['C3'], duration: '4n'},
    {time: '15:1', note:[0], duration: '2n.'},

    {time: '16:0', note:['C3'], duration: '4n'},
    {time: '16:1', note:[0], duration: '4n'},
    {time: '16:2', note:['E3'], duration: '4n'},
    {time: '16:3', note:[0], duration: '4n'},

    {time: '17:0', note:['C3'], duration: '4n'},
    {time: '17:1', note:[0], duration: '4n'},
    {time: '17:2', note:['G3'], duration: '4n'},
    {time: '17:3', note:[0], duration: '4n'},

    {time: '18:0', note:['F3'], duration: '4n'},
    {time: '18:1', note:[0], duration: '4n'},
    {time: '18:2', note:['F3'], duration: '4n'},
    {time: '18:3', note:[0], duration: '4n'},

    {time: '19:0', note:['E3', 'G3'], duration: '4n'},
    {time: '19:1', note:[0], duration: '2n.'},

    //===============

    {time: '20:0', note:['D3'], duration: '1n'},

    {time: '21:0', note:['F#3', 'A3'], duration: '1n'},

    {time: '22:0', note:['G3'], duration: '4n'},
    {time: '22:1', note:[0], duration: '4n'},
    {time: '22:2', note:['F3'], duration: '4n'},
    {time: '22:3', note:[0], duration: '4n'},

    {time: '23:0', note:['F3'], duration: '4n'},
    {time: '23:1', note:[0], duration: '4n'},
    {time: '23:2', note:['D3'], duration: '4n'},
    {time: '23:3', note:[0], duration: '4n'},

    {time: '24:0', note:['C3'], duration: '4n'},
    {time: '24:1', note:[0], duration: '4n'},
    {time: '24:2', note:['E3'], duration: '4n'},
    {time: '24:3', note:[0], duration: '4n'},

    // ================

    {time: '25:0', note:['C3'], duration: '4n'},
    {time: '25:1', note:[0], duration: '4n'},
    {time: '25:2', note:['G3'], duration: '4n'},
    {time: '25:3', note:[0], duration: '4n'},

    {time: '26:0', note:['F3'], duration: '4n'},
    {time: '26:1', note:[0], duration: '4n'},
    {time: '26:2', note:['F3'], duration: '4n'},
    {time: '26:3', note:[0], duration: '4n'},

    {time: '27:0', note:['E3', 'G3'], duration: '4n'},
    {time: '27:1', note:[0], duration: '2n.'},

    {time: '28:0', note:['C3'], duration: '4n'},
    {time: '28:1', note:[0], duration: '4n'},
    {time: '28:2', note:['E3'], duration: '4n'},
    {time: '28:3', note:[0], duration: '4n'},

    {time: '29:0', note:['B2'], duration: '4n'},
    {time: '29:1', note:[0], duration: '4n'},
    {time: '29:2', note:['F3'], duration: '4n'},
    {time: '29:3', note:[0], duration: '4n'},

    //============

    {time: '30:0', note:['C3'], duration: '4n'},
    {time: '30:1', note:[0], duration: '4n'},
    {time: '30:2', note:['G3'], duration: '4n'},
    {time: '30:3', note:[0], duration: '4n'},

    {time: '31:0', note:['C3'], duration: '4n'},
    {time: '31:1', note:[0], duration: '2n.'},

    {time: '32:0', note:['C3', 'E3', 'G3'], duration: '1n'},

    {time: '33:0', note:['A3'], duration: '1n'},

    {time: '34:0', note:['A3'], duration: '1n'},

    //=========

    {time: '35:0', note:['G#3'], duration: '1n'},

    {time: '36:0', note:['G#3'], duration: '1n'},

    {time: '37:0', note:['G#3'], duration: '1n'},

    {time: '38:0', note:['C3'], duration: '4n'},
    {time: '38:1', note:[0], duration: '4n'},
    {time: '38:2', note:['G3'], duration: '4n'},
    {time: '38:3', note:[0], duration: '4n'},

    {time: '39:0', note:['C3'], duration: '4n'},
    {time: '39:1', note:[0], duration: '2n.'},

]

const settings: MelodySettings = {
    timeSignature: 4,
    tempo: 200,
}

export const melody: Melody = {
    chords: [
        { notes: entertainer, oscillator: SAWTOOTH },
        { notes: entertainerBassLine, oscillator: TRIANGLE }
    ],
    settings,
    name: 'Entertainer',
    author: 'Scott Joplin'
}
