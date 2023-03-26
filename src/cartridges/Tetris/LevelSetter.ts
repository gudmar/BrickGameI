import { getEmptyBoard } from "../constants";

export class LevelSetter {
    static setLevel(visitedObject:any) {
        const LEVEL_OFFSET = 1;
        const level = visitedObject.level - LEVEL_OFFSET;
        console.log('in LevelSetter', level)
        if (level <= 0) {
            visitedObject.background = getEmptyBoard();
            return;
        }
        const { background } = visitedObject;
        const lastIndex = background.length -1 ;
        const nrOfNonZeroRowsOnBg = LevelSetter.getNonZeroRowsFromBg(visitedObject);
        for(let i = lastIndex - nrOfNonZeroRowsOnBg; i > lastIndex - level; i--) {
            background[i] = LevelSetter.getRandomBoardRow(background[0].length);
        }
    }

    static getNonZeroRowsFromBg(visitedObject:any) {
        const { background } = visitedObject;
        const lastIndex = background.length - 1;
        const firstNonZero = background.findIndex((row:number[]) => {
            return row.some((brick:number) => brick === 1);
        });
        return firstNonZero === -1 ? 0 : lastIndex - firstNonZero;
    }

    static getRandomBoardRow(size:number) {        
        const row = new Array(size).fill((() => 1)());
        const indexes = new Array(size).fill(null).map((_, index) => index);
        LevelSetter.applyGaps(row, indexes);
        return row;
    }

    static takeRandomIndex(indexes: number[]){
        const { length } = indexes;
        const randIndex = Math.floor(Math.random() * length);
        const result = indexes[randIndex];
        indexes.splice(randIndex, 1);
        return result;
    }
    static applyGaps(row: number[], indexes: number[]){
        const nrOfGaps = 2;
        for(let gap = 0; gap < nrOfGaps; gap++) {
            const index = LevelSetter.takeRandomIndex(indexes);
            row[index] = 0;
        }
    }
}
