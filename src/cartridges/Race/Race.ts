import { ADD_POINTS, GHOST, JUGGERNAUT, START_TIMER, STOP_TIMER } from "../../constants/gameCodes";
import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { KeyPress } from "../../types/KeyPress";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { GameCreator } from "../GameCreator";
import { GamesIntro } from "../GamesIntro/GamesIntro";
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { Judge } from "./Judge";

const INTRO_BACKGROUND = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 1, 1, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
];

class GameIntroCloasure{
    constructor() {
        const gameIntro = new GamesIntro(INTRO_BACKGROUND);
        return gameIntro;
    }
}

export class RaceDecorator {
    constructor() {

        const decoratedClass = new GameCreator(
            {
                nextStateCalculator: RaceVisitor,
                judge: Judge,
                afterGameAnimation: AnimationAfterGame,
                beforeGameAnimation: GameIntroCloasure,
            }
        );
        return decoratedClass;
    }
}

class RaceVisitor extends NextStateCalculator implements GameCreatorInterface{


    initiate(visitedObject: any): void {
        
    }

    passCode(visitedObject: GameCreator, code: string): void {
        switch(code){
            case ADD_POINTS: break;
            case JUGGERNAUT: break;
            case GHOST: break;
            case STOP_TIMER: break;
            case START_TIMER: break;
        }
    }

    pauseGame(visitedObject: GameCreator): void {
        
    }

    setLevel(visitedObject: GameCreator): void {
        
    }

    clean(visitedObject: GameCreator) {

    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number): void {
        
    }

    setVisitorToNextStateOnTick(visitedObject: any, time: number): void {
        
    }

    setVisitorToNextStateOnKeyPress(visitedObject: any, keyPresses: KeyPress): void {
        
    }

}
