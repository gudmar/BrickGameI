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

// const melody = [
//     ['C4', '8n'],
//     ['E4', '8n'],
//     ['G4', '8n'],
//     ['C4', '8n'],
//     ['E4', '8n'],
//     ['G4', '8n'],
//     ['C4', '8n'],
//     ['E4', '8n'],
//     ['G4', '8n'],
//     ['C4', '8n'],
//     ['E4', '8n'],
//     ['G4', '8n'],

// ]

const melody = [
    ["G4", "G4"],
    "G4",
    "F3",
    ["B4", "B4"],
    "B4",
    "G4",
    ["G4", "B4"],
    "D5",
    ["D5", "D5"],
    ["C5", "B4"],
    "A4",
    "A4",
    ["A4", "B4"],
]
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

const useMelody = (notes: (string | number | (string | number )[])[]) => {
    const [startFunction, setStartFunction] = useState(() =>() => {console.log('INITIAL start')})
    const [stopFunction, setStopFunction] = useState(() =>() => {console.log('initila STOP')})
    useEffect(() => {
        const synth = new Tone.Synth().toDestination();
        const seq = new Tone.Sequence((time, note) => {
                    synth.triggerAttackRelease(note, 0.5, time)
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
    const {play, pause} = useMelody(melody)
    const [isPlaying, setIsPlaying] = useState(false)
    
    const togglePlay = () => {
        if (isPlaying) {
            pause()
        } else {
            play();
        }
        setIsPlaying(!isPlaying)
    }
    useKeyboard({ key: keys.V, callback: togglePlay})
}