import { START_TIMER, STOP_TIMER } from "../../constants/gameCodes";
import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { directions, Variants } from "../../types/types";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { getEmptyBoard } from "../constants";
import { GameCreator } from "../GameCreator";
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { Bullet } from "./bullet";
import { GameIntroCloasure } from "./IntroGameCloasure";
import { Judge } from "./judge";
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

class TankVisitor extends NextStateCalculator implements GameCreatorInterface{
    MAX_ENEMY_TANKS_NUMBER = 3;
    playerTank: Tank | undefined;
    enemyTanksLayer = getEmptyBoard();
    playerBullets = [];
    enemyBullets = [];
    enemyTankCommanders:any[]|undefined;

    initiate(visitedObject: GameCreator) {
        this.clean(visitedObject);
        this.playerTank = new Tank(Variants.PLAYER, INITIAL_PLAYER_TANK_CORDS);
        this.enemyTanksLayer = getLayerWithAllPlacedTanks(this.playerTank);
        this.enemyTankCommanders = TankCommander.createCommanders(visitedObject, 3);
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

    restartSpecificAttributes(visitedObject:any){
        Tank.instances = [];
        TankCommander.instances = [];
        this.setLevel(visitedObject.level)
    }

    move(visitedObject:GameCreator, deltaRow: number, deltaCol: number) {
        const direction = this.getMoveDirection(deltaRow, deltaCol);
        console.log('Tanks, move', direction)
        this.playerTank!.move(visitedObject, direction);
    }

    rotate(visitedObject: GameCreator) {
        // NOT needed
        this.playerTank!.shot(visitedObject)
    }

    reInitiateGame(visitedObject:GameCreator) {
        visitedObject.background = getEmptyBoard();
        this.setLevel(visitedObject);
        this.placePlayerTank(visitedObject);
        this.enemyTankCommanders!.forEach((commander) => {
            commander.tryPlacing();
        })
    }

    placePlayerTank(visitedObject: GameCreator) {
        this.playerTank!.cords = INITIAL_PLAYER_TANK_CORDS;
        this.playerTank!.setInitialTank();
    }

    clean(visitedObject: GameCreator) {
        Tank.instances = [];
        TankCommander.instances = [];
        visitedObject.background = getEmptyBoard();
        visitedObject.pawnLayer = getEmptyBoard();
    }

    setVisitorToNextStateOnTick(visitedObject:GameCreator, time: number) {
        // visitedObject.pawnLayer = mergeAllPlacedTanks(visitedObject.background);
        visitedObject.pawnLayer = getMergedLayerWithTanksAndBullets(visitedObject.background);
        Bullet.moveAllBullets(visitedObject);
    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number): void {
        this.enemyTankCommanders?.forEach((commander) => {
            commander.makeMove();
        })
    }

    moveEachEnemyTank(){}

    passCode(visitedObject: GameCreator, code: string): void {
        if (code === STOP_TIMER) console.log(Tank.instances)
        if (code === START_TIMER) console.log(Bullet.instances)
    };
    setLevel(visitedObject: GameCreator): void {
        console.log(visitedObject.level)
        visitedObject.background = getTankLevelBoard(visitedObject.level);
    };
    pauseGame(visitedObject: GameCreator): void {
    }

}
