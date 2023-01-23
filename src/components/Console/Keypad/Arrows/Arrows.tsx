import React from 'react';
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
  
    const leftPressed = (e: React.MouseEvent<HTMLElement>) => {};
    const rightPressed = (e: React.MouseEvent<HTMLElement>) => {};
    const downPressed = (e: React.MouseEvent<HTMLElement>) => {};
    const upPressed = (e: React.MouseEvent<HTMLElement>) => {};

    return (
        <div className={styles.arrows}>
            <div className={styles.left}>
                <Key label="Left" onClick={leftPressed} size={ARROW_SIZE}/>
            </div>
            <div className={styles.right}>
                <Key label="Right" onClick={rightPressed} size={ARROW_SIZE}/>
            </div>
            <div className={styles.up}>
                <Key label="Up" onClick={upPressed} size={ARROW_SIZE}/>
            </div>
            <div className={styles.down}>
                <Key label="Down" onClick={downPressed} size={ARROW_SIZE}/>
            </div>

        </div>
  );
}

export default Arrows;
