import { useEffect, useMemo, useState } from 'react';
import { useTimer } from './useClock'
import { TestCartridge } from '../cartridges/test'
import { GameState, KeyPress } from '../types/types';
import { getNextFigureOfSymbols, getDojoOfSymbols } from '../cartridges/AbstractGameLogic';
import { LayersApplayer } from '../cartridges/layers/LayersApplayer';
import { Animations } from '../cartridges/Animations/Animations';
import { keys, useKeyboard } from './useKeyboard';
import { MazeMoverDecorator } from '../cartridges/MovingKeys/MazeMover';

export const cartridges = {
    'TEST': "Test display",
    'LAYERS': 'Animate layers',
    'ANIMATIONS': 'Animations',
    'MAZE': 'Maze'
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
    [cartridges.MAZE]: {
        logicHandler: MazeMoverDecorator,
        description: cartridges.MAZE,
        show: true,
    }
}

const findCartridge = (cartridgeDescription: string) => 
    Object.values(cartridgeLibrary).find(
        ({ description }) => description === cartridgeDescription
    );

const initialGameState: GameState = {
    brickMap: getDojoOfSymbols(0),
    nextFigure: getNextFigureOfSymbols(0),
    level: 1,
    speed: 1,
    score: 0,
    isPaused: false,
    isAnimating: false,
    isGameOver: false,
}

export const useCartridge = (cartridgeToUseDescription: string) => {
    const cartridgeInstance = useMemo( 
            () => { 
                const constructor = findCartridge(cartridgeToUseDescription)!.logicHandler
                console.log('Construction ' + cartridgeToUseDescription)
                return (new (constructor)()) 
            }, [cartridgeToUseDescription]
        );
    const [gameState, setGameState] = useState(initialGameState);
    const time = useTimer();

    const handleMoveUp = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Up);
        setGameState(nextState);
        return {};
    }
    const handleMoveDown = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Down);
        setGameState(nextState);
        return {};
    }

    const handleMoveLeft = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Left);
        setGameState(nextState);
        return {};
    }
    const handleMoveRight = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Right);
        setGameState(nextState);
        return {};
    }

    const handleRotate = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Rotate);
        setGameState(nextState);
        return {};
    }
    const handleLevelChange = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Level);
        setGameState(nextState);
        return {};
    }
    const handleSpeedChange = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Speed);
        setGameState(nextState);
        return {};
    }
    const handlePause = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Pause);
        setGameState(nextState);
        return {};
    }

    useKeyboard({ key: keys.UP, callback: handleMoveUp })
    useKeyboard({ key: keys.DOWN, callback: handleMoveDown })
    useKeyboard({ key: keys.LEFT, callback: handleMoveLeft })
    useKeyboard({ key: keys.RIGHT, callback: handleMoveRight })
    useKeyboard({ key: keys.S, callback: handleSpeedChange })
    useKeyboard({ key: keys.L, callback: handleLevelChange })
    useKeyboard({ key: keys.P, callback: handlePause })
    useKeyboard({ key: keys.SPACE, callback: handleRotate })






    useEffect(() => {
        const nextState = cartridgeInstance.getNextStateOnTick(time);
        setGameState(nextState);
    }, [time, cartridgeInstance])

    return gameState;
}
