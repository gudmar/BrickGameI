import { getBoardMaxIndexes } from "../../functions/getBoardMaxIndexes";
import { getRandom } from "../../functions/getRandom";
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
        snakeInstance.foodCords = {col: foodCol as number, row: foodRow as number};
        visitedObject.pawnLayer[foodRow as number][foodCol as number] = 1;
    }

    static isFoodLocationAllowed(snakeInstance: any,{col: foodCol, row: foodRow}: {col:number|undefined, row:number|undefined}, visitedObject: GameCreator){
        if (foodCol === undefined || foodRow === undefined) return false;
        const isOnTail = snakeInstance.tailHandler.tailCords.find(
            ({col, row}: {col:number, row:number}) => {
                console.log('Seatching for in tail', col, row, foodCol, foodRow, col===foodCol, row===foodRow, col === foodCol && row === foodRow)
                return col === foodCol && row === foodRow
            }
        );
        const {row: headRow, col: headCol} = visitedObject.pawnCords;
        const isOnHead = headRow === foodRow || headCol === foodCol
        console.table([
            ['onHead', isOnHead],
            ['onTail', isOnTail],
            ['returns', !(isOnTail || isOnHead)]
        ]);
        console.log(snakeInstance.tail, foodCol, foodRow)
        return !(isOnTail || isOnHead);
    }

    static isDevouring(snakeInstance:any, visitedObject: GameCreator, deltaRow: number, deltaCol: number) {
        if (!snakeInstance.foodCords) return;
        const {row, col} = visitedObject.pawnCords;
        const {row: foodRow, col: foodCol} = snakeInstance.foodCords as PawnCords;
        return row === foodRow && col === foodCol
    }
}

