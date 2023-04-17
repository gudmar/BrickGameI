import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { BrickStickersProps, StickersVariant, BrickMode, Row, WallProps} from '../brickInterfaces';
import Wall from '../Wall/Wall';

const rowsL = [
    {row: [1, 1, 1], brickMode: BrickMode.Sticker},
    {row: [0, 1, 0], brickMode: BrickMode.Sticker},
    {row: [0, 0, 0], brickMode: BrickMode.Sticker},
    {row: [0, 1, 1], brickMode: BrickMode.Sticker},
    {row: [0, 1, 0], brickMode: BrickMode.Sticker},
    {row: [0, 1, 0], brickMode: BrickMode.Sticker},
    {row: [0, 0, 0], brickMode: BrickMode.Sticker},
    {row: [1, 1, 1], brickMode: BrickMode.Sticker},
    {row: [0, 0, 0], brickMode: BrickMode.Sticker},
    {row: [1, 1, 0], brickMode: BrickMode.Sticker},
    {row: [0, 1, 1], brickMode: BrickMode.Sticker}
];

const rowsR: Row[] = [
    {row: [0, 1, 0], brickMode: BrickMode.Sticker},
    {row: [1, 1, 1], brickMode: BrickMode.Sticker},
    {row: [0, 0, 0], brickMode: BrickMode.Sticker},
    {row: [1, 1, 0], brickMode: BrickMode.Sticker},
    {row: [1, 0, 1], brickMode: BrickMode.Sticker},
    {row: [1, 0, 1], brickMode: BrickMode.Sticker},
    {row: [0, 0, 1], brickMode: BrickMode.Sticker},
    {row: [1, 0, 1], brickMode: BrickMode.Sticker},
    {row: [0, 0, 0], brickMode: BrickMode.Sticker},
    {row: [0, 1, 1], brickMode: BrickMode.Sticker},
    {row: [1, 1, 0], brickMode: BrickMode.Sticker}
]

export default function BrickStickers({ variant } : BrickStickersProps) {
    const rows = variant === StickersVariant.L ? rowsL : rowsR;
    return (
        <Wall rows={rows} brickMode={BrickMode.Sticker} />
    )
}
