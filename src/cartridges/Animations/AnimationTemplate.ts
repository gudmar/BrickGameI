import { BrickMap, GameLogicArgs } from "../../types/types";
import { GameLogic } from "../AbstractGameLogic";
import { AnimatorSequencersApplier } from "../AnimationSequencer/AnimationSequencer";
import { EMPTY_NEXT_FIGURE, EMPTY_BOARD } from "../constants";

interface Configurationable {
    repetitions: number,
    animators: any[],
}

export class AnimationTemplate extends GameLogic {
    static instance: any;
    protected animationSequencer;
    protected background = EMPTY_BOARD;
    protected sequencerConfigurations: Configurationable[][] = [
        [
            {repetitions: 0, animators: []}
        ]
    ];

    constructor() {
        super();
        this.background = EMPTY_BOARD;
        this.animationSequencer = new AnimatorSequencersApplier({
            background: EMPTY_BOARD,
            sequencerConfigurations: this.sequencerConfigurations,
        })
    }

    public getNextStateOnTick(): GameLogicArgs {
        const background = this.animationSequencer?.getNextStateOnTick();
        
        return { ...this.getTwoInOne(), brickMap: <BrickMap>background }
    }

    getTwoInOne(): GameLogicArgs {
        return {
            score: 0,
            level: 1,
            speed: 1,
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