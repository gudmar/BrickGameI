import React from 'react';
import { BrickInterface, BrickMode } from '../brickInterfaces';
import Brick from '../Display/Brick/Brick';
import styles from './styles.module.css';

interface Row {
    row: number[];
    brickMode: BrickMode;
}

interface WallProps {
    rows: Row[];
    brickMode: BrickMode;
}

const mergeBrickModeWithOnOff = (brickMode: BrickMode, onOff: number) => {
    if (brickMode === BrickMode.GameOff || brickMode === BrickMode.GameOn){
        return onOff === 0 ? BrickMode.GameOff : BrickMode.GameOn;
    }
    return onOff === 0 ? BrickMode.Sticker : BrickMode.NoBrick;
}

function BricksRow({row, brickMode}: Row) {
    return (
        <div className={styles.row}>
            {row.map((brick) => <Brick mode={mergeBrickModeWithOnOff(brickMode, brick)}/>)}
        </div>
    )
}

function Wall({ rows, brickMode }: WallProps) {
  
    return (
        <div className={styles.block}>
            {rows.map((singleRow) => <BricksRow row={singleRow.row} brickMode={brickMode}/>)}
        </div>
    );
}

export default Wall;