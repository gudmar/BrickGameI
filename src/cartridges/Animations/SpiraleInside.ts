import { BrickMap, GameLogicArgs, KeyPress } from "../../types/types";
import { GameLogic, getNextFigureOfSymbols, getDojoOfSymbols } from "../AbstractGameLogic";
import { EMPTY_NEXT_FIGURE, TWO_IN_ONE } from "../constants";
import { AnimatorSequencersApplier } from "../AnimationSequencer/AnimationSequencer";
import { SpiralInsideToggle } from "../layers/toggle/SpiralInsideToggle";

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
    [
        {
            animators: [SpiralInsideToggle],
            repetitions: 200,
        },
    ],
]

export class SpiralInside extends GameLogic {
    static instance: any;
    public NAME = "SpiraleInside";
    private animationSequencer;

    constructor() {
        if(SpiralInside.instance) return SpiralInside.instance;
        super();
        this.animationSequencer = new AnimatorSequencersApplier({
            background: TWO_IN_ONE,
            sequencerConfigurations,
        })
        SpiralInside.instance = this;
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