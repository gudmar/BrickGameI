import React, { createContext, useContext } from 'react';
import { useTracks, melodyNames, INITIAL_IS_PLAYING, START_MELODY } from '../hooks/useMusicPlayer';

const MelodyContext = createContext({
    melody: START_MELODY,
    melodyNames,
    setCurrentMelodyName: ((melodyName: string):void => {}),
    isPlaying: INITIAL_IS_PLAYING,
    resetTrack: ():void=>{},
    togglePlay: ():void=>{},
})



export const useMelody = () => {
    const { melody, melodyNames, setCurrentMelodyName, isPlaying, resetTrack, togglePlay } = useContext(MelodyContext);
    if (!melody) throw new Error('useMelody should be used inside musicProvider')
    return { melody, melodyNames, setCurrentMelodyName, isPlaying, resetTrack, togglePlay }
}

export const MusicProvider = ({children}: {children: React.ReactNode}) => {
    const {
        isPlaying, resetTrack, togglePlay, currentMelody, melodyNames, setCurrentMelodyName
    } = useTracks();

    return (
        <MelodyContext.Provider value={{
            isPlaying,
            resetTrack,
            togglePlay,
            melody: currentMelody,
            melodyNames,
            setCurrentMelodyName,
        }}>
            {children}
        </MelodyContext.Provider>
    )
}
