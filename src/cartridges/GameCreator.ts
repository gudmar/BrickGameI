import { BrickMap, GameLogicArgs, KeyPress, OneToTen } from "../types/types";
import { GameLogic } from "./AbstractGameLogic";
import { EMPTY_BOARD, EMPTY_NEXT_FIGURE } from "./constants";
import { xor } from "./layers/toggle/toggleFunction";

export interface PawnCords {
    row: number,
    col: number,
}

export class GameCreator extends GameLogic {

    static instance: any;
    public NAME = "Maze mover";
    private background = EMPTY_BOARD;
    private pawnLayer: BrickMap = EMPTY_BOARD;
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

    public informJudge(information: string, payload?: any) {
        this.judge.inform(this, information, payload);
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
            isGameOver: this.isGameOver = false,
            isGameWon: this.isGameWon = false,
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

    public getNextStateOnKeyPress(keyPresses: KeyPress): GameLogicArgs {
        if (!this.isGameOver && !this.isGameWon){
            this.nextStateCalculator.setVisitorToNextStateOnKeyPress(this, keyPresses)
            this.brickMap = this.mergeLayer()    
        }
        return this.state;
    }

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