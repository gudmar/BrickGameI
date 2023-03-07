import { useState } from "react";
import { digitDisplaySymbols, DigitDisplayType } from "../../types/types";
import styles from './styles.module.css';

const names = {
    TOP: 'top',
    TOP_LEFT: 'top left',
    TOP_RIGHT: 'top right',
    MIDDLE: 'middle',
    DOWN_LEFT: 'down left',
    DOWN_RIGHT: 'down right',
    DOWN: 'down',
}

const isOnFunction = (name: string, digit: DigitDisplayType) => {
    const segmentsToTurnOn = getSegments(digit);
    return segmentsToTurnOn.includes(name);
}

const getSegments = (digit:DigitDisplayType) => {
    switch(digit) {
        case '' : return getSegmentsForNothing();
        case '-': return getSegmentsForMinus();
        case '0': return getSegmentsFor0();
        case '1': return getSegmentsFor1();
        case '2': return getSegmentsFor2();
        case '3': return getSegmentsFor3();
        case '4': return getSegmentsFor4();
        case '5': return getSegmentsFor5();
        case '6': return getSegmentsFor6();
        case '7': return getSegmentsFor7();
        case '8': return getSegmentsFor8();
        case '9': return getSegmentsFor9();
    }
}
const getSegmentsForNothing = () => ([]);
const getSegmentsForMinus = () => ([names.MIDDLE]);
const getSegmentsFor0 = () => ([names.TOP, names.TOP_LEFT, names.TOP_RIGHT, names.DOWN, names.DOWN_LEFT, names.DOWN_RIGHT]);
const getSegmentsFor1 = () => ([names.TOP_RIGHT, names.DOWN_RIGHT]);
const getSegmentsFor2 = () => ([names.TOP, names.TOP_RIGHT, names.MIDDLE, names.DOWN_LEFT, names.DOWN]);
const getSegmentsFor3 = () => ([names.TOP_RIGHT, names.DOWN_RIGHT, names.TOP, names.MIDDLE, names.DOWN]);
const getSegmentsFor4 = () => ([names.TOP_RIGHT, names.DOWN_RIGHT, names.MIDDLE, names.TOP_LEFT]);
const getSegmentsFor5 = () => ([names.TOP, names.TOP_LEFT, names.MIDDLE, names.DOWN_RIGHT, names.DOWN]);
const getSegmentsFor6 = () => ([names.TOP, names.TOP_LEFT, names.MIDDLE, names.DOWN_LEFT, names.DOWN, names.DOWN_RIGHT]);
const getSegmentsFor7 = () => ([names.TOP, names.TOP_RIGHT, names.DOWN_RIGHT]);
const getSegmentsFor8 = () => ([names.TOP, names.TOP_LEFT, names.TOP_RIGHT, names.DOWN, names.DOWN_LEFT, names.DOWN_RIGHT, names.MIDDLE]);
const getSegmentsFor9 = () => ([names.TOP, names.TOP_LEFT, names.TOP_RIGHT, names.DOWN, names.DOWN_RIGHT, names.MIDDLE]);

const getGridClassName = (name:string) => {
    switch(name){
        case names.TOP: return 'topBar';
        case names.TOP_LEFT: return 'leftTopBar';
        case names.TOP_RIGHT: return 'rightTopBar';
        case names.MIDDLE: return 'middleBar';
        case names.DOWN_LEFT: return 'downLeftBar';
        case names.DOWN_RIGHT: return 'downRightBar';
        default: return 'downBar';
    }
}

const Segment = ({name, digit} : {digit: DigitDisplayType, name: string}) => {
    const [isOn,] = useState(isOnFunction(name, digit))
    return (
        <div className={`${styles.segment} ${styles[getGridClassName(name)]} ${ isOn ? styles.on : styles.off }`}></div>
    )
}

const throwIfNotSupported = (digit: DigitDisplayType) => {
    if (!digitDisplaySymbols.includes(digit)) {
        throw new Error(`Symbol ${digit} not supported by a Digit component`)
    }
}

export const Digit = ({digit}: {digit: DigitDisplayType}) => {
    throwIfNotSupported(digit);
    return (
        <div className={styles.digitContainer}>
            <div className={styles.block}>
                <Segment name={names.TOP} digit = {digit} />
                <Segment name={names.TOP_LEFT} digit = {digit} />
                <Segment name={names.TOP_RIGHT} digit = {digit} />
                <Segment name={names.MIDDLE} digit = {digit} />
                <Segment name={names.DOWN_LEFT} digit = {digit} />
                <Segment name={names.DOWN_RIGHT} digit = {digit} />
                <Segment name={names.DOWN} digit = {digit} />
            </div>
        </div>
    )
}
