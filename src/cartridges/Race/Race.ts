import { ADD_POINTS, GHOST, JUGGERNAUT, START_TIMER, STOP_TIMER } from "../../constants/gameCodes";
import { addToLayer } from "../../functions/AddToLayer";
import { checkIfLayersOverlap } from "../../functions/colisionDetection";
import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { KeyPress } from "../../types/KeyPress";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { getEmptyBoard } from "../constants";
import { setLifesToNextFigure } from "../Functions/setLifesToNextFigure";
import { GameCreator } from "../GameCreator";
import { GamesIntro } from "../GamesIntro/GamesIntro";
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { or } from "../layers/toggle/toggleFunction";
import { CAR } from "./constants";
import { Judge } from "./Judge";
import { Sites, TrackGenerator } from "./TrackBlueprintGenerator";

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

const PLAYER_CAR_CORDS_LEFT = { row: 16, col: 5 }
const PLAYER_CAR_CORDS_RIGHT = { row: 16, col: 2 }

class RaceVisitor extends NextStateCalculator implements GameCreatorInterface{

    trackGenerator?: TrackGenerator;
    accelerator?: Accelerator;
    lifes = 4;
    animator!: Animator;
    isAnimating: boolean = false;
    // pawnSide: Sites = Sites.RIGHT;

    // constructor(visitedObject: GameCreator) {
    //     super();
        
    // }

    initiate(visitedObject: any): void {
        this.animator = new Animator(this, visitedObject);
        this.isAnimating = false;
        this.trackGenerator = new TrackGenerator({visitedObject})
        visitedObject.background = this.trackGenerator.next();
        visitedObject.level = 9
        this.accelerator = new Accelerator(visitedObject, this.trackGenerator)
        this.drawPawnLeft(visitedObject);
    }

    drawPawnLeft(visitedObject: GameCreator): void {
        visitedObject.pawnLayer = addToLayer(getEmptyBoard(), CAR, PLAYER_CAR_CORDS_LEFT, or)
    }
    drawPawnRight(visitedObject: GameCreator): void{
        visitedObject.pawnLayer = addToLayer(getEmptyBoard(), CAR, PLAYER_CAR_CORDS_RIGHT, or)
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

    isGameFrozen(visitedObject: GameCreator){
        return (visitedObject.isGameOver || this.isAnimating || !visitedObject.isGameStarted)
    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number): void {
        if (this.isGameFrozen(visitedObject)) return;
        this.accelerator?.moveCar();
        
    }

    setVisitorToNextStateOnTick(visitedObject: any, time: number): void {
        if (this.isGameFrozen(visitedObject)) return;
        this.accelerator?.moveTrack();
        this.accelerator!.isNosOn = false;
        this.handleAccident(visitedObject);
    }

    handleAccident(visitedObject: GameCreator){
        const isAccident = checkIfLayersOverlap(visitedObject.background, visitedObject.pawnLayer);
        if (isAccident) this.animator.accident()
    }

    informDeathWrongMove(visitedObject:GameCreator){
        this.lifes--;
        setLifesToNextFigure(this, visitedObject);
        if (this.lifes === 0) {
            visitedObject.isGameOver = true;
            visitedObject.gameLost();
        } else {
            this.setGameToNotStarted(visitedObject)
        }
    }

    setGameToNotStarted(visitedObject: GameCreator){
        this.initiate(visitedObject);
        visitedObject.isGameStarted = false;
    }


    move(visitedObject: GameCreator, deltaRow:number, deltaCol:number) {
        if (deltaCol === -1) this.drawPawnRight(visitedObject)
        if (deltaCol === 1) this.drawPawnLeft(visitedObject)
        this.handleAccident(visitedObject);
    }
}

class Animator {
    context: RaceVisitor;
    visitedObject: GameCreator;
    constructor(context: RaceVisitor, visitedObject: GameCreator) {
        this.context = context;
        this.visitedObject = visitedObject;
    }
    accident(){
        this.context.isAnimating = true;
        this.context.informDeathWrongMove(this.visitedObject);
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
