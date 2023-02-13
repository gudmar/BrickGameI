import { useEffect, useMemo, useState } from 'react';
import { useTimer } from './useClock'
import { TestCartridge } from '../cartridges/test'
import { GameState } from '../types/types';
import { getNextFigureOfSymbols, getDojoOfSymbols } from '../cartridges/AbstractGameLogic';
import { LayersApplayer } from '../cartridges/layers/LayersApplayer';
import { Animations } from '../cartridges/Animations/Animations';

export const cartridges = {
    'TEST': "Test display",
    'LAYERS': 'Animate layers',
    'ANIMATIONS': 'Animations'
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
    [cartridges.LAYERS]: {
        logicHandler: LayersApplayer,
        description: cartridges.LAYERS,
        show: true,
    },
    [cartridges.ANIMATIONS]: {
        logicHandler: Animations,
        description: cartridges.ANIMATIONS,
        show: true,
    },
}

const findCartridge = (cartridgeDescription: string) => 
    Object.values(cartridgeLibrary).find(
        ({ description }) => description === cartridgeDescription
    );

const initialGameState: GameState = {
    brickMap: getDojoOfSymbols(0),
    nextFigure: getNextFigureOfSymbols(0),
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
    const [gameState, setGameState] = useState(initialGameState);
    const time = useTimer();

    useEffect(() => {
        const nextState = cartridgeInstance.getNextStateOnTick(time);
        // if(time < 10) console.log(nextState)
        setGameState(nextState);
    }, [time, cartridgeInstance])

    return gameState;
}
