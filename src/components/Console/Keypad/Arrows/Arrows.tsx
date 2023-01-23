import React from 'react';
import styles from './styles.module.css';

interface ArrowProps {
    up: String;
    upAction: () => {};
    left: String;
    leftAction: () => {};
    right: String;
    rightAction: () => {};
    down: String;
    downAction: () => {};
}

function Arrows({
    up, left, right, down, upAction, leftAction, rightAction, downAction
} : ArrowProps) {
  
    return (
        <div className={styles.arrows}>
            <div className={styles.up}></div>
        </div>
  );
}

export default Arrows;
