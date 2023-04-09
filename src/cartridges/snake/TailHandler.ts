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

    // recalculateTailOnBump(visitedObject:GameCreator, deltaRow: number, deltaCol: number) {
    //     const { col, row } = visitedObject.pawnCords;
    //     this.tail.push({ col: col - deltaCol, row: row - deltaRow });
    //     const { col: oldCol, row: oldRow } = this.tail.shift()!;
    //     visitedObject.pawnLayer[oldRow][oldCol] = 0;
    // }

    // recalculateTail(visitedObject: GameCreator, deltaRow: number, deltaCol: number) {
    //     const isBump = this.isBump(visitedObject);
    //     if (isBump)  this.recalculateTailOnBump(visitedObject, deltaRow, deltaCol)
    //     if (!isBump) this.recalculateTailNoBump(visitedObject, deltaRow, deltaCol)
    // }

    getNewLastTailBitCords(visitedObject: GameCreator, deltaRow: number, deltaCol: number) {
        const { row: headRow, col: headCol } = visitedObject.pawnCords;
        const { row: lastTailRow, col: lastTailCol} = this.tail[this.tail.length - 1];
        const maxCol = visitedObject.background[0].length - 1;
        const maxRow = visitedObject.background.length - 1;
        
        if (headRow < 1 && lastTailRow >= maxRow - 1) return {col:lastTailCol, row: maxRow};
        // console.log('A')
        // if (headRow === maxRow && lastTailRow === 1) return {col:lastTailCol, row: 0};
        if (headRow === maxRow && lastTailRow === 1) return {col:headCol, row: 0};
        // console.log('B')
        // if (headCol < 1 && lastTailCol >= maxCol - 1) return {col: maxCol, row: lastTailRow};
        if (headCol < 1 && lastTailCol >= maxCol - 1) return {col: maxCol, row: headRow};
        // console.log('C')
        if (headCol === maxCol && lastTailCol <= 1) return {col: 0, row: headRow}
        // console.log('D')
        // console.log(headRow, headCol, lastTailRow, lastTailCol)
        return { col: headCol - deltaCol, row: headRow - deltaRow }
    
    }

    recalculateTail(visitedObject: GameCreator, deltaRow: number, deltaCol: number) {
        if (this.tail.length === 0) return;
        const {col: newCol, row: newRow} = this.getNewLastTailBitCords(visitedObject, deltaRow, deltaCol)
        this.tail.push({col:newCol, row: newRow});
        const { col: oldCol, row: oldRow } = this.tail.shift()!;
        visitedObject.pawnLayer[oldRow][oldCol] = 0;
    }

    recalculateTail1(visitedObject: GameCreator, deltaRow: number, deltaCol: number) {
        const { col, row } = visitedObject.pawnCords;
        const {col: newCol, row: newRow} = this.getNewLastTailBitCords(visitedObject, deltaRow, deltaCol)
        console.log('COL',newCol)
        console.log('ROW',newRow)
        // this.tail.push({ col: col - deltaCol, row: row - deltaRow });
        this.tail.push({col:newCol, row: newRow});
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
        if (FoodLocalisator.isDevouring(snakeInstance, visitedObject)) {
            visitedObject.judge.inform(visitedObject, gameEvents.COLLECT_BRICK);
            this.growTail(visitedObject, deltaRow, deltaCol);
            if (this.tail.length > snakeInstance.MAX_TAIL_LENGTH) {
                snakeInstance.levelFinished(visitedObject);
                return;
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