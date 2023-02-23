import { GameLogicArgs, KeyPress, ScheaduleProps } from "../../types/types";
import { GameLogic } from "../AbstractGameLogic";
import { AnimationScheaduler } from "../AnimationSequencer/AnimationScheaduler";
import { EMPTY_NEXT_FIGURE, TWO_IN_ONE } from "../constants";
import { BottomTopLeftRight } from "./BottomTopLeftRight";
import { PauseBlackAnimation } from "./PauseBlackAnimation";
import { PauseWhiteAnimation } from "./PauseWhiteAnimation";
import { SpiralInside } from "./SpiraleInside";

const PAUSE_LONG = 5;
const PAUSE_SHORT = 2;
const SPIRAL = 200;

const __________scheadule: ScheaduleProps[] = [
    // {
    //     background: TWO_IN_ONE,
    //     repetitions: SPIRAL,
    //     animationSequencer: SpiralInside,
    // },
    // {
    //     background: TWO_IN_ONE,
    //     repetitions: 39,
    //     animationSequencer: BottomTopLeftRight,
    // },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_LONG,
        animationSequencer: PauseWhiteAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_LONG,
        animationSequencer: PauseBlackAnimation,
    },
]

const scheadule: ScheaduleProps[] = [
    {
        background: TWO_IN_ONE,
        repetitions: SPIRAL,
        animationSequencer: SpiralInside,
    },
    {
        background: TWO_IN_ONE,
        repetitions: 39,
        animationSequencer: BottomTopLeftRight,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_LONG,
        animationSequencer: PauseWhiteAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_LONG,
        animationSequencer: PauseBlackAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_LONG,
        animationSequencer: PauseWhiteAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_LONG,
        animationSequencer: PauseBlackAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_SHORT,
        animationSequencer: PauseWhiteAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_SHORT,
        animationSequencer: PauseBlackAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_SHORT,
        animationSequencer: PauseWhiteAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_SHORT,
        animationSequencer: PauseBlackAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_SHORT,
        animationSequencer: PauseWhiteAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_SHORT,
        animationSequencer: PauseBlackAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_SHORT,
        animationSequencer: PauseWhiteAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: PAUSE_SHORT,
        animationSequencer: PauseBlackAnimation,
    },
    {
        background: TWO_IN_ONE,
        repetitions: SPIRAL,
        animationSequencer: SpiralInside,
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
            level: 0,
            speed: 0,
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