import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { JudgeInterface } from "../../types/JudgeInterface";
import { KeyPress } from "../../types/KeyPress";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { getEmptyBoard } from "../constants";
import { GameCreator, PawnCords } from "../GameCreator";
import { GamesIntro } from "../GamesIntro/GamesIntro";
import { AnimationAfterGame } from "../layers/AfterGameAnimation";

const INTRO_BACKGROUND = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0, 0, 1, 1, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

class GameIntroCloasure{
    constructor() {
        const gameIntro = new GamesIntro(INTRO_BACKGROUND);
        return gameIntro;
    }
}

export class SnakeDecorator {
    constructor() {

        const decoratedClass = new GameCreator(
            {
                nextStateCalculator: SnakeVisitor,
                judge: Judge,
                // background: EMPTY_BOARD,
                afterGameAnimation: AnimationAfterGame,
                beforeGameAnimation: GameIntroCloasure,
            }
        );
        return decoratedClass;
    }
}

const gameEvents = {
    COLLECT_BRICK: 'Brick collected',
}


class Judge implements JudgeInterface{
    inform(visitedObject: any, information: string, payload?: any){
        switch(information) {
            case gameEvents.COLLECT_BRICK: visitedObject.score += 100; break;
        }
    }
}

class SnakeVisitor extends NextStateCalculator implements GameCreatorInterface{
    cheaterStopTimer: boolean = false;
    bumpLock: boolean = false;

    initiate(visitedObject:GameCreator){
        visitedObject.background = getEmptyBoard();
        visitedObject.pawnCords = {
            col: 5, row: 5,
        }
        this.setPawnLayer(visitedObject);
        this.setLevel(visitedObject);
    }

    setPawnLayer(visitedObject: GameCreator) {
        const { col, row} = visitedObject.pawnCords;
        visitedObject.pawnLayer[row][col] = 1;
    }

    move(visitedObject: GameCreator, deltaRow:number, deltaCol:number) {
        console.log(deltaCol, deltaRow)
        if (this.isFieldOutsideBoard(visitedObject, deltaRow, deltaCol)) {
            this.informDeathWrongMove(visitedObject);
            return;
        }
        if (this.isFieldOccupied(visitedObject, deltaRow, deltaCol)) {
            this.informDeathWrongMove(visitedObject);
            return;
        }
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

    informDeathWrongMove(visitedObject:GameCreator){

    }

    passCode(visitedObject:GameCreator, code:string){
        
    }
    setVisitorToNextStateOnSpeedTick(visitedObject:GameCreator, time:number){
        
    }
    restartSpecificAttributes(visitedObject: GameCreator){
        
    }
    rotate(visitedObject: GameCreator){
        
    }
    setLevel(visitedObject: GameCreator){
        
    }
    pauseGame(visitedObject: GameCreator){
        
    }
    setVisitorToNextStateOnTick(visitedObject: GameCreator, time: number){
        if (time % 10 === 0) {
            const {col, row} = visitedObject.pawnCords;
            if (visitedObject.pawnLayer[row][col] === 1) {
                visitedObject.pawnLayer[row][col] = 0
            } else {
                visitedObject.pawnLayer[row][col] = 1;
            }    
        }
    }
    // setVisitorToNextStateOnKeyPress(visitedObject: GameCreator, keyPresses: KeyPress){
        
    // }

}
