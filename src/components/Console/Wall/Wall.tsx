import React from 'react';
import { BrickInterface, BrickMode, Row, WallProps } from '../brickInterfaces';
import Brick from '../Display/Brick/Brick';
import styles from './styles.module.css';


const mergeBrickModeWithOnOff = (brickMode: BrickMode, onOff: number) => {
    if (brickMode === BrickMode.GameOff || brickMode === BrickMode.GameOn){
        return onOff === 0 ? BrickMode.GameOff : BrickMode.GameOn;
    }
    return onOff === 0 ? BrickMode.NoBrick : BrickMode.Sticker;
}

function BricksRow({row, brickMode}: Row) {
    return (
        <div className={styles.row}>
            {row.map((brick, index) => <Brick key = {index} mode={mergeBrickModeWithOnOff(brickMode, brick)}/>)}
        </div>
    )
}

function Wall({ rows, brickMode }: WallProps) {
  
    return (
        <div className={styles.block}>
            {rows.map((singleRow, index) => <BricksRow key={index} row={singleRow.row} brickMode={brickMode}/>)}
        </div>
    );
}

export default Wall;