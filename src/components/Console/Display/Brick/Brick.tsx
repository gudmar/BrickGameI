import React from 'react';
import { useColorSchemeContext } from '../../../../context/colorShemeProvider';
import { BrickInterface, BrickMode } from '../../brickInterfaces';
import styles from './styles.module.css';


function Brick({mode}: BrickInterface) {
  const {getClassNameForCurrentScheme} = useColorSchemeContext();
  const brickStickerColor = getClassNameForCurrentScheme('borderSticker');
  const brickStickerInsideColor = getClassNameForCurrentScheme('insideSticker');
  const getBorder = () => {
    if (mode === BrickMode.GameOn) return styles.borderGameOn;
    if (mode === BrickMode.GameOff) return styles.borderGameOff;
    if (mode === BrickMode.NoBrick) return styles.borderNoBrick;
    return `${styles.borderSticker} ${styles[brickStickerColor]}`;
  }
  const getInside = () => {
    if (mode === BrickMode.GameOn) return styles.insideGameOn;
    if (mode === BrickMode.GameOff) return styles.insideGameOff;
    if (mode === BrickMode.NoBrick) return styles.insideNoBrick;
    return `${styles.insideSticker} ${styles[brickStickerInsideColor]}`;
  }
    return (
        <div className={`${getBorder()} ${styles.border}`}>
          <div className={getInside()}></div>
        </div>
  );
}

export default Brick;
