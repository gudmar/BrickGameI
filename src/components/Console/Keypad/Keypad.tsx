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
const onGameStartDown = (e: React.MouseEvent<HTMLElement>) => {
  window.dispatchEvent(new KeyboardEvent(KEYDOWN, {key: keys.ENTER}))
};
const onResetDown = (e: React.MouseEvent<HTMLElement>) => {
  window.dispatchEvent(new KeyboardEvent(KEYDOWN, {key: keys.X}))
};
const onPauseUp = (e: React.MouseEvent<HTMLElement>) => {
  window.dispatchEvent(new KeyboardEvent(KEYUP, {key: keys.P}))
};
const onRotateUp = (e: React.MouseEvent<HTMLElement>) => {
  window.dispatchEvent(new KeyboardEvent(KEYUP, {key: keys.SPACE}))
};
const onGameStartUp = (e: React.MouseEvent<HTMLElement>) => {
  window.dispatchEvent(new KeyboardEvent(KEYUP, {key: keys.ENTER}))
};
const onResetUp = (e: React.MouseEvent<HTMLElement>) => {
  window.dispatchEvent(new KeyboardEvent(KEYUP, {key: keys.X}))
};
const onSoundDown = (e: React.MouseEvent<HTMLElement>) => {
  window.dispatchEvent(new KeyboardEvent(KEYDOWN, {key: keys.V}))
}
const onSoundUp = (e: React.MouseEvent<HTMLElement>) => {
  window.dispatchEvent(new KeyboardEvent(KEYUP, {key: keys.V}))
}


function Keypad() {
    return (
        <div className={styles.container}>
          <div className={styles.controls}>
            <Key activator={keys.ENTER} label="Start" size={KeySize.small} onMouseDown={onGameStartDown} onMouseUp={onGameStartUp}/>
            <Key activator={keys.P} label="Pause" size={KeySize.small} onMouseDown={onPauseDown} onMouseUp={onPauseUp}/>
            <Key activator={keys.X} label="Reset" size={KeySize.small} onMouseDown={onResetDown} onMouseUp={onResetUp}/>
            <Key activator={keys.V} label="Sound" size={KeySize.small} onMouseDown={onSoundDown} onMouseUp={onSoundUp}/>
          </div>
          <div className={styles.arrows}><Arrows /></div>
          <div className={styles.rotate}>
            <Key activator={keys.SPACE} label="Rotate" size={KeySize.big} onMouseDown={onRotateDown} onMouseUp={onRotateUp}/>
          </div>
        </div>
  );
}

export default Keypad;
