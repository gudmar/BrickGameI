import { getDojoOfSymbols, getNextFigureOfSymbols } from "../cartridges/AbstractGameLogic";

export const getInitialGameState = () => ({
    brickMap: getDojoOfSymbols(0),
    nextFigure: getNextFigureOfSymbols(0),
    level: 1,
    speed: 1,
    score: 0,
    isPaused: false,
    isAnimating: false,
    isGameOver: false,
    isGameWon: false,
    isGameStarted: false,
    isGameSelectionAllowed: false,
    isCheater: false,
});
