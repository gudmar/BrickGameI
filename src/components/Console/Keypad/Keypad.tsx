import React from 'react';
import { KEYDOWN, KEYUP } from '../../../constants/keys';
import { keys } from '../../../hooks/useKeyboard';
import Arrows from './Arrows/Arrows';
import Key from './Key/Key';
import { KeySize } from './Key/KeyInterfaces';
import styles from './styles.module.css';

const onPauseDown = (e: React.MouseEvent<HTMLElement>) => {
  window.dispatchEvent(new KeyboardEvent(KEYDOWN, {key: keys.P}))
};
const onRotateDown = (e: React.MouseEvent<HTMLElement>) => {
  window.dispatchEvent(new KeyboardEvent(KEYDOWN, {key: keys.SPACE}))
};
const onPauseUp = (e: React.MouseEvent<HTMLElement>) => {
  window.dispatchEvent(new KeyboardEvent(KEYUP, {key: keys.P}))
};
const onRotateUp = (e: React.MouseEvent<HTMLElement>) => {
  window.dispatchEvent(new KeyboardEvent(KEYUP, {key: keys.SPACE}))
};


function Keypad() {
    return (
        <div className={styles.container}>
          <div className={styles.pause}>
            <Key activator={keys.P} label="Pause" size={KeySize.small} onMouseDown={onPauseDown} onMouseUp={onPauseUp}/>
          </div>
          <div className={styles.arrows}><Arrows /></div>
          <div className={styles.rotate}>
            <Key activator={keys.SPACE} label="Rotate" size={KeySize.big} onMouseDown={onRotateDown} onMouseUp={onRotateUp}/>
          </div>
        </div>
  );
}

export default Keypad;
