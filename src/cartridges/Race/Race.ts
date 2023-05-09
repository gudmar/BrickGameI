import { ADD_POINTS, GHOST, JUGGERNAUT, START_TIMER, STOP_TIMER } from "../../constants/gameCodes";
import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { KeyPress } from "../../types/KeyPress";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { GameCreator } from "../GameCreator";
import { GamesIntro } from "../GamesIntro/GamesIntro";
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { Judge } from "./Judge";
import { TrackGenerator } from "./TrackBlueprintGenerator";

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

    trackGenerator?: TrackGenerator;

    // constructor(visitedObject: GameCreator) {
    //     super();
        
    // }

    initiate(visitedObject: any): void {
        this.trackGenerator = new TrackGenerator({visitedObject})
        visitedObject.background = this.trackGenerator.next();
        visitedObject.level = 9
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
        visitedObject.isPaused = !visitedObject.isPaused;
    }

    setLevel(visitedObject: GameCreator): void {
        
    }

    clean(visitedObject: GameCreator) {

    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number): void {
        visitedObject.background = this.trackGenerator!.next();
    }

    setVisitorToNextStateOnTick(visitedObject: any, time: number): void {
        if (visitedObject.isPaused) return;
        visitedObject.background = this.trackGenerator?.moveTrack()
    }
}
