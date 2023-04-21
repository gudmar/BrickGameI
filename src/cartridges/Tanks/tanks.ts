import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { directions, Variants } from "../../types/types";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { getEmptyBoard } from "../constants";
import { GameCreator } from "../GameCreator";
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { GameIntroCloasure } from "./IntroGameCloasure";
import { Judge } from "./judge";
import { Tank } from "./tank";
import { TankCommander } from "./tankCommander";
import { getLayerWithAllPlacedTanks, mergeAllPlacedTanks } from "./tankUtils";



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

const INITIAL_PLAYER_TANK_CORDS = {col: 8, row: 18};

class TankVisitor extends NextStateCalculator implements GameCreatorInterface{
    MAX_ENEMY_TANKS_NUMBER = 3;
    playerTank: Tank | undefined;// = new Tank(Variants.PLAYER, INITIAL_PLAYER_TANK_CORDS);
    // enemyTanksList = getLayerWithAllTanks();
    enemyTanksLayer = getEmptyBoard(); // = getLayerWithAllPlacedTanks(this.playerTank);
    playerBullets = [];
    enemyBullets = [];
    PLAYER_TANK_PLACE_CORDS = {col: 8, row: 18}
    enemyTankCommanders:any[]|undefined;

    // enemyTankCommanders = TankCommander.createCommanders(3);

    // getInitialListOfEnemyTanks(){
    //     const tankList = [];
    //     for(let i = 0; i < this.MAX_ENEMY_TANKS_NUMBER; i++){
    //         tankList.push(new Tank())
    //     }
    //     return tankList;
    // }
    initiate(visitedObject: GameCreator) {
        this.clean(visitedObject);
        this.playerTank = new Tank(Variants.PLAYER, INITIAL_PLAYER_TANK_CORDS);
        this.enemyTanksLayer = getLayerWithAllPlacedTanks(this.playerTank);
        this.enemyTankCommanders = TankCommander.createCommanders(visitedObject, 3);
        visitedObject.name = 'Tanks';
        visitedObject.isCheater = false;
        visitedObject.score = 0;
        this.reInitiateGame(visitedObject);
        // console.log('Tank initiation', Tank.instances)
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
        visitedObject.pawnLayer = mergeAllPlacedTanks(visitedObject.background);
    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number): void {
        this.enemyTankCommanders?.forEach((commander) => {
            commander.makeMove();
        })
    }

    moveEachEnemyTank(){}

    passCode(visitedObject: GameCreator, code: string): void {
        
    };
    setLevel(visitedObject: GameCreator): void {
        visitedObject.pawnLayer = getEmptyBoard();
    };
    pauseGame(visitedObject: GameCreator): void {
        
    }

}
