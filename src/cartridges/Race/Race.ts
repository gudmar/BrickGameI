import { ADD_POINTS, GHOST, START_TIMER, STOP_TIMER } from "../../constants/gameCodes";
import { addToLayer, addToLayerCutIfNotFit } from "../../functions/AddToLayer";
import { replaceWithA } from "../../functions/brickMapLogicFunctions";
import { checkIfLayersOverlap } from "../../functions/colisionDetection";
import { CurtainClearAnimation } from "../../functions/Curtain";
import { range } from "../../functions/range";
import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { getEmptyBoard } from "../constants";
import { setLifesToNextFigure } from "../Functions/setLifesToNextFigure";
import { GameCreator } from "../GameCreator";
import { GamesIntro } from "../GamesIntro/GamesIntro";
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { or } from "../layers/toggle/toggleFunction";
import { CAR } from "./constants";
import { gameEvents, Judge } from "./Judge";
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

const PLAYER_CAR_CORDS_LEFT = { row: 16, col: 5 }
const PLAYER_CAR_CORDS_RIGHT = { row: 16, col: 2 }
enum AnimationTypes {fire, curtain}

class RaceVisitor extends NextStateCalculator implements GameCreatorInterface{

    trackGenerator?: TrackGenerator;
    accelerator?: Accelerator;
    lifes = 4;
    animator!: Animator;
    isAnimating: boolean = false;
    isAccelerating: boolean = false;
    isGhost: boolean = false;
    isCheaterFrozen: boolean = false;
    animationType = AnimationTypes.fire;

    initiate(visitedObject: any): void {
        this.animator = new Animator(this, visitedObject);
        this.isAccelerating = false;
        this.isAnimating = false;
        this.trackGenerator = new TrackGenerator({visitedObject})
        visitedObject.background = this.trackGenerator.next();
        this.lifes = 4;
        this.isAccelerating = false;
        this.isGhost = false;
        this.isCheaterFrozen = false;    
        this.accelerator = new Accelerator(visitedObject, this.trackGenerator)
        this.drawPawnLeft(visitedObject);
        this.animationType = AnimationTypes.fire;
    }

    spaceUp(){
        this.isAccelerating = false;
    }

    drawPawnLeft(visitedObject: GameCreator): void {
        visitedObject.pawnLayer = addToLayer(getEmptyBoard(), CAR, PLAYER_CAR_CORDS_LEFT, or)
        visitedObject.pawnCords = PLAYER_CAR_CORDS_LEFT
    }
    drawPawnRight(visitedObject: GameCreator): void{
        visitedObject.pawnLayer = addToLayer(getEmptyBoard(), CAR, PLAYER_CAR_CORDS_RIGHT, or)
        visitedObject.pawnCords = PLAYER_CAR_CORDS_RIGHT
    }

    passCode(visitedObject: GameCreator, code: string): void {
        console.log(code)
        switch(code){
            case ADD_POINTS: visitedObject.informJudge(gameEvents.CHEATER_MONEY); visitedObject.isCheater = true; break;
            case GHOST: this.isGhost = true; visitedObject.isCheater = true; break;
            case STOP_TIMER: this.isCheaterFrozen = true; visitedObject.isCheater = true; break;
            case START_TIMER: this.isCheaterFrozen = false; break;
        }
    }

    rotate(visitedObject: GameCreator): void {
        if (this.isGameFrozen(visitedObject)) return;
        this.isAccelerating = true;
        this.accelerator?.accelerate();
    }

    pauseGame(visitedObject: GameCreator): void {
        visitedObject.isPaused = !visitedObject.isPaused;
    }

    setLevel(visitedObject: GameCreator): void {
        this.animator.curtain();
    }

    passMessageCarOvertaken(){}

    clean(visitedObject: GameCreator) {
        visitedObject.level = 1
    }

    isGameFrozen(visitedObject: GameCreator){
        return (visitedObject.isGameOver || this.isAnimating || !visitedObject.isGameStarted)
    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number): void {
        if (this.isGameFrozen(visitedObject)) return;
        if (this.isAccelerating) return;
        this.accelerator?.moveCar();
        
    }

