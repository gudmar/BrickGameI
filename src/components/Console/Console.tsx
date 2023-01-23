import React from 'react';
import Keypad from './Keypad/Keypad';
import styles from './styles.module.css';

function Console() {
  
    return (
        <div className={styles.table}>
          <div className={`${styles.housing} ${styles.grayTheme}`}>
            <div className={styles.topBar}></div>
            <div className={styles.topBar}></div>
            <div className={styles.topBar}></div>

            <div className={styles.leftSideBar}></div>
            <div className={styles.display}></div>
            <div className={styles.rightSideBar}></div>

            <div className={styles.bottomBar}></div>
            <div className={styles.bottomBar}></div>
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
