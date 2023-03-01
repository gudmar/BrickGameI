import { BrickMap, GameLogicArgs, KeyPress, OneToTen } from "../types/types";
import { GameLogic } from "./AbstractGameLogic";
import { EMPTY_BOARD, EMPTY_NEXT_FIGURE, MAZE } from "./constants";
import { xor } from "./layers/toggle/toggleFunction";


export class GameCreator extends GameLogic {

    static instance: any;
    public NAME = "Maze mover";
    private background = MAZE;
    private layer: BrickMap = EMPTY_BOARD;
    private brickMap = this.mergeLayer();
    level:OneToTen = 1;
    speed:OneToTen = 1;
    private nextFigure = EMPTY_NEXT_FIGURE;
    score:number = 0;
    private isPaused: boolean = false;
    private isAnimating: boolean = false;
    private nextStateCalculator: any;    

    constructor(nextStateCalculator: any) {
        if(GameCreator.instance) return GameCreator.instance;
        super();
        this.nextStateCalculator = new nextStateCalculator();
        GameCreator.instance = this;
        return this;
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
        }
    }

    public getNextStateOnTick(): GameLogicArgs {
        // Blinking pawn
        const nextState = this.nextStateCalculator.getNextStateOnTick(this.getGameState())
        this.updateState(nextState);
        return nextState;
    }

    public getNextStateOnKeyPress(keyPresses: KeyPress): GameLogicArgs {
        const nextState = this.nextStateCalculator.getNextStateOnKeyPress(this.getGameState(), keyPresses)
        this.updateState(nextState);
        return nextState;
    }

    private updateState(nextState: GameLogicArgs) {
        const {
            brickMap, level, speed, nextFigure, score, isPaused, isAnimating
        } = nextState;
        this.brickMap = brickMap;
        this.level = level;
        this.speed = speed;
        this.nextFigure = nextFigure;
        this.score = score;
        this.isPaused = isPaused;
        this.isAnimating = isAnimating;
    }

    private mergeLayer(): BrickMap {
        const result = this.layer.map((layerRow: number[], index: number) => {
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