import { useEffect, useState } from "react";
import { useMelody } from "../context/musicProvider";
import { Tracks } from "../functions/Tracks";
import { keys, useKeyboard } from "./useKeyboard";

const useTracks = () => {
    const { melody } = useMelody()
    const { instruments, settings, chords, author, name } = melody;
    const [tracks, setTracks]: [any, any] = useState(null)
    
    useEffect(() => {
        tracks?.cancel();
        setTracks(new Tracks({instruments, settings, chords, author, name}))
        return () => {
            tracks?.clear();
        }
    }, [melody])
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
