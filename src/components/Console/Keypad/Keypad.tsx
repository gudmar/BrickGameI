import React from 'react';
import styles from './styles.module.css';

function Keypad() {
  
    return (
        <div className={styles.container}>
          <div className={styles.pause}></div>
          <div className={styles.arrows}></div>
          <div className={styles.rotate}></div>
        </div>
  );
}

export default Keypad;
