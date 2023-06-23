import { useEffect, useRef, useState } from "react";
// import Tone, { Oscillator } from "tone";
import * as Tone from "tone";
import { keys, useKeyboard } from "./useKeyboard";

const OSCILLATORS = {
    sawtooth: {type: 'sawtooth'},
    sine: {type: 'sine'},
    triangle: {type: 'triangle'},
    square: {type: 'square'},
}

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

const melody = [
    ['C4', 0.1],
    ['E4', 0.1],
    ['G4', 0.1],
    ['C4', 0.1],
    ['E4', 0.1],
    ['G4', 0.1],
    ['C4', 0.1],
    ['E4', 0.1],
    ['G4', 0.1],
    ['C4', 0.1],
    ['E4', 0.1],
    ['G4', 0.1],
    [['C4', 'G4'], 0.1],
]

const melody1 = [
    ['A4', 0.1],
    [['A4', 'C4', 'E4'], 0.1],
    ['C4', 0.1],
    ['E4', 0.1],
    ['A4', 0.1],
    ['C4', 0.1],
    ['E4', 0.1],
    ['A4', 0.1],
    ['C4', 0.1],
    ['E4', 0.1],
    ['A4', 0.1],
    ['C4', 0.1],
    ['E4', 0.1],
    [['A4', 'C4'], 0.1],
]


// const melody = [
//     ["G4", "G4"],
//     "G4",
//     "F3",
//     ["B4", "B4"],
//     "B4",
//     "G4",
//     ["G4", "B4"],
//     "D5",
//     ["D5", "D5"],
//     ["C5", "B4"],
//     "A4",
//     "A4",
//     ["A4", "B4"],
// ]
// const melody = [
//     "A4",
//     "G3",
//     "F2",
//     "G3", 
//     "A4",
//     "A4", 
//     "A4", 
//     0,
//     "G3",
//     "G3",
//     "G3",
//     0,
//     "A4",
//     "C6",
//     "C6",
//     0
// ]

// const useMelody = (notes: (string | number | (string | number )[])[]) => {
const useMelody = (notes: any[]) => {
    const [startFunction, setStartFunction] = useState(() =>() => {console.log('INITIAL start')})
    const [stopFunction, setStopFunction] = useState(() =>() => {console.log('initila STOP')})

    useEffect(() => {
        const synth = new Tone.Synth({
            oscillator: {
                type: 'sawtooth'
            }
        }).toDestination();
        const seq = new Tone.Part((time, note) => {
            console.log(note)
                // const [freq, last] = note;
                    // synth.triggerAttackRelease(note, 0.5, time)
                    synth.triggerAttackRelease(note.note, note.duration, time)
            },
            notes
        );
        setStartFunction(() => () => {seq.start(0); Tone.Transport.start()})
        setStopFunction(() => () => {seq.stop(0); Tone.Transport.stop()})
        return () => {
            seq.stop();
            Tone.Transport.stop();
        }
    }, [])
    
    // useEffect(() => {
    //     const synth = new Tone.Synth({
    //         oscillator: {
    //             type: 'sawtooth'
    //         }
    //     }).toDestination();
    //     const seq = new Tone.Sequence((time, note) => {
    //         console.log(note)
    //             // const [freq, last] = note;
    //                 // synth.triggerAttackRelease(note, 0.5, time)
    //                 synth.triggerAttackRelease(note, '8n', time)
    //         },
    //         notes.map(([note,_]) => note)
    //     );
    //     setStartFunction(() => () => {seq.start(0); Tone.Transport.start()})
    //     setStopFunction(() => () => {seq.stop(0); Tone.Transport.stop()})
    //     return () => {
    //         seq.stop();
    //         Tone.Transport.stop();
    //     }
    // }, [])

    const play = () => {
        startFunction();
        console.log('PLAY(ING')
    }
    const pause = () => {
        stopFunction();
        console.log('MUSIC STOPPED')
    }
    return {play, pause}
}


export const useMusicPlayer = () => {
    // const {play, pause} = useMelody(melody)
    const {play, pause} = useMelody(plasairDAmour)
    const {play: play1, pause: pause1} = useMelody(melody1)
    const [isPlaying, setIsPlaying] = useState(false)
    
    const togglePlay = () => {
        if (isPlaying) {
            pause()
            // pause1()
        } else {
            play();
            // play1()
        }

        setIsPlaying(!isPlaying)
    }
    useKeyboard({ key: keys.V, callback: togglePlay})
}