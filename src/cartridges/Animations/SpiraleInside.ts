import { AnimatorSequencersApplier } from "../AnimationSequencer/AnimationSequencer";
import { TWO_IN_ONE } from "../constants";
import { SpiralInsideToggle } from "../layers/toggle/SpiralInsideToggle";
import { AnimationTemplate } from "./AnimationTemplate";

const sequencerConfigurations = [
    [
        {
            animators: [SpiralInsideToggle],
            repetitions: 200,
        },
    ],
]

class SpiralInside extends AnimationTemplate{
    public NAME = "SpiraleInside";
    constructor() {
        super();
        this.animationSequencer = new AnimatorSequencersApplier({
            background: TWO_IN_ONE,
            sequencerConfigurations: sequencerConfigurations,
        })
    }
}

export { SpiralInside };