    setVisitorToNextStateOnTick(visitedObject: any, time: number): void {
        this.animator.tick();
        if (this.isGameFrozen(visitedObject)) return;
        this.accelerator?.moveTrack();
        // this.accelerator!.isNosOn = false;
        if (this.isAccelerating) this.accelerator?.accelerate();
        this.handleAccident(visitedObject);
    }

    handleAccident(visitedObject: GameCreator){
        if (this.isGhost) return;
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
        if (this.isGameFrozen(visitedObject)) return;
        if (deltaCol === -1) this.drawPawnRight(visitedObject)
        if (deltaCol === 1) this.drawPawnLeft(visitedObject)
        this.handleAccident(visitedObject);
    }
}

const FIRE_ANIMATION_LENGTH = 40;
const CURTAIN_ANIMATION_LENGTH = 40;
const FIRE_SIZE = 5;

class Animator {
    context: RaceVisitor;
    visitedObject: GameCreator;
    curtainInstance?:CurtainClearAnimation;
    animationCounter = 0;
    constructor(context: RaceVisitor, visitedObject: GameCreator) {
        this.context = context;
        this.visitedObject = visitedObject;
    }
    tick(){
        if (this.context.isAnimating) {
            if (this.context.animationType === AnimationTypes.fire) this.tickFire();
            if (this.context.animationType === AnimationTypes.curtain) this.tickCurtain();
        }
    }
    tickFire(){
        this.animationCounter--;
        const fire = this.generateChessboard(FIRE_SIZE, this.animationCounter % 2 === 0)
        this.visitedObject.pawnLayer = addToLayerCutIfNotFit(this.visitedObject.background, fire, findFireStartCords(this.visitedObject), replaceWithA)
        if (this.animationCounter <= 0) {
            this.context.informDeathWrongMove(this.visitedObject);
            this.context.isAnimating = false;
            this.animationCounter = FIRE_ANIMATION_LENGTH;
        }    
    }
    tickCurtain(){
        this.visitedObject.background = this.curtainInstance?.getBackground() as number[][];
        if (this.curtainInstance!.done) {
            this.animationCounter = FIRE_ANIMATION_LENGTH;
            this.context.isAnimating = false;
        }
    }
    accident(){
        this.animationCounter = FIRE_ANIMATION_LENGTH;
        this.context.animationType = AnimationTypes.fire;
        this.context.isAnimating = true;
    }
    curtain(){
        this.animationCounter = CURTAIN_ANIMATION_LENGTH;
        this.context.animationType = AnimationTypes.curtain;
        this.context.isAnimating = true;
        this.curtainInstance = new CurtainClearAnimation(this.visitedObject.background);
    }


    generateChessboard(size: number, startFromZero: boolean){

        return range(size).map((item, index) => 
            index % 2 === 0 ?
            this.generateRow(size, startFromZero):
            this.generateRow(size, !startFromZero))
    }
    generateRow(size: number, startFromZero: boolean) {
        return range(size).map((item, index) => {
            return startFromZero ? 
                index % 2 :
                (index + 1) % 2
        })
    }
}

const findFireStartCords = (visitedObject: GameCreator) => {
    const {row, col} = visitedObject.pawnCords;
    return {row, col: col - 1}
}

const SLOW_CAR_FACTOR = 3;

class Accelerator {
    visitedObject: GameCreator;
    trackGenerator: TrackGenerator;
    accelerationCounter: number = 0;
    constructor(visitedObject:GameCreator, trackGenerator: TrackGenerator) {
        this.visitedObject = visitedObject;
        this.trackGenerator = trackGenerator;
    }
    moveCar(){
        if (this.visitedObject.getCalculatorValue('isCheaterFrozen')) return;
        if (!this.visitedObject.isPaused) this.visitedObject.background = this.trackGenerator!.next();
    }
    moveTrack() {
        if (!this.visitedObject.isPaused) this.visitedObject.background = this.trackGenerator?.moveTrack();
    }
    accelerate() {
        this.accelerationCounter++;
        if (this.visitedObject.isPaused) return;
        if (this.accelerationCounter % SLOW_CAR_FACTOR === 0) this.visitedObject.background = this.trackGenerator!.next();
        this.visitedObject.background = this.trackGenerator?.moveTrack({acceleration: true});
    }
}
