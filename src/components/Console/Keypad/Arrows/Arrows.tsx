import React from 'react';
import { KEYDOWN, KEYUP } from '../../../../constants/keys';
import { keys } from '../../../../hooks/useKeyboard';
import Key from '../Key/Key';
import { KeySize } from '../Key/KeyInterfaces';
import styles from './styles.module.css';

// interface ArrowProps {
//     upAction: () => {};
//     leftAction: () => {};
//     rightAction: () => {};
//     downAction: () => {};
// }

const ARROW_SIZE = KeySize.medium;

function Arrows() {
  
    const mouseDownOnLeft = (e: React.MouseEvent<HTMLElement>) => {
        window.dispatchEvent(new KeyboardEvent(KEYDOWN, {key: keys.LEFT}))
    };
    const mouseDownOnRight = (e: React.MouseEvent<HTMLElement>) => {
        window.dispatchEvent(new KeyboardEvent(KEYDOWN, {key: keys.RIGHT}))
    };
    const mouseDownOnDown = (e: React.MouseEvent<HTMLElement>) => {
        window.dispatchEvent(new KeyboardEvent(KEYDOWN, {key: keys.DOWN}))
    };
    const mouseDownOnUp = (e: React.MouseEvent<HTMLElement>) => {
        window.dispatchEvent(new KeyboardEvent(KEYDOWN, {key: keys.UP}))
    };

    const mouseUpOnLeft = (e: React.MouseEvent<HTMLElement>) => {
        window.dispatchEvent(new KeyboardEvent(KEYUP, {key: keys.LEFT}))
    };
    const mouseUpOnRight = (e: React.MouseEvent<HTMLElement>) => {
        window.dispatchEvent(new KeyboardEvent(KEYUP, {key: keys.RIGHT}))
    };
    const mouseUpOnDown = (e: React.MouseEvent<HTMLElement>) => {
        window.dispatchEvent(new KeyboardEvent(KEYUP, {key: keys.DOWN}))
    };
    const mouseUpOnUp = (e: React.MouseEvent<HTMLElement>) => {
        window.dispatchEvent(new KeyboardEvent(KEYUP, {key: keys.UP}))
    };


    return (
        <div className={styles.arrows}>
            <div className={styles.left}>
                <Key activator={keys.LEFT} label="Left" onMouseDown={mouseDownOnLeft} onMouseUp={mouseUpOnLeft} size={ARROW_SIZE}/>
            </div>
            <div className={styles.right}>
                <Key activator={keys.RIGHT} label="Right" onMouseDown={mouseDownOnRight} onMouseUp={mouseUpOnRight} size={ARROW_SIZE}/>
            </div>
            <div className={styles.up}>
                <Key activator={keys.UP} label="Up" onMouseDown={mouseDownOnUp} onMouseUp={mouseUpOnUp} size={ARROW_SIZE}/>
            </div>
            <div className={styles.down}>
                <Key activator={keys.DOWN} label="Down" onMouseDown={mouseDownOnDown} onMouseUp={mouseUpOnDown} size={ARROW_SIZE}/>
            </div>

        </div>
  );
}

export default Arrows;
