import { range } from "../../functions/range";
import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { calculateNextBallDirection } from "./calculateNextBallDirection";
import { BallDirections, ObstacleLocations } from "../../types/types";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { getEmptyBoard } from "../constants";
import { GameCreator, PawnCords } from "../GameCreator";
import { GamesIntro } from "../GamesIntro/GamesIntro"
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { Judge } from "../Tanks/judge";
import { BOARD_WIDTH, INITIAL_PLAYER_POSITION, LOWER_PLAYER_ROW, PLAYER_LENGTH, UPPER_PLAYER_ROW } from "./constants";
import { levels } from "./levels";
import reportWebVitals from "../../reportWebVitals";

const INTRO_BACKGROUND = [
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

class GameIntroCloasure {
    constructor() {
        const gameIntro = new GamesIntro(INTRO_BACKGROUND);
        return gameIntro;
    }
}

export class TennisDecorator {
    constructor() {
        const decoreatedClass = new GameCreator(
            {
                nextStateCalculator: TennisVisitor,
                judge: Judge,
                afterGameAnimation: AnimationAfterGame,
                beforeGameAnimation: GameIntroCloasure,
            }
        );
        return decoreatedClass;
    }
};

export class TennisVisitor extends NextStateCalculator implements GameCreatorInterface {

    pawnLayerRenderer?: PawnLayerRenderer;
    isPlayerMovingLeft: boolean = false;
    isPlayerMovingRight: boolean = false;
    isAnimating: boolean = false;

    initiate(visitedObject: any): void {
        this.setInitialLevel(visitedObject);
        this.pawnLayerRenderer = new PawnLayerRenderer(visitedObject, this);
        this.pawnLayerRenderer.renderPawnLayer(visitedObject);
    }
    
    passCode(visitedObject: GameCreator, code: string): void {
        
    }

    rotate(visitedObject: any): void {
        
    }

    pauseGame(visitedObject: GameCreator): void {
        
    }

    setInitialLevel(visitedObject: GameCreator): void {
        // visitedObject.level = 1;
        visitedObject.background = levels[visitedObject.level - 1];
    } 

    setLevel(visitedObject: GameCreator): void {
        visitedObject.level++;
        visitedObject.background = levels[visitedObject.level - 1];
    }

    isGameFrozen(visitedObject: GameCreator){
        return (visitedObject.isGameOver || this.isAnimating || !visitedObject.isGameStarted) || visitedObject.isPaused
    }


    clean(visitedObject: GameCreator){

    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number): void {
        if (this.isGameFrozen(visitedObject)) return;
        this.pawnLayerRenderer?.moveBall(visitedObject);

    }
    setVisitorToNextStateOnTick(visitedObject: any, time: number): void {
        if (this.isGameFrozen(visitedObject)) return;
        if (time % 2 === 0){
            if (this.isPlayerMovingLeft)
                this.pawnLayerRenderer!.movePlayerLeft(visitedObject);
            if (this.isPlayerMovingRight)
                this.pawnLayerRenderer!.movePlayerRight(visitedObject);
        }
        
    }
    setGameToNotStarted(visitedObject: GameCreator){
        
    }
    move(visitedObject: any, deltaRow: number, deltaCol: number): void {
        console.log(deltaCol, deltaRow)
        if (deltaCol < 0) {
            // this.pawnLayerRenderer!.movePlayerLeft(visitedObject);
            this.isPlayerMovingLeft = true;
            return;
        }
        if (deltaCol > 0) {
            // this.pawnLayerRenderer!.movePlayerRight(visitedObject);
            this.isPlayerMovingRight = true;
            return;
        }
    }
    stopLeft(visitedObject: any): void {
        this.isPlayerMovingLeft = false;
    }
    stopRight(visitedObject: any): void {
        this.isPlayerMovingRight = false;
    }
}

class PawnLayerRenderer {

    private _playerPosition: number;
    private _isGameStarted: boolean = false;
    private ballCordsCalculator: BallCordsCalculator;

    constructor(visitedObject: GameCreator, tennisController: TennisVisitor) {
        this._playerPosition = INITIAL_PLAYER_POSITION;
        this.ballCordsCalculator = new BallCordsCalculator(visitedObject, tennisController)
    }

    public movePlayerLeft(visitedObject: GameCreator) {
        if (this._playerPosition === 0) return;
        this._playerPosition--;
        this.renderPawnLayer(visitedObject);
    }

    public movePlayerRight(visitedObject: GameCreator) {
        if (this._playerPosition >= this.getMaxPlayerPosition()) return;
        this._playerPosition++;
        this.renderPawnLayer(visitedObject);
    }

    public moveBall(visitedObject: GameCreator) {
        this.ballCordsCalculator.setNextBallPosition(visitedObject);
        this.renderPawnLayer(visitedObject);
    }

    public renderPawnLayer(visitedObject: GameCreator){
        const newLayer = getEmptyBoard();
        this.renderLowerPlayer(newLayer);
        this.renderUpperPlayer(newLayer);
        this.ballCordsCalculator.renderBall(visitedObject, newLayer);
        visitedObject.pawnLayer = newLayer;
    }

    public get playerPosition () { return this._playerPosition }
    public get isGameStarted () { return this._isGameStarted}

    private calculateBallCords(visitedObject: GameCreator){

    }

    private getMaxPlayerPosition(){ return BOARD_WIDTH - PLAYER_LENGTH}

    private throwErrorIfPlayerNotFitInBoard(){
        if (this._playerPosition < 0 || this._playerPosition > this.getMaxPlayerPosition()) {
            throw new Error('Player position overflow')
        }
    }

    private renderLowerPlayer(pawnLayer: number[][]) {this.renderPlayer(pawnLayer, LOWER_PLAYER_ROW);}
    private renderUpperPlayer(pawnLayer: number[][]) {this.renderPlayer(pawnLayer, UPPER_PLAYER_ROW);}

    private renderPlayer(pawnLayer: number[][], row: number){
        this.throwErrorIfPlayerNotFitInBoard();
        const playerBase = range(PLAYER_LENGTH);
        playerBase.forEach((brick, index) => pawnLayer[row][index + this._playerPosition] = 1)
    }
}

class BallCordsCalculator {
    visitedObject: GameCreator;
    currentBallDirection: BallDirections = BallDirections.upRight;
    tennisController: TennisVisitor;

    // constructor(visitedObject: GameCreator, getIsGameStarted: () => boolean, getPlayerPosition: () => number) {
    constructor(visitedObject: GameCreator, tennisController: TennisVisitor) {
        this.visitedObject = visitedObject;
        this.tennisController = tennisController;
    }

    getIsGameStarted() { return this.visitedObject.isGameStarted }
    getPlayerPosition() {return this.tennisController.pawnLayerRenderer!.playerPosition;}

    public restart() {
        this.currentBallDirection = BallDirections.upRight
    }

    private getBallCordsGameNotStarted(visitedObject: GameCreator){
        return {row: LOWER_PLAYER_ROW - 1, col: this.getPlayerPosition() + 1} 
    }

    public renderBall(visitedObject: GameCreator, newLayer: number[][]){
        console.log(this.getPlayerPosition())
        if (!this.getIsGameStarted()) visitedObject.pawnCords = this.getBallCordsGameNotStarted(visitedObject);
        const {row, col} = visitedObject.pawnCords;
        newLayer[row][col] = 1;
    }

    public setNextBallPosition(visitedObject: GameCreator) {
        const newDirection = calculateNextBallDirection({
            currentDirection: this.currentBallDirection,
            ballCords: visitedObject.pawnCords,
            background: visitedObject.background,
            playerPosition: this.getPlayerPosition(),
            isPlayerMovingLeft: this.tennisController.isPlayerMovingLeft,
            isPlayerMovingRight: this.tennisController.isPlayerMovingRight,
        })
        this.currentBallDirection = newDirection;
        const nextBallPosition = getNewBallCords(this.currentBallDirection, visitedObject.pawnCords);
        visitedObject.pawnCords = nextBallPosition;
    }
}

const getNewBallCords = (direction: BallDirections, ballCords: PawnCords) => {
    const {row, col} = ballCords;
    switch(direction){
        case BallDirections.downLeft: return {row: row + 1, col: col - 1}
        case BallDirections.downRight: return {row: row + 1, col: col + 1}
        case BallDirections.upLeft: return {row: row -1, col: col - 1}
        case BallDirections.upRight: return {row: row - 1, col: col + 1}
        default: return ballCords;
    }
}
