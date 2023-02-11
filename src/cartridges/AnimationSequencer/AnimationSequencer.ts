import { BrickMap } from "../../types/types";
import { AbstractLayerBuilder } from "../layers/abstractLayer";

export interface SequencerConfiguration {
    animators: any[],
    repetitions: number,
}

export interface SequencerParams {
    configuration: SequencerConfiguration[],
    // background: BrickMap
}

interface SingleSequencerParams {
    // background: BrickMap,
    animators: any,
    repetitions: number,
}

interface AnimatorSequencersApplierParams {
    background: BrickMap,
    sequencerConfigurations: SequencerConfiguration[][]
}

export class Animator extends AbstractLayerBuilder {
    private animators;
    constructor(animators: any[]) {
        super();
        this.animators = animators.map(animator => {
            const anim = new animator();
            return anim;
        })
    }

    applyNextAnimationFrame(brickMap: BrickMap){
        this.animators.forEach((animator) => {
            animator.applyNextAnimationFrame(brickMap);
        })
    }

    reset() {
        this.animators.forEach((animator) => animator.reset())
    }
}

export class SingleSequencer {
    // private background;
    private animator;
    private repetitions;
    private iteration: number;
    private _done: boolean = false;
    constructor({
        // background, 
        animators, 
        repetitions
    }: SingleSequencerParams){
        // this.background = background;
        this.animator = new Animator(animators);
        this.repetitions = repetitions;
        this.iteration = 0;
    }

    // private getBackground() {
    //     return this.background
    // }

    public applyNextStateOnTick(background: BrickMap) {
        // const bgCopy = this.getBackground();
        this._done = false;
        this.animator.applyNextAnimationFrame(background);
        this.iteration++;
        if (this.iteration >= this.repetitions) {
            this.animator.reset();
            this.iteration = 0;
            this._done = true;
        }
        // return background;
    }

    get done():boolean { return this.done }
}

export class AnimationSequencer {
    private sequencers;
    private currentSequencerIndex;

    constructor({ 
        // background, 
        configuration 
    }: SequencerParams) {
        this.currentSequencerIndex = 0;
        this.sequencers = configuration.map(({ animators, repetitions }) => {
          const sequencer = new SingleSequencer(
            {
                // background, 
                animators, 
                repetitions
            });
          return sequencer;
        })
    }

    applyNextStateOnTick(background: BrickMap){
        if (this.currentSequencerIndex >= this.sequencers.length) {
            this.currentSequencerIndex = 0;
        }
        const sequencer = this.sequencers[this.currentSequencerIndex];
        sequencer.applyNextStateOnTick(background);
        if (sequencer.done) {this.currentSequencerIndex++};
        // return brickMap;
    }
}

export class AnimatorSequencersApplier {
    private sequencers;
    private background:BrickMap;
    constructor({
        background, 
        sequencerConfigurations
    }: AnimatorSequencersApplierParams){
        this.background = background;
        this.sequencers = sequencerConfigurations.map(
            (configuration) => {
                const sequencer = new AnimationSequencer(
                    {
                        // background, 
                        configuration 
                    });
                return sequencer;
            }
        )
    }

    private getBackgroundCp() { return this.background }

    getNextStateOnTick() {
        let bgCp = this.getBackgroundCp();
        this.sequencers.forEach((sequencer) => {
            sequencer.applyNextStateOnTick(bgCp);
        })
        return bgCp;
    }
}

