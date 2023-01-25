import React from 'react';
import BrickStickers from './BrickStickers/BrickStickers';
import Keypad from './Keypad/Keypad';
import styles from './styles.module.css';
import { StickersVariant } from './brickInterfaces'

function Console() {
  
    return (
        <div className={styles.table}>
          <div className={`${styles.housing} ${styles.grayTheme}`}>
            <div className={styles.topBar}>
              <span className={styles.stickerLabel}> &gt;&gt;&gt; Brick Game &lt;&lt;&lt;</span>
            </div>

            <div className={styles.leftSideBar}>
              <BrickStickers variant={StickersVariant.L} />
            </div>

            <div className={styles.display}></div>
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
