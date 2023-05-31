import React, { createContext, useContext, useEffect, useState } from 'react';

enum ColorScheme {
    Graphite = 'Graphite',
    Red = 'Polish flag',
    Dark = "Dark scheme"
}
const DARK = ColorScheme.Dark as string;
const RED = ColorScheme.Red as string;
const GRAPHITE = ColorScheme.Graphite as string

export const COLOR_SCHEMES = [GRAPHITE, DARK, RED];

const initialColorScheme = {
    currentColorScheme: GRAPHITE,
    setCurrentColorScheme: (val: string) => {},
    getClassNameForCurrentScheme: (postfix: string):string => {return GRAPHITE}
}

export const getCurrentColorSchemeClassPrefix = (currentScheme: string) => {
    const schemeWithWhiteSpacesRemoved = currentScheme.replace(/\s/,'');
    return schemeWithWhiteSpacesRemoved
}



const ColorSchemeContext = createContext(initialColorScheme)


export const ColorSchemeProvider = ({children}: {children: React.ReactNode}) => {
    const [currentColorScheme, setCurrentColorScheme] = useState(GRAPHITE);
    const getClassNameForCurrentScheme = (postfix: string) => {
        const currentSchemePrefix = getCurrentColorSchemeClassPrefix(currentColorScheme);
        return `${currentSchemePrefix}-${postfix}`
    }
    
    return (
        <ColorSchemeContext.Provider value={{currentColorScheme, setCurrentColorScheme, getClassNameForCurrentScheme}}>
            {children}
        </ColorSchemeContext.Provider>
    );
};

export const useColorSchemeContext = () => {
    const gameState = useContext(ColorSchemeContext);
    if (!gameState) throw new Error('useColorScheme should be used fron within GameStateProvider')
    return {...gameState};
}
