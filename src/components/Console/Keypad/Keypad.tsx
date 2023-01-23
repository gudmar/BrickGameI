import React from 'react';
import Arrows from './Arrows/Arrows';
import Key from './Key/Key';
import { KeySize } from './Key/KeyInterfaces';
import styles from './styles.module.css';

function Keypad() {
    const onPause = (e: React.MouseEvent<HTMLElement>) => {};
    const onRotate = (e: React.MouseEvent<HTMLElement>) => {};
    return (
        <div className={styles.container}>
          <div className={styles.pause}>
            <Key label="Pause" size={KeySize.small} onClick={onPause}/>
          </div>
          <div className={styles.arrows}><Arrows /></div>
          <div className={styles.rotate}>
            <Key label="Rotate" size={KeySize.big} onClick={onRotate}/>
          </div>
        </div>
  );
}

export default Keypad;
