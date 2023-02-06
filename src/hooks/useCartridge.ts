import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTimer } from './useClock'
import { TestCartridge } from '../cartridges/test'
import { GameState } from '../types/types';
import { arrayOfElements, GameLogic, getNextFigureOfSymbols } from '../cartridges/AbstractGameLogic';

export const cartridges = {
    'TEST': "Test display",
}

interface LogicDescriptor {
    logicHandler: any, // GameLogic, !!!!!!!!!!!!!!!!!!!!!!!!!
    description: string,
    show: boolean
}

interface Library {
    [name: string] : LogicDescriptor
}

const cartridgeLibrary: Library = {
    [cartridges.TEST]: {
        logicHandler: TestCartridge,
        description: cartridges.TEST,
        show: true,
    },
}

const findCartridge = (cartridgeDescription: string) => 
    Object.values(cartridgeLibrary).find(
        ({ description }) => description === cartridgeDescription
    );

const initialGameState: GameState = {
    currentFigure: getNextFigureOfSymbols(0),
    level: 0,
    speed: 0,
    score: 0,
    isPaused: false,
    isAnimating: false,
}

export const useCartridge = (cartridgeToUseDescription: string) => {
    const cartridgeInstance = useMemo( 
            () => { 
                const constructor = findCartridge(cartridgeToUseDescription)!.logicHandler
                return (new (constructor)()) 
            }, [cartridgeToUseDescription]
        );
    // const [currentCartridgeInstance, setCurrentCartridgeInstance] = useState(null);
    const [gameState, setGameState] = useState(initialGameState);
    const time = useTimer();

    // useEffect(() => {
    //     const cartridgeInstance = new (findCartridge(cartridgeToUseDescription)?.logicHandler)();
    //     setCurrentCartridgeInstance(cartridgeInstance);
    // //eslint-disable-next-line
    // },[])

    // useEffect(() => {
    //     const cartridgeInstance = new (findCartridge(cartridgeToUseDescription)?.logicHandler)();
    //     setCurrentCartridgeInstance(cartridgeInstance);
    // }, [cartridgeToUseDescription]);

    useEffect(() => {
        // const nextState = currentCartridgeInstance!.getNextStateOnTick(time);
        const nextState = cartridgeInstance.getNextStateOnTick(time);
        setGameState(nextState);
    }, [time, cartridgeInstance])





    return cartridgeLibrary;
}
