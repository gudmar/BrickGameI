import { KeyPress } from "../types/KeyPress";
import { BrickMap, GameLogicArgs, OneToTen } from "../types/types";
import { GameLogic } from "./AbstractGameLogic";
import { getEmptyBoard, EMPTY_NEXT_FIGURE } from "./constants";
import { and, or, xor } from "./layers/toggle/toggleFunction";

export interface PawnCords {
    row: number,
    col: number,
}

export interface GameCreatorDecoratorInterface {
    nextStateCalculator: { new(...args: any[]): any },
    judge: { new(...args: any[]): any },
    afterGameAnimation: any,
    // background: BrickMap,
    beforeGameAnimation: any,
}

enum StateCalculatorIndex { beforeAnimation, game, afterAnimation };

export class GameCreator extends GameLogic {

    static instance: any;
    public name = "";
    public background = getEmptyBoard();
    private _pawnLayer: BrickMap = getEmptyBoard();
    private brickMap = this.mergeLayer();
    public level:OneToTen = 1;
    public speed:OneToTen = 1;
    private nextFigure = EMPTY_NEXT_FIGURE;
    public score:number = 0;
    public isPaused: boolean = false;
    public isAnimating: boolean = false;
    public isGameOver: boolean = false;
    public nextStateCalculator: any;    
    public gameCalculator: any;
    private animationAfterCalculator: any;
    private animationBeforeCalculator: any;
    public judge:any;
    public isGameWon: boolean = false;
    public isCheater: boolean = false;
    public isGameStarted: boolean = false; // false by default, 
    public pawnCords: PawnCords = { row: 0, col: 0 };
    private stateCalculators: any[] | null = null;

    constructor({
        nextStateCalculator,
        judge,
        // background,
        afterGameAnimation,
        beforeGameAnimation,
    }:GameCreatorDecoratorInterface) {
        super();
        this.brickMap = this.mergeLayer();
        this.gameCalculator = new nextStateCalculator();
        this.animationAfterCalculator = new afterGameAnimation();
        this.animationBeforeCalculator = new beforeGameAnimation();        
        this.stateCalculators = [this.animationBeforeCalculator, this.gameCalculator, this.animationAfterCalculator]
        this.switchStateCalculator(StateCalculatorIndex.beforeAnimation);
        this.judge = new judge();
        return this;
    }

    get pawnLayer() {
        if (this._pawnLayer.length > 20) {
            console.error('Pawne layer length', this._pawnLayer.length)
        }
        return this._pawnLayer.slice(0, 20)
    }
    set pawnLayer(val:BrickMap) {
        if (val.length > 20) {
            throw new Error(`Attempt to set pawnLayer to ${val}`)
        }
        this._pawnLayer = val;
    }

    public resetLayer() {
        this.pawnLayer = getEmptyBoard();
    }

    private switchStateCalculator(newCalculatorIndex: number) {
        if (this.nextStateCalculator) this.nextStateCalculator.clean(this);
        this.nextStateCalculator = this.stateCalculators![newCalculatorIndex];
        this.nextStateCalculator.initiate(this);
    }

    public getEmptyRow() {
        return getEmptyBoard()[0];
    }

    public informJudge(information: string, payload?: any) {
        this.judge.inform(this, information, payload);
    }

    public passCode(code:string) {
        this.nextStateCalculator.passCode(this, code);
    }

    public restart(){
        this.paused = false;
        this.isGameOver = false;
        this.isGameWon = false;
        this.isPaused = false;
        this.isGameStarted = true;
        this.isCheater = false;
        this.pawnLayer = getEmptyBoard();
    }

    private getGameState (): GameLogicArgs {
        return {
            brickMap: this.brickMap,
            level: this.level,
            speed: this.speed,
            nextFigure: this.nextFigure,
            score: this.score,
            isPaused: this.isPaused,
            isAnimating: this.isAnimating,
            isGameOver: this.isGameOver,
            isGameWon: this.isGameWon,
            isGameStarted: this.isGameStarted,
            isCheater: this.isCheater,
        }
    }

    public getNextStateOnTick(time:number): GameLogicArgs {
            this.nextStateCalculator.setVisitorToNextStateOnTick(this, time)
            this.brickMap = this.mergeLayer();
        return this.state;
    }

    public getNextStateOnSpeedTick(time:number): GameLogicArgs {
        if (this.checkIfGameLocked()) return this.state;
        this.nextStateCalculator.setVisitorToNextStateOnSpeedTick(this, time)
        this.brickMap = this.mergeLayer();
        return this.state;
    }

    public gameEnded() {
        this.switchStateCalculator(StateCalculatorIndex.afterAnimation);
    }

    public afterGameAnimationEnded() {
        this.switchStateCalculator(StateCalculatorIndex.beforeAnimation);
    }

    public getNextStateOnKeyPress(keyPresses: KeyPress): GameLogicArgs {
            this.nextStateCalculator.setVisitorToNextStateOnKeyPress(this, keyPresses)
            this.brickMap = this.mergeLayer()    
        return this.state;
    }

    public checkIfGameLocked() {
        return (this.isGameOver || !this.isGameStarted || this.isPaused || this.isGameWon || this.isAnimating )
    }

    public rotate() { 
        if (!this.checkIfGameLocked()){
            this.nextStateCalculator.rotate(this)
        }
    }
    public increaseSpeed() { this.speed > 9 ? this.speed = 1 : this.speed++; console.log('speed', this.speed) }

    public increaseLevel() { 
        this.level > 9 ? this.level = 1 : this.level++;
        this.nextStateCalculator.setLevel(this);
    }

    public startGame() { 
        this.isGameStarted = true;
        this.isGameOver = false;
        this.isGameWon = false;
        this.switchStateCalculator(StateCalculatorIndex.game)
    }
    public pauseGame() { 
        this.isPaused = !this.isPaused;
    }

    private get state() {
        return {
            brickMap: this.brickMap,
            level: this.level,
            speed: this.speed,
            nextFigure: this.nextFigure,
            score: this.score,
            isPaused: this.isPaused,
            isAnimating: this.isAnimating,
            isGameOver: this.isGameOver,
            isGameWon: this.isGameWon,
            isGameStarted: this.isGameStarted,
            isCheater: this.isCheater,
        }
    }

    private mergeLayer(): BrickMap {
        const result = this.pawnLayer.map((layerRow: number[], index: number) => {
            return this.mergeRow(layerRow, this.background[index])
        })
        return result;
    }

    private mergeRow(layerRow: number[], boardRow: number[]) {
        
        return layerRow.map((layerBrick:number, index:number) => {
            if (boardRow === undefined) console.error(boardRow, this.background, this.pawnLayer)
            return this.mergeBrick(layerBrick, boardRow[index])
        })
            
    }

    public mergeBrick(currentBrick: number, layerBrick: number) {
        return xor(currentBrick, layerBrick);
    }

    private embedLayer():BrickMap {
        const result = this.pawnLayer.map((layerRow: number[], index: number) => {
            return this.embedRow(layerRow, this.background[index])
        })
        return result;
    }

    private embedRow(layerRow: number[], boardRow: number[]) {
        return layerRow.map((layerBrick:number, index:number) => this.embedBrick(layerBrick, boardRow[index]))
    }

    private embedBrick(currentBrick:number, layerBrick:number) {
        return or(currentBrick, layerBrick);
    }
}