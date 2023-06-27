import { useEffect, useState } from "react";
import { useMelody } from "../context/musicProvider";
import { Tracks } from "../functions/Tracks";
import { melody } from "../melodies/entertainer";
// import { melody } from "../melodies/plasairDAmour";
import { Melody } from "../types/types";
import { keys, useKeyboard } from "./useKeyboard";

const useTracks = () => {
    const { melody } = useMelody()
    const { instruments, settings, chords, author, name } = melody;
    const [tracks, setTracks]: [any, any] = useState(null)
    useEffect(() => {
        if (tracks !== null){
            tracks?.clear();
            setTracks(new Tracks({instruments, settings, chords, author, name}))    
        }
    }, [melody, tracks, instruments, settings, chords, author, name])
    
    useEffect(() => {
        setTracks(new Tracks({instruments, settings, chords, author, name}))
        return () => {
            tracks?.clear();
        }
    }, [])
    const play = () => {
        if (tracks) tracks.play();
    }
    const stop = () => {
        if (tracks) tracks.stop();
    }
    return {
        play, stop,
    }
}

export const useMusicPlayer = () => {
    const {play, stop} = useTracks()
    const [isPlaying, setIsPlaying] = useState(false)
    
    const togglePlay = () => {
        if (isPlaying) {
            stop();
        } else {
            play();
        }

        setIsPlaying(!isPlaying)
    }
    useKeyboard({ key: keys.V, callback: togglePlay})
}
