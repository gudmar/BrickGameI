import { KeyPress } from "../types/KeyPress";
import { PawnCords } from "./GameCreator";

export abstract class NextStateCalculator {
    initiate(visitedObject:any){
        visitedObject.name = 'Overwrite name';
        visitedObject.pawnCords  = { col: 0, row: 0 }
        visitedObject.isCheater = false;
        throw new Error('NextStateCalculator: initialte should be overwritten')
    }

    setVisitorToNextStateOnTick(visitedObject:any, time: number){
        throw new Error('NextStateCalculator: setVisitorToBextStateOnTick should be overwritten')
    }

    setVisitorToNextStateOnKeyPress(visitedObject:any, keyPresses: KeyPress){
        if (keyPresses === KeyPress.Start) {
            if (visitedObject.isGameOver) { this.restart(visitedObject) }
            else { visitedObject.startGame(); }
        }
        if (!visitedObject.isGameStarted) {
            if (keyPresses === KeyPress.Speed) {visitedObject.increaseSpeed()}
            if (keyPresses === KeyPress.Level) {visitedObject.increaseLevel()}    
        }
        if (visitedObject.isGameOver) return;
        if (keyPresses === KeyPress.Rotate) { visitedObject.rotate() }
        if (keyPresses === KeyPress.Pause) {visitedObject.pauseGame()}
        if (!visitedObject.checkIfGameLocked()) {
            this.tryMoving(visitedObject, keyPresses);
        }
    }

    rotate(visitedObject:any){throw new Error('NextStateCalculator: rotate not implemented')}

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number){
        throw new Error('NextStateCalculator: setVisitorToNextStateOnSpeedTick should be overwritten')
    }

    isFieldOutsideBoard(visitedObject: any, deltaRow: number, deltaCol: number) {
        const newPawnCordsCP: PawnCords = this.getNewPawnCords(visitedObject, deltaRow, deltaCol);
        const result = this.isBrickOutsideBoard(visitedObject, newPawnCordsCP);
        return result;
    }

    getNewPawnCords(visitedObject:any, deltaRow:number, deltaCol:number) {
        return {
            col: visitedObject.pawnCords.col + deltaCol,
            row: visitedObject.pawnCords.row + deltaRow,
        }
    }

    isFieldOccupied(visitedObject: any, deltaRow:number, deltaCol:number) {
        const newPawnCordsCP: PawnCords = this.getNewPawnCords(visitedObject, deltaRow, deltaCol);
        const isOccupied = visitedObject.background[newPawnCordsCP.row][newPawnCordsCP.col];
        return isOccupied
    }

    isBrickOutsideBoard(visitedObject: any, brickCords: PawnCords) {
        const maxRow = visitedObject.pawnLayer.length - 1;
        const maxCol = visitedObject.pawnLayer[0].length - 1;
        if (brickCords.col > maxCol) return true;
        if (brickCords.row > maxRow) return true;
        if (brickCords.col < 0) return true;
        if (brickCords.row < 0) return true;
        return false;
    }

    tryMoving( visitedObject: any, keyPresses: KeyPress ) {
        if (keyPresses === KeyPress.Down) this.move(visitedObject, 1, 0);
        if (keyPresses === KeyPress.Up) this.move(visitedObject, -1, 0);
        if (keyPresses === KeyPress.Left) this.move(visitedObject, 0, -1);
        if (keyPresses === KeyPress.Right) this.move(visitedObject, 0, 1);
    }

    restart(visitedObject:any){
        if (visitedObject.isGameWon || visitedObject.isGameOver){
            visitedObject.restart();
            this.restartSpecificAttributes(visitedObject);
            this.initiate(visitedObject);
        }
    }

    restartSpecificAttributes(visitedObject:any) {
        console.warn('restartSpecificAttributes in AbstractNextStateCalculator should be overwritten');
    }

    move(visitedObject:any, deltaRow: number, deltaCol: number) {
        throw new Error('NextStateCalculator: move should be overwritten')
    }

    summArrayOfArrays<T extends number[][] >(arrayOfArrays:T )  {
        const summRow = (row: number[]) => row.reduce((acc, item) => {
            acc += item;
            return acc;
        }, 0)
        const summ = arrayOfArrays.reduce((acc: number, row:number[]) => {
            acc += summRow(row);
            return acc;
        }, 0);
        return summ;
    }

    getNewMergedLayer<T extends number[][]> (l1:T, l2:T, mergeFunction: (n1:number, n2:number) => number) {
        if (l1.length !== l2.length) { throw new Error('getNewMergedLayer: lenghts not compatible')};
        const mergeRows = (r1:number[], r2:number[]) => {
            if (r1.length !== r2.length) { throw new Error('Rows not compatibile')}
            const result = r1.map((item, index) => mergeFunction(item, r2[index]));
            return result;
        }
        const merged = l1.map((row, index) => mergeRows(row, l2[index]));
        return merged;
    }

}
