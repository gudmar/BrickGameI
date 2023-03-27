import { BrickMap, GameLogicArgs, ScheaduleProps } from "../../types/types";
import { GameLogic } from "../AbstractGameLogic";
import { AnimationScheaduler } from "../AnimationSequencer/AnimationScheaduler";
import { EMPTY_NEXT_FIGURE, getEmptyBoard, TWO_IN_ONE } from "../constants";
import { BottomTopLeftRight } from "../Animations/BottomTopLeftRight";
import { PauseBlackAnimation } from "../Animations/PauseBlackAnimation";
import { PauseWhiteAnimation } from "../Animations/PauseWhiteAnimation";
import { RandomPixelsAnimation } from "../Animations/RandomPixelsAnimation";
import { SpiralInside } from "../Animations/SpiraleInside";
import { GameCreator } from "../GameCreator";
import { KeyPress } from "../../types/KeyPress";
import { GameCreatorInterface } from "../../types/GameCreatorInterface";

const PAUSE_LONG_REPETITIONS = 5;
const PAUSE_SHORT_REPETITIONS = 2;
const SPIRAL = 400;
const PAUSE_SHORT_DIVIDER = 5;
const PAUSE_LONG_DIVIDER = 10;


const getAnimationClass = (background: BrickMap, enclosedClass:any): any => {
    class GameIntroCloasure{
        constructor() {
            const instance = new enclosedClass(background);
            return instance;
        }
    }
    return GameIntroCloasure;
};

class ScheaduleProvider{
    private background: BrickMap;
    constructor(background: BrickMap){
        this.background = background;
    }

    public getScheadule() {
        return [
            {
                background: this.background,
                repetitions: SPIRAL,
                animationSequencer: getAnimationClass(this.background, SpiralInside),
            },
            {
                background: this.background,
                repetitions: 400,
                animationSequencer: getAnimationClass(this.background, RandomPixelsAnimation),
            },
            {
                background: this.background,
                repetitions: PAUSE_LONG_REPETITIONS,
                animationSequencer: getAnimationClass(this.background, PauseWhiteAnimation),
                tickDivider: PAUSE_LONG_DIVIDER,
            },
            {
                background: this.background,
                repetitions: PAUSE_LONG_REPETITIONS,
                animationSequencer: getAnimationClass(this.background, PauseWhiteAnimation),
                tickDivider: PAUSE_LONG_DIVIDER,
            },
            {
                background: this.background,
                repetitions: PAUSE_LONG_REPETITIONS,
                animationSequencer: getAnimationClass(this.background, PauseBlackAnimation),
                tickDivider: PAUSE_LONG_DIVIDER,
            },
            {
                background: this.background,
                repetitions: PAUSE_LONG_REPETITIONS,
                animationSequencer: getAnimationClass(this.background, PauseWhiteAnimation),
                tickDivider: PAUSE_LONG_DIVIDER,
            },
            {
                background: this.background,
                repetitions: PAUSE_LONG_REPETITIONS,
                animationSequencer: getAnimationClass(this.background, PauseWhiteAnimation),
                tickDivider: PAUSE_LONG_DIVIDER,
            },
            {
                background: this.background,
                repetitions: PAUSE_SHORT_REPETITIONS,
                tickDivider: PAUSE_SHORT_DIVIDER,
                animationSequencer: getAnimationClass(this.background, PauseWhiteAnimation),
            },
            {
                background: this.background,
                repetitions: PAUSE_SHORT_REPETITIONS,
                tickDivider: PAUSE_SHORT_DIVIDER,
                animationSequencer: getAnimationClass(this.background, PauseBlackAnimation),
            },
            {
                background: this.background,
                repetitions: PAUSE_SHORT_REPETITIONS,
                tickDivider: PAUSE_SHORT_DIVIDER,
                animationSequencer: getAnimationClass(this.background, PauseWhiteAnimation),
            },
            {
                background: this.background,
                repetitions: PAUSE_SHORT_REPETITIONS,
                tickDivider: PAUSE_SHORT_DIVIDER,
                animationSequencer: getAnimationClass(this.background, PauseBlackAnimation),
            },
            {
                background: this.background,
                repetitions: PAUSE_SHORT_REPETITIONS,
                tickDivider: PAUSE_SHORT_DIVIDER,
                animationSequencer: getAnimationClass(this.background, PauseWhiteAnimation),
            },
            {
                background: this.background,
                repetitions: PAUSE_SHORT_REPETITIONS,
                tickDivider: PAUSE_SHORT_DIVIDER,
                animationSequencer: getAnimationClass(this.background, PauseBlackAnimation),
            },
            {
                background: this.background,
                repetitions: PAUSE_SHORT_REPETITIONS,
                tickDivider: PAUSE_SHORT_DIVIDER,
                animationSequencer: getAnimationClass(this.background, PauseWhiteAnimation),
            },
            {
                background: this.background,
                repetitions: PAUSE_SHORT_REPETITIONS,
                tickDivider: PAUSE_SHORT_DIVIDER,
                animationSequencer: getAnimationClass(this.background, PauseBlackAnimation),
            },
            {
                background: this.background,
                repetitions: 39,
                animationSequencer: getAnimationClass(this.background, BottomTopLeftRight),
                tickDivider: 10,
            },
        ]
    };
};

