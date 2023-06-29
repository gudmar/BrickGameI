import React, { useEffect } from 'react';
import { useGameState } from '../../../context/gameStateContext';
import { useMelody } from '../../../context/musicProvider';
import { OneToTen } from '../../../types/types';
import { DisplayProps } from '../brickInterfaces';
import Dojo from './Dojo/Dojo';
import ScoreBar from './ScoreBar/__test__/ScoreBar';
import styles from './styles.module.css';

function Display(
   {
    speed: initialSpeed,
    level: initialLevel,
    currentGameDescription,
    setIsGameSelectionAllowed,
  }: DisplayProps
) {

  const { 
    brickMap,
    nextFigure,
    level,
    speed,
    score,
    isPaused,
    isAnimating,
    isGameOver,
    isGameWon,
    isGameStarted,
    isGameSelectionAllowed,
    isCheater,
  } = useGameState();
  const { isPlaying } = useMelody();
   useEffect(() => {
      setIsGameSelectionAllowed(isGameSelectionAllowed || false);
   }, [setIsGameSelectionAllowed, isGameSelectionAllowed])

    return (
        <div className={styles.display}>
          <div className={styles.dojoSection}>
            <Dojo brickMap = {brickMap}/>
          </div>
          <div className={styles.scoreSection}>
            <ScoreBar
              level={level as OneToTen}
              score={score}
              speed={speed as OneToTen}
              isGameOver={isGameOver}
              isGameWon={isGameWon}
              isPaused={isPaused}
              nextFigure={nextFigure}
              isAnimating={isAnimating}
              isGameStarted={isGameStarted}
              isCheater={isCheater}
              isPlaying = {isPlaying}
            />
          </div>
        </div>
  );
}

export default Display;
