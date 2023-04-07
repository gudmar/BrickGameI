import { getBoardMaxIndexes } from "../../functions/getBoardMaxIndexes";
import { getRandom } from "../../functions/getRandom";
import { BrickMap } from "../../types/types";
import { GameCreator, PawnCords } from "../GameCreator";

export class FoodLocalisator{
    static randomlyPlaceFood(snakeInstance:any, visitedObject: GameCreator) {
        let foodRow;
        let foodCol;
        const { maxWidthIndex, maxHeightIndex } = getBoardMaxIndexes(visitedObject)
        while (!FoodLocalisator.isFoodLocationAllowed(snakeInstance, {row:foodRow, col:foodCol}, visitedObject)){
            foodRow = getRandom(0, maxHeightIndex);
            foodCol = getRandom(0, maxWidthIndex);
        }
        console.table([
            ['food', `${foodRow} ${foodCol}`],
            ['tail', JSON.stringify(snakeInstance.tailHandler.tail)]
        ])
        snakeInstance.foodCords = {col: foodCol as number, row: foodRow as number};
        visitedObject.pawnLayer[foodRow as number][foodCol as number] = 1;
    }

    static isFoodLocationAllowed(snakeInstance: any,{col: foodCol, row: foodRow}: {col:number|undefined, row:number|undefined}, visitedObject: GameCreator){
        if (foodCol === undefined || foodRow === undefined) return false;
        const isOnTail = snakeInstance.tailHandler.tailCords.find(
            ({col, row}: {col:number, row:number}) => {
                return col === foodCol && row === foodRow
            }
        );
        const {row: headRow, col: headCol} = visitedObject.pawnCords;
        const isOnHead = headRow === foodRow && headCol === foodCol;
        const isColisionWithBackground = this.isRandomFoodCollisionWithBackground(visitedObject,{col: foodCol, row: foodRow});
        console.table([
            ['row col', `${foodRow}  ${foodCol}`],
            ['isOnTail', isOnTail],
            ['isOnHead', isOnHead],
            ['HeadCords', visitedObject.pawnCords],
            ['tailCords', snakeInstance.tailHandler.tailCords],
            ['isColisionWithBackground', isColisionWithBackground],
            ['result', !(isOnTail || isOnHead || isColisionWithBackground)]
        ])
        return !(isOnTail || isOnHead || isColisionWithBackground);
    }

    static isDevouring(snakeInstance:any, visitedObject: GameCreator, deltaRow: number, deltaCol: number) {
        if (!snakeInstance.foodCords) return;
        const {row, col} = visitedObject.pawnCords;
        const {row: foodRow, col: foodCol} = snakeInstance.foodCords as PawnCords;
        const result = row === foodRow && col === foodCol
        // if (result) snakeInstance.food = undefined;
        return result
    }
    static isRandomFoodCollisionWithBackground(visitedObject:GameCreator, cords:PawnCords){
        const {col, row} = cords;
        const {background} = visitedObject;
        const cordsFromBackground = this.getCordsFromBackground(background);
        const isColision = !!cordsFromBackground.find(({col: bgCol, row: bgRow}) => col === bgCol && row === bgRow);
        return isColision;
    }
    static getCordsFromRow(row: number[], rowIndex: number) {
        const result = row.reduce(
            (acc: PawnCords[], brick:number, index:number) => {
                if (brick > 0) acc.push({col: index, row: rowIndex});
                return acc;
            }, [])
        return result;
    }

    static getCordsFromBackground(background: BrickMap){
        const result = background.reduce(
            (cords: PawnCords[], row: number[], rowIndex:number) => {
                const cordsFromRow = FoodLocalisator.getCordsFromRow(row, rowIndex)
                cords = [ ...cords, ...cordsFromRow]
                return cords;
            }, []
        )
        return result;
    }
}

