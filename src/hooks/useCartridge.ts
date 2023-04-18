import { useCallback, useEffect, useState } from 'react';
import { useTimer } from './useClock'
import { GameState } from '../types/types';
import { getNextFigureOfSymbols, getDojoOfSymbols } from '../cartridges/AbstractGameLogic';
import { keys, useKeyboard } from './useKeyboard';
import { gameCodes } from '../constants/gameCodes';
import { useGameCodes } from './useGameCodes';
import { KeyPress } from '../types/KeyPress';
import { cartridgeLibrary } from '../constants/cartridgeLibrary';
import { flush } from '../functions/flush';




const getInitialCartridgeInstance = (cartridgeToUseDescription: string) => {
    // const constructor = findInitialCartridge(cartridgeToUseDescription)!.logicHandler
    const constructor = NullishGameCreator;
    return (new (constructor)()) 
}

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

// const findInitialCartridge = (cartridgeDescription: string) => 
//     Object.values(cartridgeLibrary).find(
//         ({ description }) => description === cartridgeDescription
//     );

class NullishGameCreator{
    passCode(matchedCode:string){
        flush(matchedCode);
    }
    getNextStateOnKeyPress(key: KeyPress){
        flush(key);
        return initialGameState;
    }
    getNextStateOnTick(timeEveryTick:number){
        flush(timeEveryTick);
        return initialGameState;
    }
    getNextStateOnSpeedTick(timeSpeed:number){
        flush(timeSpeed);
        return initialGameState;
    }
}

const setCartridgeInstanceAccordingToDescription = (cartridgeDescription: string, cartridgeSetter: (val: any) => void) => {
    const findCartridge = (cartridgeDescription: string) => 
    Object.values(cartridgeLibrary).find(
        ({ description }) => description === cartridgeDescription
    );
    const constructor = findCartridge(cartridgeDescription)!.logicHandler
    const instance = (new (constructor)()) 
    cartridgeSetter(instance)
}


export const useCartridge = (cartridgeToUseDescription: string) => {
    const [initialCartridgeName] = useState(cartridgeToUseDescription);
    const [cartridgeInstance, setCartridgeInstance] = useState(getInitialCartridgeInstance(cartridgeToUseDescription));

    useEffect(() => {
        setCartridgeInstanceAccordingToDescription(cartridgeToUseDescription, setCartridgeInstance)
    }, [cartridgeToUseDescription])


    const resetConsole = () => setCartridgeInstanceAccordingToDescription(initialCartridgeName, setCartridgeInstance)


    const [gameState, setGameState] = useState(initialGameState);
    const timeEveryTick = useTimer();
    const timeSpeed = useTimer(gameState.speed);
    const matchedCode = useGameCodes(gameCodes)

    useEffect(() => {
        cartridgeInstance.passCode(matchedCode);
    }, [matchedCode, cartridgeInstance])


    const handleMoveUp = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Up);
        setGameState(nextState);
    }
    const handleMoveDown = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Down);
        setGameState(nextState);
    }

    const handleMoveLeft = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Left);
        setGameState(nextState);
    }
    const handleMoveRight = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Right);
        setGameState(nextState);
    }

    const handleRotate = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Rotate);
        setGameState(nextState);
    }
    const handleLevelChange = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Level);
        setGameState(nextState);
    }
    const handleSpeedChange = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Speed);
        setGameState(nextState);
    }
    const handlePause = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Pause);
        setGameState(nextState);
    }

    const handleGameStart = () => {
        const nextState = cartridgeInstance.getNextStateOnKeyPress(KeyPress.Start);
        setGameState(nextState);
    }

    const logGameState = () => {
        cartridgeInstance.getNextStateOnKeyPress(KeyPress.Log);
    }



    useKeyboard({ key: keys.UP, callback: handleMoveUp })
    useKeyboard({ key: keys.DOWN, callback: handleMoveDown })
    useKeyboard({ key: keys.LEFT, callback: handleMoveLeft })
    useKeyboard({ key: keys.RIGHT, callback: handleMoveRight })
    useKeyboard({ key: keys.S, callback: handleSpeedChange })
    useKeyboard({ key: keys.L, callback: handleLevelChange })
    useKeyboard({ key: keys.P, callback: handlePause })
    useKeyboard({ key: keys.SPACE, callback: handleRotate })
    useKeyboard({ key: keys.ENTER, callback: handleGameStart })
    useKeyboard({ key: keys.X, callback: resetConsole })
    useKeyboard({ key: keys.F1, callback: logGameState })






    useEffect(() => {
        const nextState = cartridgeInstance.getNextStateOnTick(timeEveryTick);
        setGameState(nextState);
    }, [timeEveryTick, cartridgeInstance, setGameState])

    useEffect(() => {
        const nextState = cartridgeInstance.getNextStateOnSpeedTick(timeSpeed);
        setGameState(nextState);
    }, [timeSpeed, cartridgeInstance, setGameState])


    return gameState;
}
