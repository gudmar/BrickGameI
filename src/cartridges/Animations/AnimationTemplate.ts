import { BrickMap, GameLogicArgs } from "../../types/types";
import { GameLogic } from "../AbstractGameLogic";
import { AnimatorSequencersApplier } from "../AnimationSequencer/AnimationSequencer";
import { EMPTY_NEXT_FIGURE, TWO_IN_ONE } from "../constants";

interface Configurationable {
    repetitions: number,
    animators: any[],
}

export class AnimationTemplate extends GameLogic {
    static instance: any;
    public NAME = "SpiraleInside";
    private animationSequencer;
    protected background = TWO_IN_ONE;
    protected sequencerConfigurations: Configurationable[][] = [
        [
            {repetitions: 0, animators: []}
        ]
    ];

    constructor() {
        super();
        this.background = TWO_IN_ONE;
        this.animationSequencer = new AnimatorSequencersApplier({
            background: TWO_IN_ONE,
            sequencerConfigurations: this.sequencerConfigurations,
        })
        console.log('config', this)
        console.dir(AnimationTemplate)
    }

    public getNextStateOnTick(): GameLogicArgs {
        const background = this.animationSequencer?.getNextStateOnTick();
        return { ...this.getTwoInOne(), brickMap: <BrickMap>background }
    }

    getTwoInOne(): GameLogicArgs {
        return {
            score: 0,
            level: 0,
            speed: 0,
            nextFigure: EMPTY_NEXT_FIGURE,
            brickMap: this.background,
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