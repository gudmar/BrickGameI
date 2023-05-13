import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { GameCreator } from "../GameCreator";
import { GamesIntro } from "../GamesIntro/GamesIntro"
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { Judge } from "../Tanks/judge";
import { levels } from "./levels";

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

    initiate(visitedObject: any): void {
        this.setInitialLevel(visitedObject);
    }   
    
    passCode(visitedObject: GameCreator, code: string): void {
        
    }

    rotate(visitedObject: any): void {
        
    }

    pauseGame(visitedObject: GameCreator): void {
        
    }

    setInitialLevel(visitedObject: GameCreator): void {
        // visitedObject.level = 1;
        visitedObject.background = levels[visitedObject.level - 1];
    } 

    setLevel(visitedObject: GameCreator): void {
        visitedObject.level++;
        visitedObject.background = levels[visitedObject.level - 1];
    }

    clean(visitedObject: GameCreator){

    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number): void {
        
    }
    setVisitorToNextStateOnTick(visitedObject: any, time: number): void {
        
    }
    setGameToNotStarted(visitedObject: GameCreator){
        
    }
    move(visitedObject: any, deltaRow: number, deltaCol: number): void {
        
    }
}

