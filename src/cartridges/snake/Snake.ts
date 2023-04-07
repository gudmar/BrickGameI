import { UP_LOCK } from "../../constants/gameCodes";
import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { KeyPress } from "../../types/KeyPress";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { getEmptyBoard, getEmptyNextFigure } from "../constants";
import { GameCreator, PawnCords } from "../GameCreator";
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { FoodLocalisator } from "./FoodLocalisator";
import { GameAnimator } from "./GameAnimator";
import { GameIntroCloasure } from "./GameIntroCloasure";
import { Judge } from "./Judge";
import { getSnakeLevelBoard } from "./levels";
import { TailHandler } from "./TailHandler";


enum directions {DOWN, LEFT, RIGHT, UP}

export class SnakeDecorator {
    constructor() {

        const decoratedClass = new GameCreator(
            {
                nextStateCalculator: SnakeVisitor,
                judge: Judge,
                afterGameAnimation: AnimationAfterGame,
                beforeGameAnimation: GameIntroCloasure,
            }
        );
        return decoratedClass;
    }
}

class SnakeVisitor extends NextStateCalculator implements GameCreatorInterface{
    cheaterStopTimer: boolean = false;
    bumpLock: boolean = false;
    lifes: number = 4;
    direction: directions = directions.RIGHT;

    tailHandler = new TailHandler();
    _foodCords: PawnCords | null = null;
    MAX_TAIL_LENGTH = 13;
    gameAnimator = new GameAnimator();

get foodCords():PawnCords { return this._foodCords as PawnCords; }
set foodCords(val: PawnCords) {
    this._foodCords = val

}

    clean(visitedObject:GameCreator) {
        this.initiateWithoutScore(visitedObject);
    }

    levelFinished(visitedObject: GameCreator) {
        this.gameAnimator.curtainAnimation(visitedObject);
        if (visitedObject.level === 10) { visitedObject.level = 1 }
        else { visitedObject.level++ };
        this.initiateWithoutScore(visitedObject)
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

    initiate(visitedObject:GameCreator){
        if (this.lifes === 0) {
            this.lifes = 4;
            visitedObject.score = 0;
        }
        this.initiateWithoutScore(visitedObject);
        FoodLocalisator.randomlyPlaceFood(this, visitedObject);
    }

    initiateWithoutScore(visitedObject:GameCreator) {
        visitedObject.background = getEmptyBoard();
        this.setLevel(visitedObject);
        visitedObject.pawnCords = {
            col: 5, row: 5,
        }
        this.direction = directions.RIGHT;
        this.tailHandler.resetTailToDefaultPosition();
        this.setPawnLayer(visitedObject);
        this.setLifesToNextFigure(visitedObject);
    }

    setPawnLayer(visitedObject: GameCreator) {
        const { col, row} = visitedObject.pawnCords;
        visitedObject.pawnLayer = getEmptyBoard();
        visitedObject.pawnLayer[row][col] = 1;
        this.tailHandler.addTailToPawnLayer(visitedObject);
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
        if (this.tailHandler.doesMoveCrashIntoTail(visitedObject, deltaRow, deltaCol)){
            this.informDeathWrongMove(visitedObject);
            return;
        }
        
        if (this.tailHandler.moveInterferesWithTail(visitedObject, deltaRow, deltaCol)) {
            this.setDirectionAfterDirectionInvert();
            this.tailHandler.invertDirection(visitedObject);
            return;
        }
        this.setNewDirection(deltaRow, deltaCol);
        const oldPawnCords: PawnCords = {
            col: visitedObject.pawnCords.col,
            row: visitedObject.pawnCords.row,
        }
        const newPawnCordsCP: PawnCords = this.getNewPawnCords(visitedObject, deltaRow, deltaCol);
        visitedObject.pawnLayer[oldPawnCords.row][oldPawnCords.col] = 0;
        visitedObject.pawnCords = newPawnCordsCP;
        visitedObject.pawnLayer[newPawnCordsCP.row][newPawnCordsCP.col] = 1;
        visitedObject.pawnLayer[oldPawnCords.row][oldPawnCords.col] = 0;
        this.tailHandler.handleTail(this, visitedObject, deltaRow, deltaCol);
    }

    setDirectionAfterDirectionInvert(){
        const {row: rowA, col: colA} = this.tailHandler.tail[0];
        const {row: rowB, col: colB} = this.tailHandler.tail[1];
        if (rowA === rowB) {
            if (colA > colB) this.direction = directions.RIGHT
            if (colB > colA) this.direction = directions.LEFT
            return;
        }
        if (colB === colA) {
            if (rowA > rowB) this.direction = directions.UP
            if (rowB > rowA) this.direction = directions.DOWN
            return;
        }
        throw new Error('Snake, change direction after direcion invert: rowA !== rowB and colA !== colB, not possible')
    }

    setNewDirection(deltaRow: number, deltaCol: number) {
        if (deltaCol > 0) this.direction = directions.RIGHT;
        if (deltaRow > 0) this.direction = directions.DOWN;
        if (deltaCol < 0) this.direction = directions.LEFT;
        if (deltaRow < 0) this.direction = directions.UP;
    }

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

    passCode(visitedObject:GameCreator, code:string){}

    setVisitorToNextStateOnSpeedTick(visitedObject:GameCreator, time:number){
        if (this.gameAnimator.isCurtainAnimationOngoing) return;
        const getDeltaCords = () => {
            switch(this.direction) {
                case directions.DOWN: return {deltaRow: 1, deltaCol: 0};
                case directions.UP: return {deltaRow: -1, deltaCol: 0};
                case directions.RIGHT: return {deltaRow: 0, deltaCol: 1};
                case directions.LEFT: return {deltaRow: 0, deltaCol: -1};
            }
        }
        const {deltaCol, deltaRow} = getDeltaCords();
        this.move(visitedObject, deltaRow, deltaCol);
        
    }

    restartSpecificAttributes(visitedObject: GameCreator) {}

    rotate(visitedObject: GameCreator){}

    setLevel(visitedObject: GameCreator){
        const { level } = visitedObject;
        const board = getSnakeLevelBoard(level);
        const isAnimating = this.gameAnimator.setMemoizedBackground(board);
        if (!isAnimating) visitedObject.background = board;
    }
    pauseGame(visitedObject: GameCreator){}

    setVisitorToNextStateOnTick(visitedObject: GameCreator, time: number){
        if (!this.gameAnimator.isCurtainAnimationOngoing){
            const blinkingPoints = [visitedObject.pawnCords, this.foodCords]
            if (time % 10 === 0) {
                blinkingPoints.forEach(point => this.togglePointOnLayer(visitedObject, point as PawnCords)) 
            }    
        }
        this.gameAnimator.tick(visitedObject, this)
    }
    togglePointOnLayer(visitedObject: GameCreator, point: PawnCords) {
        if (!point) return;
        const {col, row} = point;
        if (visitedObject.pawnLayer[row][col] === 1) {
            visitedObject.pawnLayer[row][col] = 0
        } else {
            visitedObject.pawnLayer[row][col] = 1;
        }    
    }
    // setVisitorToNextStateOnKeyPress(visitedObject: GameCreator, keyPresses: KeyPress){
        
    // }

}
