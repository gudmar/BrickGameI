import { BrickMap, GameLogicArgs, KeyPress } from "../../types/types";
import { GameLogic, getNextFigureOfSymbols, getDojoOfSymbols } from "../AbstractGameLogic";
import { EMPTY_NEXT_FIGURE, TWO_IN_ONE } from "../constants";
import { AnimatorSequencersApplier } from "../AnimationSequencer/AnimationSequencer";
import { BarDownLayer } from "../layers/BarDownLayer";
import { BarUpLayer } from "../layers/BarUpLayer";
import { BarRightLayer } from "../layers/BarRightLayer";
import { BarLeftLayer } from "../layers/BarLeftLayer";
import { BarDownToggleLayer } from "../layers/toggle/BarDownToggleLayer";
import { BarUpToggleLayer } from "../layers/toggle/BarUpToggleLayer";
import { BarLeftToggleLayer } from "../layers/toggle/BarLeftToggleLayer";
import { BarRightToggleLayer } from "../layers/toggle/BarRightToggleLayer";
import { BarLeftRightLayer } from "../layers/toggle/BarLeftRightLayer";
import { BarDownUpLayer } from "../layers/toggle/BarDownUpLayer";

const getEmptyGameLogic = (): GameLogicArgs => (
    {
        score: 0,
        level: 0,
        speed: 0,
        nextFigure : getNextFigureOfSymbols(0),
        brickMap: getDojoOfSymbols(0),
        isPaused: false,
        isAnimating: false,
    }
)

const sequencerConfigurations = [
    // [
    //     {
    //         animators: [BarLeftToggleLayer],
    //         repetitions: 10,
    //     },
    //     {
    //         animators: [BarRightToggleLayer],
    //         repetitions: 10,
    //     },
    // ],
    // [
    //     {
    //         animators: [BarDownToggleLayer],
    //         repetitions: 20,
    //     },
    //     {
    //         animators: [BarUpToggleLayer],
    //         repetitions: 20,
    //     },
    // ],

    [
        {
            animators: [BarLeftRightLayer],
            repetitions: 20,
        },
    ],
    [
        {
            animators: [BarDownUpLayer],
            repetitions: 40,
        },
    ]
]

export class Animations extends GameLogic {
    static instance: any;
    public NAME = "Animations";
    private animationSequencer;

    constructor() {
        if(Animations.instance) return Animations.instance;
        super();
        this.animationSequencer = new AnimatorSequencersApplier({
            background: TWO_IN_ONE,
            sequencerConfigurations,
        })
        Animations.instance = this;
        return this;
    }

    public getNextStateOnTick(): GameLogicArgs {
        const background = this.animationSequencer?.getNextStateOnTick();
        return { ...this.getTwoInOne(), brickMap: <BrickMap>background }
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