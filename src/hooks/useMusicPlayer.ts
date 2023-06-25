import { useEffect, useState } from "react";
import * as Tone from "tone";
import { PolySynth } from "tone";
import { Tracks } from "../functions/Tracks";
import { melody } from "../melodies/entertainer";
// import { melody } from "../melodies/plasairDAmour";
import { Melody } from "../types/types";
import { keys, useKeyboard } from "./useKeyboard";

// class Tracks {
//     synth = new PolySynth().toDestination();
//     constructor(settings: any){
//         this.synth.set({oscillator: {type: 'square'}})
//     }

//     play() {
//         this.synth.triggerAttackRelease(['C4', 'E4', 'B4', ], 1, 1)
//         Tone.Transport.start();
//     }
//     stop(){
//         Tone.Transport.stop();
//     }
// }

const useTracks = ({
    instruments, settings, chords
}: Melody) => {
    const [tracks, setTracks]: [any, any] = useState(null)
    useEffect(() => {
        setTracks(new Tracks({instruments, settings, chords}))
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
