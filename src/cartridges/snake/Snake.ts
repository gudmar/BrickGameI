import { UP_LOCK } from "../../constants/gameCodes";
import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { JudgeInterface } from "../../types/JudgeInterface";
import { KeyPress } from "../../types/KeyPress";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { getEmptyBoard, getEmptyNextFigure } from "../constants";
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

enum directions {DOWN, LEFT, RIGHT, UP}

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
    lifes: number = 4;
    direction: directions = directions.RIGHT;

    tail: PawnCords[] = this.getInitialTail();

    clean(visitedObject:GameCreator) {
        this.initiate(visitedObject)
    }

    getInitialTail() {
        return [
            {col: 1, row: 5},
            {col: 2, row: 5},
            {col: 3, row: 5},
            {col: 4, row: 5},
        ]

        // return [
        //     {col: 4, row: 5},
        //     {col: 3, row: 5},
        //     {col: 2, row: 5},
        //     {col: 1, row: 5},
        // ]
    }

    setLifesToNextFigure(visitedObject: GameCreator) {
        const CLOUMN_TO_DISPLAY_LIFES = 0;
        if (this.lifes > 4) this.lifes = 4;
        if (this.lifes < 0) this.lifes = 0;
        const nextFigure = getEmptyNextFigure();
        for(let rowIndex = 3; rowIndex >= (4 - this.lifes); rowIndex--) {
            nextFigure[rowIndex][CLOUMN_TO_DISPLAY_LIFES] = 1;
        }
        visitedObject.nextFigure = nextFigure;
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

    moveTail(visitedObject: GameCreator, deltaRow: number, deltaCol: number) {
        this.recalculateTail(visitedObject, deltaRow, deltaCol);
        this.addTailToPawnLayer(visitedObject);
    }

    initiate(visitedObject:GameCreator){
        visitedObject.background = getEmptyBoard();
        visitedObject.pawnLayer = getEmptyBoard();
        visitedObject.pawnCords = {
            col: 5, row: 5,
        }
        this.direction = directions.UP;
        this.tail = this.getInitialTail();
        this.setPawnLayer(visitedObject);
        this.setLevel(visitedObject);
        this.setLifesToNextFigure(visitedObject)
    }

    setPawnLayer(visitedObject: GameCreator) {
        const { col, row} = visitedObject.pawnCords;
        visitedObject.pawnLayer[row][col] = 1;
        this.addTailToPawnLayer(visitedObject)
    }

    move(visitedObject: GameCreator, deltaRow:number, deltaCol:number) {
        if (this.isFieldOutsideBoard(visitedObject, deltaRow, deltaCol)) {
            this.informDeathWrongMove(visitedObject);
            return;
        }
        if (this.isFieldOccupied(visitedObject, deltaRow, deltaCol)) {
            this.informDeathWrongMove(visitedObject);
            return;
        }
        this.setNewDirection(deltaRow, deltaCol);
        if (this.moveInterferesWithTail(visitedObject, deltaRow, deltaCol)) {
            this.invertDirection(visitedObject);
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
        this.moveTail(visitedObject, deltaRow, deltaCol)
    }

    invertDirection(visitedObject: GameCreator){
        const newHeadCords = this.tail.shift();
        const {row, col} = visitedObject.pawnCords;
        this.tail.push({row, col});
        visitedObject.pawnCords = newHeadCords!;
        this.tail.reverse();
        this.addTailToPawnLayer(visitedObject);
    }

    setNewDirection(deltaRow: number, deltaCol: number) {
        if (deltaCol > 0) this.direction = directions.RIGHT;
        if (deltaRow > 0) this.direction = directions.DOWN;
        if (deltaCol < 0) this.direction = directions.LEFT;
        if (deltaRow < 0) this.direction = directions.UP;
    }

    moveInterferesWithTail(visitedObject: GameCreator, deltaRow:number, deltaCol:number) {
        const {row, col} = this.lastTailBrickCords;
        const {row: pawnRow, col: pawnCol} = visitedObject.pawnCords;
        const plannedRow = pawnRow + deltaRow;
        const plannedCol = pawnCol + deltaCol;
        return plannedCol === col && plannedRow === row;
    }

    get lastTailBrickCords() {return this.tail[this.tail.length - 1]}

    informDeathWrongMove(visitedObject:GameCreator){
        this.lifes--;
        this.setLifesToNextFigure(visitedObject);
        if (this.lifes === 0) {
            visitedObject.isGameOver = true;
            visitedObject.gameLost();
        } else {
            this.setGameToNotStarted(visitedObject)
        }
    }

    setGameToNotStarted(visitedObject: GameCreator){
        this.initiate(visitedObject);
        visitedObject.isGameStarted = false;
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
