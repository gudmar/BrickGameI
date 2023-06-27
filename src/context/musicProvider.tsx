import React, { createContext, useContext, useEffect, useState } from 'react';
import { melody as plassairDAmourMelody } from "../melodies/plasairDAmour";
import { melody as entertainerMelody } from "../melodies/entertainer";
import { Melody } from "../types/types";

const melodies = [
    plassairDAmourMelody,entertainerMelody
]
// type MelodyContext = {
//     melody: Melody,
//     melodyNames: string[],
//     setMelody: () => {},
// } 
const melodyNames = melodies.map(({name}) => name);
const MelodyContext = createContext({
    melody: plassairDAmourMelody,
    melodyNames,
    setCurrentMelodyName: ((melodyName: string):void => {})
})

export const useMelody = () => {
    const { melody, melodyNames, setCurrentMelodyName } = useContext(MelodyContext);
    if (!melody) throw new Error('useMelody should be used inside musicProvider')
    return {melody, melodyNames, setCurrentMelodyName}
}

export const MusicProvider = ({children}: {children: React.ReactNode}) => {
    const [currentMelody, setCurrentMelody] = useState(plassairDAmourMelody);
    const [currentMelodyName, setCurrentMelodyName] = useState(plassairDAmourMelody.name);
    useEffect(() => {
        const melodyIndex = melodies.findIndex(({name}) => name === currentMelodyName)
        if (melodyIndex === -1) throw new Error('Melody does not exist');
        setCurrentMelody(melodies[melodyIndex])
    }, [currentMelodyName])
    useEffect(() => {
        console.log(currentMelody)
    }, [currentMelody])
    // const setMelody = (melodyName: string):void => {
    //     const melodyIndex = melodies.findIndex(({name}) => name === melodyName);
    //     if (melodyIndex === -1) throw new Error('Melody does not exist');
    //     setCurrentMelody(melodies[melodyIndex])
    // }
    return (
        <MelodyContext.Provider value={{ melody: currentMelody, melodyNames, setCurrentMelodyName }}>
            {children}
        </MelodyContext.Provider>
    )
}
