import { range } from "../../functions/range";
import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { calculateNextBallDirection } from "./calculateNextBallDirection";
import { BallDirections, ObstacleLocations } from "../../types/types";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { getEmptyBoard } from "../constants";
import { GameCreator, PawnCords } from "../GameCreator";
import { GamesIntro } from "../GamesIntro/GamesIntro"
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { Judge } from "./Judge";
import { BOARD_WIDTH, INITIAL_PLAYER_POSITION, LOWER_PLAYER_ROW, PLAYER_LENGTH, UPPER_PLAYER_ROW } from "./constants";
import { getLevels, levels } from "./levels";
import reportWebVitals from "../../reportWebVitals";
import { getObstacleCords } from "./getObstacleLocations";
import { getMaxColIndex, getMaxRowIndex } from "./utils";
import { gameEvents } from "./Judge";
import { PawnLayerRenderer } from "./PawnLayerRenderer";
import { setLifesToNextFigure } from "../Functions/setLifesToNextFigure";
import { ADD_POINTS, IMMORTALITY } from "../../constants/gameCodes";

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
    lifes: number = 4;
    shouldMoveBallWithPlayer = false;
    isImmortal = false;

    initiate(visitedObject: any): void {
        this.isImmortal = false;
        this.setInitialLevel(visitedObject);
        visitedObject.isGameLost = false;
        visitedObject.isGameOver = false;
        setLifesToNextFigure(this, visitedObject);
        this.pawnLayerRenderer = new PawnLayerRenderer(visitedObject, this);
        this.reinitialize(visitedObject);
    }

    reinitialize(visitedObject: GameCreator) {
        this.isPlayerMovingLeft = false;
        this.isPlayerMovingRight = false;
        visitedObject.isGameStarted = false;
        this.pawnLayerRenderer!.restart(visitedObject);
        this.pawnLayerRenderer!.renderPawnLayer(visitedObject);
    }
    
    passCode(visitedObject: GameCreator, code: string): void {
        switch(code) {
            case IMMORTALITY: this.isImmortal = true; visitedObject.isCheater = true; break;
            case ADD_POINTS: visitedObject.judge.inform(visitedObject, gameEvents.CHEATER_MONEY); visitedObject.isCheater = true;

        }
    }

    rotate(visitedObject: any): void {
        this.shouldMoveBallWithPlayer = true;
    }

    spaceUp(visitedObject: GameCreator) {this.shouldMoveBallWithPlayer = false}

    pauseGame(visitedObject: GameCreator): void {
        
    }

    setInitialLevel(visitedObject: GameCreator): void {
        // visitedObject.level = 1;
        visitedObject.background = getLevels()[visitedObject.level - 1];
    } 

    setLevel(visitedObject: GameCreator): void {
        visitedObject.level++;
        visitedObject.background = getLevels()[visitedObject.level - 1];
    }

    isGameFrozen(visitedObject: GameCreator){        
        return (visitedObject.isGameOver || this.isAnimating || !visitedObject.isGameStarted) || visitedObject.isPaused
    }

    restart(visitedObject: any): void {
        this.clean(visitedObject)
        visitedObject.isGameOver = false;
    }


    clean(visitedObject: GameCreator){
        this.reinitialize(visitedObject)
    }

    checkIfLevelAccomplished(visitedObject: GameCreator) {
        const checkIfRowEmpty = (row: number[]) => row.every((item:number) => item === 0)
        const isLevelDone = visitedObject.background.every(checkIfRowEmpty);
        return isLevelDone;
    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number): void {
        if (this.isGameFrozen(visitedObject)) return;
        this.pawnLayerRenderer?.moveBall(visitedObject);
        if (this.checkIfLevelAccomplished(visitedObject)) this.setLevel(visitedObject);
    }
    setVisitorToNextStateOnTick(visitedObject: any, time: number): void {
        if (this.isImmortal) this.lifes = 4;
        if (this.isGameFrozen(visitedObject)) return;
        if (time % 4 === 0){
            if (this.isPlayerMovingLeft)
                this.pawnLayerRenderer!.movePlayerLeft(visitedObject);
            if (this.isPlayerMovingRight)
                this.pawnLayerRenderer!.movePlayerRight(visitedObject);
        }
        
    }
    setGameToNotStarted(visitedObject: GameCreator){
        visitedObject.isGameStarted = false;
    }
    move(visitedObject: any, deltaRow: number, deltaCol: number): void {
        if (deltaCol < 0) {
            this.isPlayerMovingLeft = true;
            return;
        }
        if (deltaCol > 0) {
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
