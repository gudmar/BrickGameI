import { useEffect, useState } from "react";
import { Tracks } from "../functions/Tracks";
import { melody } from "../melodies/plasairDAmour";
import { Melody } from "../types/types";
import { keys, useKeyboard } from "./useKeyboard";

const useTracks = ({
    instruments, settings
}: Melody) => {
    const [tracks, setTracks]: [any, any] = useState(null)
    useEffect(() => {
        setTracks(new Tracks({instruments, settings}))
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
    const {play, stop} = useTracks(melody)
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
