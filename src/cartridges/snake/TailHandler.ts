import { GameCreator, PawnCords } from "../GameCreator";
import { FoodLocalisator } from "./FoodLocalisator";
import { gameEvents } from "./Judge";

export class TailHandler {
    public tail: PawnCords[] = this.getInitialTail();

    getInitialTail() {
        return [
            {col: 2, row: 5},
            {col: 3, row: 5},
            {col: 4, row: 5},
        ]
    }

    get tailCords() {
        return this.tail;
    }

    cheatCutTail(snakeInstance: any, visitedObject: GameCreator) {
        this.tail.splice(0, this.tail.length - 3);
        snakeInstance.setPawnLayer(visitedObject)
    }

    resetTailToDefaultPosition(){
        this.tail = this.getInitialTail();
    }

    addTailToPawnLayer(visitedObject: GameCreator) {
        const { pawnLayer } = visitedObject;
        let rowMem, colMem;
        try {
            this.tail.forEach(({ col, row }) => {
                rowMem = row;
                colMem = col;
                pawnLayer[row][col] = 1;
            })    
        } catch(e) {
            throw new Error (`Cannot access row: ${rowMem}, col: ${colMem}`)
        }
    }

    recalculateTail(visitedObject: GameCreator, oldPawnCords: PawnCords) {
        if (this.tail.length === 0) return;
        this.tail.push(oldPawnCords);
        const { col: oldCol, row: oldRow } = this.tail.shift()!;
        visitedObject.pawnLayer[oldRow][oldCol] = 0;
    }

    moveTail(visitedObject: GameCreator, oldPawnCords: PawnCords) {
        this.recalculateTail(visitedObject, oldPawnCords);
        this.addTailToPawnLayer(visitedObject);
    }

    growTail(visitedObject: GameCreator, oldPawnCords:PawnCords) {
        this.tail.push(oldPawnCords);
        this.addTailToPawnLayer(visitedObject);
    }

    handleTail(snakeInstance: any, visitedObject: GameCreator, oldPawnCords: PawnCords) {        
        if (FoodLocalisator.isDevouring(snakeInstance, visitedObject)) {
            visitedObject.judge.inform(visitedObject, gameEvents.COLLECT_BRICK);
            this.growTail(visitedObject, oldPawnCords);
            if (this.tail.length > snakeInstance.MAX_TAIL_LENGTH) {
                snakeInstance.levelFinished(visitedObject);
                return;
            }
            FoodLocalisator.randomlyPlaceFood(snakeInstance, visitedObject);
        } else {
            this.moveTail(visitedObject, oldPawnCords)
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
        if (!this.tail.length) return false;
        const {row: pawnRow, col: pawnCol} = visitedObject.pawnCords;
        const plannedRow = pawnRow + deltaRow;
        const plannedCol = pawnCol + deltaCol;
        const crashPoint = this.tail.find(({col, row}, index) => {
            if (index === this.tail.length - 1) return false;
            return col === plannedCol && row === plannedRow
        })
        const isCrashToEndOfTheTail = this.arePointsEqual(this.tail[0], {row: plannedRow, col: plannedCol});
        if (isCrashToEndOfTheTail) return false;
        return !!crashPoint
    }

    arePointsEqual(pointA: PawnCords, pointB: PawnCords) {
        return pointA.row === pointB.row && pointA.col === pointB.col
    }

    get lastTailBrickCords() {return this.tail[this.tail.length - 1]}

}