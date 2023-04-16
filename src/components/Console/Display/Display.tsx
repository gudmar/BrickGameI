import React, { useEffect } from 'react';
import { useCartridge } from '../../../hooks/useCartridge';
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
   } = useCartridge(currentGameDescription);

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
              level={level}
              score={score}
              speed={speed}
              isGameOver={isGameOver}
              isGameWon={isGameWon}
              isPaused={isPaused}
              nextFigure={nextFigure}
              isAnimating={isAnimating}
              isGameStarted={isGameStarted}
              isCheater={isCheater}
            />
          </div>
        </div>
  );
}

export default Display;
