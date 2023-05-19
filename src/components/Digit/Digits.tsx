import { DigitDisplayType } from '../../types/types';
import { Digit } from './Digit';
import styles from './styles.module.css';

const throwIfNotEnoughDigits = (nrToDisplay:number, nrOfDigits: number) => {
    if (nrToString(nrToDisplay).length > nrOfDigits) {throw new Error(`Cannot display ${nrToDisplay} on ${nrOfDigits} segment display`)}
}

const nrToString = (nr:number) => `${nr}`;

const getListOfElementsToDisplay = (nrToDisplay:number, nrOfDigits:number):DigitDisplayType[] => {
    const listOfDigits = nrToString(nrToDisplay).split('');
    const listWithPredecators = addEmptyPredecators(nrOfDigits, listOfDigits);
    const convertedList = convertToDigitDisplayType(listWithPredecators);
    return convertedList;
}

const addEmptyPredecators = (nrOfDigits:number, listOfDigits: string[]) => {
    const delta = nrOfDigits - listOfDigits.length;
    for (let i = 0; i < delta; i++) {
        listOfDigits.unshift('');
    }
    return listOfDigits;
}

const convertToDigitDisplayType = (listOfDigits: string[]) => {
    const typeConvertedList:DigitDisplayType[] = listOfDigits.map(_ => _ as DigitDisplayType);
    return typeConvertedList;
}

export const getDigits = (nrOfDigits: number) => ({nrToDisplay}: {nrToDisplay: number}) => {
    throwIfNotEnoughDigits(nrToDisplay, nrOfDigits);
    const listOfDigits = getListOfElementsToDisplay(nrToDisplay, nrOfDigits);
    return (
        <div className={styles.digitDisplay}>
            {
                listOfDigits.map((digit: DigitDisplayType, index: number) => (<Digit key={index} digit={digit}/>))
            }
        </div>
    )
}