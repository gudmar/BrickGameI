import { KeyPress } from "../../types/types";
import { MAZE } from "../constants";
import { GameCreator, PawnCords } from "../GameCreator";

export class MazeMoverDecorator {
    constructor() {
        const decoratedClass = new GameCreator(PawnMover, MAZE);
        return decoratedClass;
    }
}

class PawnMover {

    initiate(visitedObject:any){
        visitedObject.pawnCords = {
            col: 1, row: 0,
        }
        visitedObject.pawnLayer[0][1] = 1;
    }

    getNextStateOnTick(currentGameState:any){
        return currentGameState;
    }
    setVisitorToNextStateOnKeyPress(visitedObject:any, keyPresses: KeyPress){
        this.tryMoving(visitedObject, keyPresses);
        this.trySpeedingUp(visitedObject, keyPresses);
        this.tryLevelUp(visitedObject, keyPresses);
    }

    trySpeedingUp(visitedObject: any, keyPresses: KeyPress) {
        if (keyPresses !== KeyPress.Speed) return;
        const currentSpeed = visitedObject.speed;
        if (currentSpeed < 10) visitedObject.speed += 1;
        if (currentSpeed >= 10) visitedObject.speed = 0;
    }

    tryLevelUp(visitedObject: any, keyPresses: KeyPress) {
        if (keyPresses !== KeyPress.Level) return;
        const currentLevel = visitedObject.level;
        if (currentLevel < 10) visitedObject.level += 1;
        if (currentLevel >= 10) visitedObject.speed = 0;
    }

    tryMoving( visitedObject: any, keyPresses: KeyPress ) {

        if (keyPresses === KeyPress.Down) this.move(visitedObject, 1, 0);
        if (keyPresses === KeyPress.Up) this.move(visitedObject, -1, 0);
        if (keyPresses === KeyPress.Left) this.move(visitedObject, 0, -1);
        if (keyPresses === KeyPress.Right) this.move(visitedObject, 0, 1);
    }

    move(visitedObject: any, deltaRow:number, deltaCol:number) {
        if (this.isFieldOutsideBoard(visitedObject, deltaRow, deltaCol)) return;
        if (this.isFieldOccupied(visitedObject, deltaRow, deltaCol)) return;
        const oldPawnCords: PawnCords = {
            col: visitedObject.pawnCords.col,
            row: visitedObject.pawnCords.row,
        }
        const newPawnCordsCP: PawnCords = this.getNewPawnCords(visitedObject, deltaRow, deltaCol);
        visitedObject.pawnLayer[oldPawnCords.row][oldPawnCords.col] = 0;
        visitedObject.pawnCords = newPawnCordsCP;
        visitedObject.pawnLayer[newPawnCordsCP.row][newPawnCordsCP.col] = 1;
        visitedObject.pawnLayer[oldPawnCords.row][oldPawnCords.col] = 0;
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
        console.log(isOccupied)
        return isOccupied
    }

    getNewPawnCords(visitedObject:any, deltaRow:number, deltaCol:number) {
        return {
            col: visitedObject.pawnCords.col + deltaCol,
            row: visitedObject.pawnCords.row + deltaRow,
        }
    }
}