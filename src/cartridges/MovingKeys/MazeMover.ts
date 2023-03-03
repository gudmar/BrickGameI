import { KeyPress } from "../../types/types";
import { GameCreator, PawnCords } from "../GameCreator";

export class MazeMoverDecorator {
    constructor() {
        const decoratedClass = new GameCreator(PawnMover);
        return decoratedClass;
    }
}

class PawnMover {
    // NOT a pure functions, has own state
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
        const nrOfRows = visitedObject.pawnLayer.length;
        const nrOfCols = visitedObject.pawnLayer[0].length;
        const pawnCordsCP: PawnCords = {
            col: visitedObject.pawnCords.col,
            row: visitedObject.pawnCords.row,
        };
        if (keyPresses === KeyPress.Down && pawnCordsCP.row >= nrOfRows - 1) return;
        if (keyPresses === KeyPress.Up && pawnCordsCP.row <= 0) return;
        if (keyPresses === KeyPress.Left && pawnCordsCP.col <= 0) return;
        if (keyPresses === KeyPress.Right && pawnCordsCP.col >= nrOfCols - 1) return;
        visitedObject.pawnLayer[pawnCordsCP.row][pawnCordsCP.col] = 0;
        if (keyPresses === KeyPress.Down) this.move(visitedObject, 1, 0);
        if (keyPresses === KeyPress.Up) this.move(visitedObject, -1, 0);
        if (keyPresses === KeyPress.Left) this.move(visitedObject, 0, -1);
        if (keyPresses === KeyPress.Right) this.move(visitedObject, 0, 1);
        visitedObject.pawnLayer[pawnCordsCP.row][pawnCordsCP.col] = 0;
    }

    move(visitedObject: any, deltaRow:number, deltaCol:number) {
        const newPawnCordsCP: PawnCords = {
            col: visitedObject.pawnCords.col + deltaCol,
            row: visitedObject.pawnCords.row + deltaRow,
        };
        visitedObject.pawnCords = newPawnCordsCP;
        visitedObject.pawnLayer[newPawnCordsCP.row][newPawnCordsCP.col] = 1;
    }
}