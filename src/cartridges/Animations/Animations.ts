import { GameLogicArgs, KeyPress, ScheaduleProps } from "../../types/types";
import { GameLogic } from "../AbstractGameLogic";
import { AnimationScheaduler } from "../AnimationSequencer/AnimationScheaduler";
import { EMPTY_NEXT_FIGURE, TWO_IN_ONE } from "../constants";
import { BottomTopLeftRight } from "./BottomTopLeftRight";
import { PauseBlackAnimation } from "./PauseBlackAnimation";
import { PauseWhiteAnimation } from "./PauseWhiteAnimation";
import { RandomPixelsAnimation } from "./RandomPixelsAnimation";
import { SpiralInside } from "./SpiraleInside";

const PAUSE_LONG_REPETITIONS = 5;
const PAUSE_SHORT_REPETITIONS = 2;
const SPIRAL = 400;
const PAUSE_SHORT_DIVIDER = 5;
const PAUSE_LONG_DIVIDER = 10;

const scheadule: ScheaduleProps[] = [
    {
        background: TWO_IN_ONE,
        repetitions: SPIRAL,
        animationSequencer: SpiralInside,
    },
    {
        background: TWO_IN_ONE,
        repetitions: 400,
        animationSequencer: RandomPixelsAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_LONG_REPETITIONS,
        animationSequencer: PauseWhiteAnimation,
        tickDivider: PAUSE_LONG_DIVIDER,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_LONG_REPETITIONS,
        animationSequencer: PauseWhiteAnimation,
        tickDivider: PAUSE_LONG_DIVIDER,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_LONG_REPETITIONS,
        animationSequencer: PauseBlackAnimation,
        tickDivider: PAUSE_LONG_DIVIDER,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_LONG_REPETITIONS,
        animationSequencer: PauseWhiteAnimation,
        tickDivider: PAUSE_LONG_DIVIDER,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_LONG_REPETITIONS,
        animationSequencer: PauseBlackAnimation,
        tickDivider: PAUSE_LONG_DIVIDER,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_SHORT_REPETITIONS,
        tickDivider: PAUSE_SHORT_DIVIDER,
        animationSequencer: PauseWhiteAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_SHORT_REPETITIONS,
        tickDivider: PAUSE_SHORT_DIVIDER,
        animationSequencer: PauseBlackAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_SHORT_REPETITIONS,
        tickDivider: PAUSE_SHORT_DIVIDER,
        animationSequencer: PauseWhiteAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_SHORT_REPETITIONS,
        tickDivider: PAUSE_SHORT_DIVIDER,
        animationSequencer: PauseBlackAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_SHORT_REPETITIONS,
        tickDivider: PAUSE_SHORT_DIVIDER,
        animationSequencer: PauseWhiteAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_SHORT_REPETITIONS,
        tickDivider: PAUSE_SHORT_DIVIDER,
        animationSequencer: PauseBlackAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_SHORT_REPETITIONS,
        tickDivider: PAUSE_SHORT_DIVIDER,
        animationSequencer: PauseWhiteAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_SHORT_REPETITIONS,
        tickDivider: PAUSE_SHORT_DIVIDER,
        animationSequencer: PauseBlackAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: 39,
        animationSequencer: BottomTopLeftRight,
        tickDivider: 10,
    },
]

export class Animations extends GameLogic{

    static instance: any;
    public NAME = "Animations";
    private animationScheaduler:any;

    constructor() {
        if(Animations.instance) return Animations.instance;
        super();
        this.animationScheaduler = new AnimationScheaduler(scheadule)
        Animations.instance = this;
        return this;
    }

    public getNextStateOnTick(): GameLogicArgs {
        const nextState = this.animationScheaduler?.getNextStateOnTick();
        return nextState;
    }

    public getNextStateOnKeyPress(keyPresses: KeyPress): GameLogicArgs {
        return this.getEmptyGameLogicArgs();
    }

    getTwoInOne(): GameLogicArgs {
        return {
            score: 0,
            level: 1,
            speed: 1,
            nextFigure: EMPTY_NEXT_FIGURE,
            brickMap: TWO_IN_ONE,
            isPaused: false,
            isAnimating: false,
        }
    }

    protected getEmptyGameLogicArgs():GameLogicArgs {
        return {
            score:this.score, 
            level: this.level, 
            speed: this.speed, 
            nextFigure : this.EMPTY_FIELD_CONTENT,
            brickMap: this.EMPRY_BRICK_COORDINANTES,
            isPaused: false,
            isAnimating: false,
        }
    }
}