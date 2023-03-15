import { BrickMap, GameLogicArgs, KeyPress, OneToTen } from "../types/types";
import { GameLogic } from "./AbstractGameLogic";
import { getEmptyBoard, EMPTY_NEXT_FIGURE } from "./constants";
import { xor } from "./layers/toggle/toggleFunction";

export interface PawnCords {
    row: number,
    col: number,
}

export class GameCreator extends GameLogic {

    static instance: any;
    public NAME = "Maze mover";
    private background = getEmptyBoard();
    private pawnLayer: BrickMap = getEmptyBoard();
    private brickMap = this.mergeLayer();
    level:OneToTen = 1;
    speed:OneToTen = 1;
    private nextFigure = EMPTY_NEXT_FIGURE;
    score:number = 0;
    private isPaused: boolean = false;
    private isAnimating: boolean = false;
    private isGameOver: boolean = false;
    private nextStateCalculator: any;    
    private judge:any;
    private isGameWon: boolean = false;
    private isGameStarted: boolean = false; // false by default, 
    // if !isGameStarted then animation is displayed
    private pawnCords: PawnCords = { row: 0, col: 0 };

    constructor(nextStateCalculator: any, judge: any, background: BrickMap) {
        if(GameCreator.instance) return GameCreator.instance;
        super();
        this.nextStateCalculator = new nextStateCalculator();
        this.background = background;
        this.nextStateCalculator.initiate(this);
        this.brickMap = this.mergeLayer();
        this.judge = new judge();
        GameCreator.instance = this;
        return this;
    }

    public resetLayer() {
        this.pawnLayer = getEmptyBoard();
    }

    public informJudge(information: string, payload?: any) {
        this.judge.inform(this, information, payload);
    }

    public restart(){
        this.paused = false;
        this.isGameOver = false;
        this.isGameWon = false;
        this.isPaused = false;
        this.isGameStarted = true;
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
        }
    }

    public getNextStateOnTick(time:number): GameLogicArgs {
        // Blinking pawn
        if (!this.isGameOver && !this.isGameWon){
            this.nextStateCalculator.setVisitorToNextStateOnTick(this, time)
            this.brickMap = this.mergeLayer();
        }
        return this.state;
    }

    public getNextStateOnSpeedTick(time:number): GameLogicArgs {
        // Faster game actions
        if (this.checkIfGameLocked()) return this.state;
        if (!this.isGameOver && !this.isGameWon){
            this.nextStateCalculator.setVisitorToNextStateOnSpeedTick(this, time)
            this.brickMap = this.mergeLayer();
        }
        return this.state;
    }

    public getNextStateOnKeyPress(keyPresses: KeyPress): GameLogicArgs {
        // if (!this.isGameOver && !this.isGameWon){
            this.nextStateCalculator.setVisitorToNextStateOnKeyPress(this, keyPresses)
            this.brickMap = this.mergeLayer()    
        // }
        return this.state;
    }

    public checkIfGameLocked() {
        // console.log('over', this.isGameOver, 'started', this.isGameStarted, 'paused', this.isPaused, 'won', this.isGameWon)
        // console.log('Layer', this.pawnLayer)
        return (this.isGameOver || !this.isGameStarted || this.isPaused || this.isGameWon )
    }

    public rotate() { this.nextStateCalculator.rotate(this) }
    public increaseSpeed() { this.speed > 9 ? this.speed = 1 : this.speed++; console.log('speed', this.speed) }
    public increaseLevel() { this.level > 9 ? this.level = 1 : this.level++ }
    public startGame() { 
        this.isGameStarted = true;
        this.isGameOver = false;
        this.isGameWon = false;
    }
    public pauseGame() { this.isPaused = !this.isPaused;}

    // private updateState(nextState: GameLogicArgs) {
    //     const {
    //         brickMap, level, speed, nextFigure, score, isPaused, isAnimating
    //     } = nextState;
    //     this.brickMap = brickMap;
    //     this.level = level;
    //     this.speed = speed;
    //     this.nextFigure = nextFigure;
    //     this.score = score;
    //     this.isPaused = isPaused;
    //     this.isAnimating = isAnimating;
    // }

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
        }
    }

    private mergeLayer(): BrickMap {
        const result = this.pawnLayer.map((layerRow: number[], index: number) => {
            return this.mergeRow(layerRow, this.background[index])
        })
        return result;
    }

    private mergeRow(layerRow: number[], boardRow: number[]) {
        return layerRow.map((layerBrick:number, index:number) => this.mergeBrick(layerBrick, boardRow[index]))
    }

    private mergeBrick(currentBrick: number, layerBrick: number) {
        return xor(currentBrick, layerBrick);
    }
}