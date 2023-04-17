import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { Variants } from "../../types/types";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { getEmptyBoard } from "../constants";
import { GameCreator } from "../GameCreator";
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { GameIntroCloasure } from "./IntroGameCloasure";
import { Judge } from "./judge";
import { getLayerWithAllPlacedTanks, mergeAllPlacedTanks, Tank } from "./tank";
import { TankCommander } from "./tankCommander";



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
    playerTank: Tank = new Tank(Variants.PLAYER, INITIAL_PLAYER_TANK_CORDS);
    // enemyTanksList = getLayerWithAllTanks();
    enemyTanksLayer = getLayerWithAllPlacedTanks(this.playerTank);
    playerBullets = [];
    enemyBullets = [];
    PLAYER_TANK_PLACE_CORDS = {col: 8, row: 18}
    enemyTankCommanders:any[]|undefined;

    notNeededCounter = 0;
    notNeededInvocation = this.iAmCalledTooManyTimes();

    iAmCalledTooManyTimes() {
        this.notNeededCounter++;
        console.log('I am called ' + this.notNeededCounter + ' times')
        return this.notNeededCounter;
    }
    // enemyTankCommanders = TankCommander.createCommanders(3);

    // getInitialListOfEnemyTanks(){
    //     const tankList = [];
    //     for(let i = 0; i < this.MAX_ENEMY_TANKS_NUMBER; i++){
    //         tankList.push(new Tank())
    //     }
    //     return tankList;
    // }
    initiate(visitedObject: GameCreator) {
        this.enemyTankCommanders = TankCommander.createCommanders(3);
        visitedObject.name = 'Tanks';
        visitedObject.isCheater = false;
        visitedObject.score = 0;
        this.reInitiateGame(visitedObject);
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
        this.playerTank.cords = INITIAL_PLAYER_TANK_CORDS;
        this.playerTank.setInitialTank();
    }

    clean(visitedObject: GameCreator) {
        visitedObject.background = getEmptyBoard();
        visitedObject.pawnLayer = getEmptyBoard();
    }

    setVisitorToNextStateOnTick(visitedObject:GameCreator, time: number) {
        visitedObject.pawnLayer = mergeAllPlacedTanks(visitedObject.background);
    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number): void {
        
    }

    moveEachEnemyTank(){}

    passCode(visitedObject: GameCreator, code: string): void {
        
    };
    setLevel(visitedObject: GameCreator): void {
        
    };
    pauseGame(visitedObject: GameCreator): void {
        
    }

}
