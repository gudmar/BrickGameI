import { range } from "../../functions/range";
import { getEmptyBoard } from "../constants";
import { GameCreator } from "../GameCreator";
import { BallCordsCalculator } from "./BallCordsCalculator";
import { BOARD_WIDTH, INITIAL_PLAYER_POSITION, LOWER_PLAYER_ROW, PLAYER_LENGTH, UPPER_PLAYER_ROW } from "./constants";
import { TennisVisitor } from "./Tennis";

export class PawnLayerRenderer {

    private _playerPosition: number;
    private _isGameStarted: boolean = false;
    private ballCordsCalculator: BallCordsCalculator;

    constructor(visitedObject: GameCreator, tennisController: TennisVisitor) {
        this._playerPosition = INITIAL_PLAYER_POSITION;
        this.ballCordsCalculator = new BallCordsCalculator(visitedObject, tennisController)
        this.ballCordsCalculator.restart();
    }

    public restart(visitedObject: GameCreator) {
        this._playerPosition = INITIAL_PLAYER_POSITION;
        this.ballCordsCalculator.restart();
        this.renderPawnLayer(visitedObject)
    }

    public movePlayerLeft(visitedObject: GameCreator) {
        if (this._playerPosition === 0) return;
        this._playerPosition--;
        this.ballCordsCalculator.moveBallIfTouchesPlayer(-1);
        this.renderPawnLayer(visitedObject);
    }

    public movePlayerRight(visitedObject: GameCreator) {
        if (this._playerPosition >= this.getMaxPlayerPosition()) return;
        this._playerPosition++;
        this.ballCordsCalculator.moveBallIfTouchesPlayer(+1);
        this.renderPawnLayer(visitedObject);
    }

    public moveBall(visitedObject: GameCreator) {
        this.ballCordsCalculator.doBoardSideEffects(visitedObject);
        this.renderPawnLayer(visitedObject);
    }

    public renderPawnLayer(visitedObject: GameCreator){
        if(visitedObject.isGameOver) return;
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