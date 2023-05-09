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
    accelerator?: Accelerator;

    // constructor(visitedObject: GameCreator) {
    //     super();
        
    // }

    initiate(visitedObject: any): void {
        this.trackGenerator = new TrackGenerator({visitedObject})
        visitedObject.background = this.trackGenerator.next();
        visitedObject.level = 9
        this.accelerator = new Accelerator(visitedObject, this.trackGenerator)
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

    rotate(visitedObject: GameCreator): void {
        this.accelerator?.accelerate();
    }

    pauseGame(visitedObject: GameCreator): void {
        visitedObject.isPaused = !visitedObject.isPaused;
    }

    setLevel(visitedObject: GameCreator): void {
        
    }

    clean(visitedObject: GameCreator) {

    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number): void {
        this.accelerator?.moveCar()
    }

    setVisitorToNextStateOnTick(visitedObject: any, time: number): void {
        this.accelerator?.moveTrack();
        this.accelerator!.isNosOn = false;
    }
}

const SLOW_CAR_FACTOR = 3;

class Accelerator {
    isNosOn = false;
    visitedObject: GameCreator;
    trackGenerator: TrackGenerator;
    accelerationCounter: number = 0;
    constructor(visitedObject:GameCreator, trackGenerator: TrackGenerator) {
        this.visitedObject = visitedObject;
        this.trackGenerator = trackGenerator;
    }
    moveCar(){
        if (!this.isNosOn && !this.visitedObject.isPaused) this.visitedObject.background = this.trackGenerator!.next();
    }
    moveTrack() {
        if (!this.isNosOn && !this.visitedObject.isPaused) this.visitedObject.background = this.trackGenerator?.moveTrack();
    }
    accelerate() {
        this.accelerationCounter++;
        if (this.visitedObject.isPaused) return;
        this.isNosOn = true;
        if (this.accelerationCounter % SLOW_CAR_FACTOR === 0) this.visitedObject.background = this.trackGenerator!.next();
        this.visitedObject.background = this.trackGenerator?.moveTrack({acceleration: true});
    }
}
