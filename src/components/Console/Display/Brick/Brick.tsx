import React from 'react';
import { BrickInterface, BrickMode } from '../../brickInterfaces';
import styles from './styles.module.css';


function Brick({mode}: BrickInterface) {
  const getBorder = () => {
    if (mode === BrickMode.GameOn) return styles.borderGameOn;
    if (mode === BrickMode.GameOff) return styles.borderGameOff;
    if (mode === BrickMode.NoBrick) return styles.borderNoBrick;
    return styles.borderSticker;
  }
  const getInside = () => {
    if (mode === BrickMode.GameOn) return styles.insideGameOn;
    if (mode === BrickMode.GameOff) return styles.insideGameOff;
    if (mode === BrickMode.NoBrick) return styles.insideNoBrick;
    return styles.insideSticker;
  }
    return (
      // <div className={styles.border}>
        <div className={`${getBorder()} ${styles.border}`}>
          <div className={getInside()}></div>
        </div>
      // </div>
  );
}

export default Brick;
