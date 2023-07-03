import { useEffect, useState } from "react";
import { Tracks } from "../functions/Tracks";
import { keys, useKeyboard } from "./useKeyboard";
import { melody as plassairDAmourMelody } from "../melodies/plasairDAmour";
import { melody as entertainerMelody } from "../melodies/entertainer";


// export const START_MELODY = plassairDAmourMelody;
export const START_MELODY = plassairDAmourMelody;
export const INITIAL_IS_PLAYING = false;

const melodies = [
    plassairDAmourMelody,entertainerMelody
]
export const melodyNames = melodies.map(({name}) => name);

const nullishMelody = {
    instruments: [], settings: {}, chords: [], author: '', name: ''
}

const TIME_TO_START_TONEJS_= 3000; // after this time no problems with starting tone.js on production. Without, music does not play

export const useTracks = () => {
    const [tracks, setTracks]: [any, any] = useState(null)
    const [isPlaying, setIsPlaying] = useState(INITIAL_IS_PLAYING)
    const [isSoundReady, setIsSoundReady] = useState(false);
    const [currentMelodyName, setCurrentMelodyName] = useState('');
    const [currentMelody, setCurrentMelody]: [any, any] = useState(nullishMelody);

    useEffect(() => {
        setTimeout(() => {
            setCurrentMelodyName(START_MELODY.name)
            setIsSoundReady(true)
        }, TIME_TO_START_TONEJS_)
        // setCurrentMelodyName(START_MELODY.name)

    }, [])
    
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
        isSoundReady
    }
}
