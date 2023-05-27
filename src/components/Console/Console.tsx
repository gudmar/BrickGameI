import React from 'react';
import BrickStickers from './BrickStickers/BrickStickers';
import Keypad from './Keypad/Keypad';
import styles from './styles.module.css';
import { StickersVariant } from './brickInterfaces'
import Display from './Display/Display';
import { ConsoleArgs, OneToTen } from '../../types/types';
import { useGameState } from '../../context/gameStateContext';
import { useColorSchemeContext } from '../../context/colorShemeProvider';

function Console({ 
  currentGame,
  setIsGameSelectionAllowed,
}: ConsoleArgs) {
  const {speed, level} = useGameState();
  const {getClassNameForCurrentScheme} = useColorSchemeContext();
  const housingClass = getClassNameForCurrentScheme('housing')
    return (
        <div className={styles.table}>
          <div className={`${styles.housing} ${styles[housingClass]} ${styles.housingShadow}`}>
            <div className={styles.topBar}>
              <span className={styles.stickerLabel}> &gt;&gt;&gt; Brick Game &lt;&lt;&lt;</span>
            </div>

            <div className={styles.leftSideBar}>
              <BrickStickers variant={StickersVariant.L} />
            </div>

            <div className={styles.display}>
              <Display 
                speed={speed as OneToTen}
                level={level as OneToTen}
                currentGameDescription={currentGame}
                setIsGameSelectionAllowed = {setIsGameSelectionAllowed}
              />
            </div>
            <div className={styles.rightSideBar}>
              <BrickStickers variant={StickersVariant.R} />
            </div>

            <div className={styles.bottomBar}></div>

            <div className={styles.leftKeypadBar}></div>
            <div className={styles.keypad}>
              <Keypad />
            </div>
            <div className={styles.rightKeypadBar}></div>

            <div className={styles.margin}></div>
            <div className={styles.margin}></div>
            <div className={styles.margin}></div>
          </div>
        </div>
  );
}

export default Console;
