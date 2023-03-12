import { KeyPress } from "../types/types";
import { PawnCords } from "./GameCreator";

export abstract class NextStateCalculator {
    initiate(visitedObject:any){
        visitedObject.name = 'Overwrite name';
        visitedObject.pawnCords  = { col: 0, row: 0 }
        throw new Error('NextStateCalculator: initialte should be overwritten')
    }

    setVisitorToNextStateOnTick(visitedObject:any, time: number){
        throw new Error('NextStateCalculator: setVisitorToBextStateOnTick should be overwritten')
    }

    setVisitorToNextStateOnKeyPress(visitedObject:any, keyPresses: KeyPress){
        if (keyPresses === KeyPress.Speed) {visitedObject.increaseSpeed()}
        if (keyPresses === KeyPress.Level) {visitedObject.increaseLevel()}
        if (keyPresses === KeyPress.Start) {
            this.restart(visitedObject);
            visitedObject.startGame();
        }
        if (keyPresses === KeyPress.Pause) {visitedObject.pauseGame()}
        if (!visitedObject.checkIfGameLocked()) {
            this.tryMoving(visitedObject, keyPresses);
        }
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
            this.initiate(visitedObject);
            visitedObject.restart();    
        }
    }

    move(visitedObject:any, deltaRow: number, deltaCol: number) {
        throw new Error('NextStateCalculator: move should be overwritten')
    }

}
