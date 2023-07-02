import { useEffect, useState } from "react";
import { Tracks } from "../functions/Tracks";
import { keys, useKeyboard } from "./useKeyboard";
import { melody as plassairDAmourMelody } from "../melodies/plasairDAmour";
import { melody as entertainerMelody } from "../melodies/entertainer";


export const START_MELODY = plassairDAmourMelody;
export const INITIAL_IS_PLAYING = false;

const melodies = [
    plassairDAmourMelody,entertainerMelody
]
export const melodyNames = melodies.map(({name}) => name);

const nullishMelody = {
    instruments: [], settings: {}, chords: [], author: '', name: ''
}


export const useTracks = () => {
    const [tracks, setTracks]: [any, any] = useState(null)
    const [isPlaying, setIsPlaying] = useState(INITIAL_IS_PLAYING)
    const [currentMelodyName, setCurrentMelodyName] = useState('');
    const [nrOfSwitches, setNrOfSwitches] = useState(0)
    // const [currentMelodyName, setCurrentMelodyName] = useState(START_MELODY.name);
    // const [currentMelody, setCurrentMelody] = useState(START_MELODY);
    const [currentMelody, setCurrentMelody]: [any, any] = useState(nullishMelody);

    useEffect(() => {
        setCurrentMelodyName(START_MELODY.name)

    }, [])

    useEffect(() => {
        if (nrOfSwitches < 3) {
            setNrOfSwitches(nrOfSwitches + 1);
            setCurrentMelodyName(melodies[nrOfSwitches % melodies.length].name)
        }
    }, [nrOfSwitches])

    useEffect(() => {
        console.log('melody', currentMelody)
    }, [currentMelody])
    useEffect(() => {
        console.log('name', currentMelodyName)
    }, [currentMelodyName])
    
    const { instruments, settings, chords, author, name } = currentMelody;

    useEffect(() => {
        console.log('Setting melody name to ' + currentMelodyName)
        if (currentMelodyName !== '') {
            const melodyIndex = melodies.findIndex(({name}) => name === currentMelodyName)
            if (melodyIndex === -1) throw new Error(`Melody ${currentMelodyName} does not exist`);
            setCurrentMelody(melodies[melodyIndex])    
        }
    }, [currentMelodyName])

    useEffect(() => {
        tracks?.cancel();
        tracks?.rewind()
        console.log('%cSetting tracks', "background-color: green")
        setTracks(new Tracks({instruments, settings, chords, author, name}))
        return () => {
            console.log('%cClearing tracks', "background-color: red")
            tracks?.clear();
        }
    }, [currentMelody])

    useEffect(() => {
        if (isPlaying) { play() }
        else {stop()}
    }, [isPlaying])

    const play = () => {
        if (tracks) {
            tracks.play();
            setIsPlaying(true);
        }
    }
    const stop = () => {
        if (tracks) {
            tracks.stop();
            setIsPlaying(false);
        }
    }
    const resetTrack = () => {
        if (!tracks) return;
        tracks?.rewind()
        setCurrentMelodyName(START_MELODY.name);
        setIsPlaying(INITIAL_IS_PLAYING)
    }
    const togglePlay = () => {
        if (isPlaying) {
            stop();

        } else {
            play();
        }

    setIsPlaying(!isPlaying)
}
useKeyboard({ key: keys.V, callback: togglePlay})

    return {
        isPlaying, resetTrack, togglePlay, 
        currentMelody, melodyNames, setCurrentMelodyName,
    }
}
