import { BUMP, DONT_BUMP, START_TIMER, STOP_TIMER } from "../../constants/gameCodes";
import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { BrickMap } from "../../types/types";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { GAME_OVER, MAZE } from "../constants";
import { GameCreator, PawnCords } from "../GameCreator";
import { GamesIntro } from "../GamesIntro/GamesIntro";
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { MAZE_INTRO } from "./MazeIntroBackground";

class GameIntroCloasure{
    constructor() {
        const gameIntro = new GamesIntro(MAZE_INTRO);
        return gameIntro;
    }
}

export class MazeMoverDecorator {
    constructor() {
        const decoratedClass = new GameCreator({
            nextStateCalculator: PawnMover,
            judge: Judge,
            // background: MAZE,
            afterGameAnimation: AnimationAfterGame,
            beforeGameAnimation: GameIntroCloasure,
        });
        // const decoratedClass = new GameCreator(PawnMover, GAME_OVER);
        return decoratedClass;
    }
}

const gameEvents = {
    WRONG_MOVE: 'Wrong move',
    MOVE: 'Move',
    TICK: 'Tick',
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

class PawnMover extends NextStateCalculator {
    cheaterStopTimer: boolean = false;
    bumpLock: boolean = false;
    clean(){
        this.cheaterStopTimer = false;
    }

    initiate(visitedObject:any){
        visitedObject.background = MAZE;
        visitedObject.pawnCords = {
            col: 1, row: 0,
        }
        visitedObject.pawnLayer[0][1] = 1;
        visitedObject.score = 2000;
        this.setLevel(visitedObject);
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

    setLevel(visitedObject: any) {
        const {level} = visitedObject;
        const pointsToStartWith = [
            2000, 1700, 1500, 1200, 1000, 900, 850, 800, 750, 700, 650
        ]
        visitedObject.score = pointsToStartWith[level]
    }

    setVisitorToNextStateOnSpeedTick(visitedObject:any, time:number){
        if (!this.cheaterStopTimer) {
            visitedObject.informJudge(gameEvents.TICK)
        }
    }

    informJudgeWrongMove(visitedObject:any){
        if(!this.bumpLock) {
            visitedObject.informJudge(gameEvents.WRONG_MOVE);
        }
    }

    move(visitedObject: any, deltaRow:number, deltaCol:number) {
        if (this.isFieldOutsideBoard(visitedObject, deltaRow, deltaCol)) {
            this.informJudgeWrongMove(visitedObject);
            return;
        }
        if (this.isFieldOccupied(visitedObject, deltaRow, deltaCol)) {
            this.informJudgeWrongMove(visitedObject);
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

    rotate() {}

    passCode(visitedObject:any, code:string) {
        console.log(code);
        switch(code) {
            case START_TIMER:
                this.cheaterStopTimer = false;
                visitedObject.isCheater = true;
                break;
            case STOP_TIMER:
                this.cheaterStopTimer = true;
                visitedObject.isCheater = true;
                break;
            case DONT_BUMP:
                this.bumpLock = true;
                visitedObject.isCheater = true;
                break;
            case BUMP:
                this.bumpLock = false;
                break;
        }
    }

    informJugdeMove(oldCords: PawnCords, newCords: PawnCords, visitedObject:any) {
        const {col: oldCol, row: oldRow} = oldCords;
        const {col: newCol, row: newRow} = newCords;
        if (oldCol !== newCol || oldRow !== newRow) { visitedObject.informJudge(gameEvents.MOVE, newCords)}
    }

    getNewPawnCords(visitedObject:any, deltaRow:number, deltaCol:number) {
        return {
            col: visitedObject.pawnCords.col + deltaCol,
            row: visitedObject.pawnCords.row + deltaRow,
        }
    }
}
