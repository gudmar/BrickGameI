import { GameCreator, PawnCords } from "../GameCreator";
import { FoodLocalisator } from "./FoodLocalisator";
import { gameEvents } from "./Judge";

export class TailHandler {
    public tail: PawnCords[] = this.getInitialTail();

    getInitialTail() {
        return [
            {col: 1, row: 5},
            {col: 2, row: 5},
            {col: 3, row: 5},
            {col: 4, row: 5},
        ]
    }

    get tailCords() {
        return this.tail;
    }

    resetTailToDefaultPosition(){
        this.tail = this.getInitialTail();
    }

    addTailToPawnLayer(visitedObject: GameCreator) {
        const { pawnLayer } = visitedObject;
        this.tail.forEach(({ col, row }) => {
            pawnLayer[row][col] = 1;
        })
    }

    recalculateTail(visitedObject: GameCreator, deltaRow: number, deltaCol: number) {
        const { col, row } = visitedObject.pawnCords;
        this.tail.push({ col: col - deltaCol, row: row - deltaRow });
        const { col: oldCol, row: oldRow } = this.tail.shift()!;
        visitedObject.pawnLayer[oldRow][oldCol] = 0;
    }

    addToTail(visitedObject: GameCreator, deltaRow: number, deltaCol: number) {
        const { col, row } = visitedObject.pawnCords;
        this.tail.push({ col: col - deltaCol, row: row - deltaRow });
    }

    moveTail(visitedObject: GameCreator, deltaRow: number, deltaCol: number) {
        this.recalculateTail(visitedObject, deltaRow, deltaCol);
        this.addTailToPawnLayer(visitedObject);
    }

    growTail(visitedObject: GameCreator, deltaRow: number, deltaCol: number) {
        this.addToTail(visitedObject, deltaRow, deltaCol);
        this.addTailToPawnLayer(visitedObject);
    }

    handleTail(snakeInstance: any, visitedObject: GameCreator, deltaRow: number, deltaCol: number) {
        if (FoodLocalisator.isDevouring(snakeInstance, visitedObject, deltaRow, deltaCol)) {
            visitedObject.judge.inform(visitedObject, gameEvents.COLLECT_BRICK);
            this.growTail(visitedObject, deltaRow, deltaCol);
            if (this.tail.length > snakeInstance.MAX_TAIL_LENGTH) {
                snakeInstance.levelFinished(visitedObject);
            }
            FoodLocalisator.randomlyPlaceFood(snakeInstance, visitedObject);
        } else {
            this.moveTail(visitedObject, deltaRow, deltaCol)
        }
    }

    invertDirection(visitedObject: GameCreator){
        const newHeadCords = this.tail.shift();
        const {row, col} = visitedObject.pawnCords;
        this.tail.push({row, col});
        visitedObject.pawnCords = newHeadCords!;
        this.tail.reverse();
        this.addTailToPawnLayer(visitedObject);
    }

    moveInterferesWithTail(visitedObject: GameCreator, deltaRow:number, deltaCol:number) {
        const {row, col} = this.lastTailBrickCords;
        const {row: pawnRow, col: pawnCol} = visitedObject.pawnCords;
        const plannedRow = pawnRow + deltaRow;
        const plannedCol = pawnCol + deltaCol;
        return plannedCol === col && plannedRow === row;
    }

    doesMoveCrashIntoTail(visitedObject:GameCreator ,deltaRow:number, deltaCol:number){
        const {row: pawnRow, col: pawnCol} = visitedObject.pawnCords;
        const plannedRow = pawnRow + deltaRow;
        const plannedCol = pawnCol + deltaCol;
        const crashPoint = this.tail.find(({col, row}, index) => {
            if (index === this.tail.length - 1) return false;
            return col === plannedCol && row === plannedRow
        })
        return !!crashPoint
    }

    get lastTailBrickCords() {return this.tail[this.tail.length - 1]}

}