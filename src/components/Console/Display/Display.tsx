import React from 'react';
import { useCartridge } from '../../../hooks/useCartridge';
import { DisplayProps } from '../brickInterfaces';
import Dojo from './Dojo/Dojo';
import styles from './styles.module.css';

function Display(
   {speed: initialSpeed, level: initialLevel, currentGameDescription}: DisplayProps
) {

  const { 
    brickMap,
    nextFigure,
    level,
    speed,
    score,
    isPaused,
    isAnimating,
   } = useCartridge(currentGameDescription);
  
    return (
        <div className={styles.display}>
          <div className={styles.dojoSection}>
            <Dojo brickMap = {brickMap}/>
          </div>
          <div className={styles.scoreSection}></div>
        </div>
  );
}

export default Display;
