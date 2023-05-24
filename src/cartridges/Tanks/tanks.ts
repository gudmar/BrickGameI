import { ADD_POINTS, STOP_TIMER } from "../../constants/gameCodes";
import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { directions, Variants } from "../../types/types";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { getEmptyBoard } from "../constants";
import { setLifesToNextFigure } from "../Functions/setLifesToNextFigure";
import { GameCreator } from "../GameCreator";
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { AnimatorOfDestruction } from "./animatorOfDestruction";
import { Bullet } from "./bullet";
import { GameIntroCloasure } from "./IntroGameCloasure";
import { gameEvents, Judge } from "./judge";
import { getTankLevelBoard } from "./levels";
import { Tank } from "./tank";
import { TankCommander } from "./tankCommander";
import { getLayerWithAllPlacedTanks, getMergedLayerWithTanksAndBullets } from "./tankUtils";



export class TankDecorator {
    constructor() {
        const decoratedClass = new GameCreator(
            {
                nextStateCalculator: TankVisitor,
                judge: Judge,
                afterGameAnimation: AnimationAfterGame,
                beforeGameAnimation: GameIntroCloasure,
            }
        )
        return decoratedClass;
    }
}

const INITIAL_PLAYER_TANK_CORDS = {col: 4, row: 13}

export class TankVisitor extends NextStateCalculator implements GameCreatorInterface{
    MAX_ENEMY_TANKS_NUMBER = 3;
    playerTank: Tank | undefined;
    enemyTanksLayer = getEmptyBoard();
    playerBullets = [];
    enemyBullets = [];
    enemyTankCommanders:any[]|undefined;
    lifes = 4;
    judge = new Judge();
    isAnimating = false;
    animatorOfDestruction?: AnimatorOfDestruction;

    isMoveLeft = false;
    isMoveRight = false;
    isMoveUp = false;
    isMoveDown = false;

    get playerTankCords() {
        const playerTank = Tank.instances.find(tank => tank.variant === Variants.PLAYER);
        const { row, col } = playerTank!.cords;
        return {row, col };
    }

    initiate(visitedObject: GameCreator) {
        // visitedObject.lifes = this.lifes;
        // visitedObject.reInitilateGame = this.reInitiateGame;
        this.animatorOfDestruction = new AnimatorOfDestruction(visitedObject, this);
        this.clean(visitedObject);
        this.playerTank = new Tank(Variants.PLAYER, INITIAL_PLAYER_TANK_CORDS, this);
        this.enemyTanksLayer = getLayerWithAllPlacedTanks(this.playerTank);
        this.enemyTankCommanders = TankCommander.createCommanders(visitedObject, 3, this);
        visitedObject.name = 'Tanks';
        visitedObject.isCheater = false;
        visitedObject.score = 0;
        this.reInitiateGame(visitedObject);
        this.setLevel(visitedObject)
    }

    getMoveDirection(deltaRow:number, deltaCol: number) {
        if (deltaRow > 0) return directions.DOWN;
        if (deltaRow < 0) return directions.UP;
        if (deltaCol > 0) return directions.RIGHT;
        if (deltaCol < 0) return directions.LEFT;
        return directions.STALE;
    }

    startLeft(visitedObject: any): void {this.isMoveLeft = true}
    stopLeft(visitedObject: any): void {this.isMoveLeft = false}
    startRight(visitedObject: any): void {this.isMoveRight = true;}
    stopRight(visitedObject: any): void {this.isMoveRight = false;}
    startUp(visitedObject: any): void {this.isMoveUp = true;}
    stopUp(visitedObject: any): void {this.isMoveUp = false;}
    startDown(visitedObject: any): void {this.isMoveDown = true;}
    stopDown(visitedObject: any): void {this.isMoveDown = false;}

    moveOnTick(visitedObject: GameCreator, time: number) {
        const MOVE_TIME_DIVIDER = 4;
        const shouldMove = time % MOVE_TIME_DIVIDER === 0;
        if (this.isMoveDown && shouldMove) this.move(visitedObject, 1, 0);
        if (this.isMoveLeft && shouldMove) this.move(visitedObject, 0, -1);
        if (this.isMoveRight && shouldMove) this.move(visitedObject, 0, 1);
        if (this.isMoveUp && shouldMove) this.move(visitedObject, -1, 0);
    }

    restartSpecificAttributes(visitedObject:any){
        Tank.instances = [];
        TankCommander.instances = [];
        this.setLevel(visitedObject.level)
    }

    move(visitedObject:GameCreator, deltaRow: number, deltaCol: number) {
        const direction = this.getMoveDirection(deltaRow, deltaCol);
        this.playerTank!.move(visitedObject, direction);
    }

    rotate(visitedObject: GameCreator) {
        // NOT needed
        this.playerTank!.shot(visitedObject)
    }

    reInitiateGame(visitedObject:GameCreator) {
        if (this.lifes < 0) {
            visitedObject.isGameOver = true;
            visitedObject.gameLost();
        }
        visitedObject.background = getEmptyBoard();
        this.setLevel(visitedObject);
        setLifesToNextFigure(this, visitedObject);
        Tank.instances.forEach((tank) => tank.isPlacedOnBoard = false)
        this.placePlayerTank(visitedObject);
        this.enemyTankCommanders!.forEach((commander) => {
            commander.tryPlacing();
        })
    }

    placePlayerTank(visitedObject: GameCreator) {
        this.playerTank!.cords = INITIAL_PLAYER_TANK_CORDS;
        this.playerTank!.setInitialTank();
        this.playerTank!.isPlacedOnBoard = true;
    }

    clean(visitedObject: GameCreator) {
        Tank.instances = [];
        TankCommander.instances = [];
        visitedObject.background = getEmptyBoard();
        visitedObject.pawnLayer = getEmptyBoard();
    }

    setVisitorToNextStateOnTick(visitedObject:GameCreator, time: number) {
        this.moveOnTick(visitedObject, time);
        if (visitedObject.isAnimating) {
            this.animatorOfDestruction!.tick();
            return;
        }

        visitedObject.pawnLayer = getMergedLayerWithTanksAndBullets(visitedObject.background);
        Bullet.moveAllBullets(this, visitedObject);
    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number): void {
        this.enemyTankCommanders?.forEach((commander) => {
            commander.makeMove();
        })
        Tank.tryDeleteCheetFlag();
    }

    moveEachEnemyTank(){}

    passCode(visitedObject: GameCreator, code: string): void {
        if (code === STOP_TIMER) {
            Tank.temporaryFreezeEnemyTanks = true;
            visitedObject.isCheater = true;
        }
        if (code === ADD_POINTS) {
            this.judge.inform(visitedObject, gameEvents.CHEATER_MONEY)
            visitedObject.isCheater = true;
        }
    };
    setLevel(visitedObject: GameCreator): void {
        visitedObject.background = getTankLevelBoard(visitedObject.level);
    };
    pauseGame(visitedObject: GameCreator): void {
    }

}
