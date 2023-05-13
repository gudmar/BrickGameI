import { range } from "../../functions/range";
import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { getEmptyBoard } from "../constants";
import { GameCreator, PawnCords } from "../GameCreator";
import { GamesIntro } from "../GamesIntro/GamesIntro"
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { Judge } from "../Tanks/judge";
import { levels } from "./levels";

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

const INITIAL_PLAYER_POSITION = 3;
const PLAYER_LENGTH = 4;
const UPPER_PLAYER_ROW = 0;
const LOWER_PLAYER_ROW = 19;
const BOARD_WIDTH = getEmptyBoard()[0].length;

export class TennisVisitor extends NextStateCalculator implements GameCreatorInterface {

    pawnLayerRenderer?: PawnLayerRenderer;

    initiate(visitedObject: any): void {
        this.setInitialLevel(visitedObject);
        this.pawnLayerRenderer = new PawnLayerRenderer(visitedObject);
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

    clean(visitedObject: GameCreator){

    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number): void {
        
    }
    setVisitorToNextStateOnTick(visitedObject: any, time: number): void {
        
    }
    setGameToNotStarted(visitedObject: GameCreator){
        
    }
    move(visitedObject: any, deltaRow: number, deltaCol: number): void {
        console.log(deltaCol, deltaRow)
        if (deltaCol < 0) {
            this.pawnLayerRenderer!.movePlayerLeft(visitedObject);
            return;
        }
        if (deltaCol > 0) {
            this.pawnLayerRenderer!.movePlayerRight(visitedObject);
            return;
        }
    }
}

class PawnLayerRenderer {

    private _playerPosition: number;
    private _isGameStarted: boolean = false;
    private ballCordsCalculator: BallCordsCalculator;

    constructor(visitedObject: GameCreator) {
        this._playerPosition = INITIAL_PLAYER_POSITION;
        this.ballCordsCalculator = new BallCordsCalculator(visitedObject, () => this.isGameStarted, () => this.playerPosition)
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
    getIsGameStarted: () => boolean;
    getPlayerPosition: () => number
    visitedObject: GameCreator;

    constructor(visitedObject: GameCreator, getIsGameStarted: () => boolean, getPlayerPosition: () => number) {
        this.visitedObject = visitedObject;
        this.getIsGameStarted = getIsGameStarted;
        this.getPlayerPosition = getPlayerPosition;
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

}
