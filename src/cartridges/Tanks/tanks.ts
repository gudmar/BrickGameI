import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { GameCreator } from "../GameCreator";
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { GameIntroCloasure } from "../snake/GameIntroCloasure";
import { Judge, gameEvents } from "./judge";
import { getLayerWithAllTanks, Tank, variants } from "./tank";



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
    playerTank: Tank = new Tank(variants.PLAYER, INITIAL_PLAYER_TANK_CORDS);
    // enemyTanksList = getLayerWithAllTanks();
    enymyTanksLayer = getLayerWithAllTanks(this.playerTank);
    playerBullets = [];
    enemyBullets = [];

    // getInitialListOfEnemyTanks(){
    //     const tankList = [];
    //     for(let i = 0; i < this.MAX_ENEMY_TANKS_NUMBER; i++){
    //         tankList.push(new Tank())
    //     }
    //     return tankList;
    // }

    passCode(visitedObject: GameCreator, code: string): void {
        
    };
    setLevel(visitedObject: GameCreator): void {
        
    };
    pauseGame(visitedObject: GameCreator): void {
        
    }

}
