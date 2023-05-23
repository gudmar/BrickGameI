import React, { createContext, useContext } from 'react';
import { getInitialGameState } from '../constants/initialGameState';
import { useCartridge } from '../hooks/useCartridge';
import { useCartridgeController } from './cartridgeProvider';

const GameStateContext = createContext(getInitialGameState())

export const GameStateProvider = ({children}: {children: React.ReactNode}) => {
    const { currentGame } = useCartridgeController();
    const gameState = useCartridge(currentGame);
    return (
        <GameStateContext.Provider value={gameState}>
            {children}
        </GameStateContext.Provider>
    );
};

export const useGameState = () => {
    const gameState = useContext(GameStateContext);
    if (!gameState) throw new Error('useGameState should be used fron within GameStateProvider')
    return {...gameState};
}