export class GamesIntro extends GameLogic implements GameCreatorInterface{

    static instance: any;
    public NAME = "Animations";
    private animationScheaduler:any;
    private scheaduleProvider: ScheaduleProvider | null = null;

    constructor(background: BrickMap) {
        if(GamesIntro.instance) return GamesIntro.instance;
        super();
        this.scheaduleProvider = new ScheaduleProvider(background);
        this.animationScheaduler = new AnimationScheaduler(this.scheaduleProvider.getScheadule())
        GamesIntro.instance = this;
        return this;
    }

    initiate(visitedObject:GameCreator) {
        visitedObject.background = getEmptyBoard();
    }

    passCode(visitedObject:GameCreator, code:string) {}
    setVisitorToNextStateOnSpeedTick(visitedObject:GameCreator, time:number) {}
    restartSpecificAttributes(visitedObject: GameCreator) {}
    rotate(visitedObject: GameCreator) {}
    setLevel(visitedObject: GameCreator) {}
    pauseGame(visitedObject: GameCreator) {}

    setVisitorToNextStateOnTick(visitedObject: GameCreator) {
        const { brickMap } = this.animationScheaduler.getNextStateOnTick();
        visitedObject.pawnLayer = brickMap;
    }
    setVisitorToNextStateOnKeyPress(visitedObject: GameCreator, keyPresses: KeyPress) {
        if (keyPresses === KeyPress.Start) {
            visitedObject.startGame();
        }
    }

    




    // public getNextStateOnTick(): GameLogicArgs {
    //     const nextState = this.animationScheaduler?.getNextStateOnTick();
    //     return nextState;
    // }

    // public getNextStateOnKeyPress(keyPresses: KeyPress): GameLogicArgs {
    //     return this.getEmptyGameLogicArgs();
    // }

    // getTwoInOne(): GameLogicArgs {
    //     return {
    //         score: 0,
    //         level: 1,
    //         speed: 1,
    //         nextFigure: EMPTY_NEXT_FIGURE,
    //         brickMap: TWO_IN_ONE,
    //         isPaused: false,
    //         isAnimating: false,
    //     }
    // }

    // protected getEmptyGameLogicArgs():GameLogicArgs {
    //     return {
    //         score:this.score, 
    //         level: this.level, 
    //         speed: this.speed, 
    //         nextFigure : this.EMPTY_FIELD_CONTENT,
    //         brickMap: this.EMPRY_BRICK_COORDINANTES,
    //         isPaused: false,
    //         isAnimating: false,
    //     }
    // }
}