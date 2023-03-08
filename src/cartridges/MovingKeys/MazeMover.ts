import { KeyPress } from "../../types/types";
import { GAME_OVER, MAZE } from "../constants";
import { GameCreator, PawnCords } from "../GameCreator";

export class MazeMoverDecorator {
    constructor() {
        const decoratedClass = new GameCreator(PawnMover, Judge, MAZE);
        // const decoratedClass = new GameCreator(PawnMover, GAME_OVER);
        return decoratedClass;
    }
}

const gameEvents = {
    WRONG_MOVE: 'Wrong move',
    MOVE: 'Move',
    TICK: 'Tick',
    // POSITION: 'Position'
}

class Judge {
    inform(visitedObject: any, information: string, payload?: any){
        switch(information) {
            case gameEvents.WRONG_MOVE : visitedObject.score -= 20; break;
            // case gameEvents.MOVE : visitedObject.score -= 10; break;
            case gameEvents.TICK: visitedObject.score -= 10; break;
            case gameEvents.MOVE: {
                visitedObject.score -= 10;
                const {col, row} = payload;
                console.log(col, row)
                if (col === 8 && row === 19) {
                    visitedObject.isGameWon = true;
                }
            }
        }
        if (visitedObject.score < 0) { visitedObject.score = 0};
        if (visitedObject.score === 0) { visitedObject.isGameOver = true};
    }
}

class PawnMover {

    initiate(visitedObject:any){
        visitedObject.pawnCords = {
            col: 1, row: 0,
        }
        visitedObject.pawnLayer[0][1] = 1;
        visitedObject.score = 1000;
    }

    setVisitorToNextStateOnTick(visitedObject:any, time:number){
        if (time % 10 === 0) {
            const {col, row} = visitedObject.pawnCords;
            if (visitedObject.pawnLayer[row][col] === 1) {
                visitedObject.pawnLayer[row][col] = 0
            } else {
                visitedObject.pawnLayer[row][col] = 1;
            }    
        }
    }

    setVisitorToNextStateOnSpeedTick(visitedObject:any, time:number){
        visitedObject.informJudge(gameEvents.TICK)
    }

    setVisitorToNextStateOnKeyPress(visitedObject:any, keyPresses: KeyPress){
        this.tryMoving(visitedObject, keyPresses);
    }

    tryMoving( visitedObject: any, keyPresses: KeyPress ) {

        if (keyPresses === KeyPress.Down) this.move(visitedObject, 1, 0);
        if (keyPresses === KeyPress.Up) this.move(visitedObject, -1, 0);
        if (keyPresses === KeyPress.Left) this.move(visitedObject, 0, -1);
        if (keyPresses === KeyPress.Right) this.move(visitedObject, 0, 1);
        if (keyPresses === KeyPress.Speed) {visitedObject.increaseSpeed()}
        if (keyPresses === KeyPress.Level) {visitedObject.increaseLevel()}
    }

    move(visitedObject: any, deltaRow:number, deltaCol:number) {
        if (this.isFieldOutsideBoard(visitedObject, deltaRow, deltaCol)) {
            visitedObject.informJudge(gameEvents.WRONG_MOVE)
            return;
        }
        if (this.isFieldOccupied(visitedObject, deltaRow, deltaCol)) {
            visitedObject.informJudge(gameEvents.WRONG_MOVE)
            return;
        }
        const oldPawnCords: PawnCords = {
            col: visitedObject.pawnCords.col,
            row: visitedObject.pawnCords.row,
        }
        const newPawnCordsCP: PawnCords = this.getNewPawnCords(visitedObject, deltaRow, deltaCol);
        this.informJugdeMove(oldPawnCords, newPawnCordsCP, visitedObject);
        visitedObject.pawnLayer[oldPawnCords.row][oldPawnCords.col] = 0;
        visitedObject.pawnCords = newPawnCordsCP;
        visitedObject.pawnLayer[newPawnCordsCP.row][newPawnCordsCP.col] = 1;
        visitedObject.pawnLayer[oldPawnCords.row][oldPawnCords.col] = 0;
    }

    informJugdeMove(oldCords: PawnCords, newCords: PawnCords, visitedObject:any) {
        const {col: oldCol, row: oldRow} = oldCords;
        const {col: newCol, row: newRow} = newCords;
        if (oldCol !== newCol || oldRow !== newRow) { visitedObject.informJudge(gameEvents.MOVE, newCords)}
    }

    isFieldOutsideBoard(visitedObject: any, deltaRow:number, deltaCol:number) {
        const newPawnCordsCP: PawnCords = this.getNewPawnCords(visitedObject, deltaRow, deltaCol);
        const maxRow = visitedObject.pawnLayer.length - 1;
        const maxCol = visitedObject.pawnLayer[0].length - 1;
        if (newPawnCordsCP.col > maxCol) return true;
        if (newPawnCordsCP.row > maxRow) return true;
        if (newPawnCordsCP.col < 0) return true;
        if (newPawnCordsCP.row < 0) return true;
        return false;
    }

    isFieldOccupied(visitedObject: any, deltaRow:number, deltaCol:number) {
        const newPawnCordsCP: PawnCords = this.getNewPawnCords(visitedObject, deltaRow, deltaCol);
        const isOccupied = visitedObject.background[newPawnCordsCP.row][newPawnCordsCP.col];
        return isOccupied
    }

    getNewPawnCords(visitedObject:any, deltaRow:number, deltaCol:number) {
        return {
            col: visitedObject.pawnCords.col + deltaCol,
            row: visitedObject.pawnCords.row + deltaRow,
        }
    }

    decreaseScore(visitedObject: any) {
        visitedObject.score -= 10;
    }
}