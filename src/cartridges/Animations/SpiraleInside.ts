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
    constructor(background = TWO_IN_ONE) {
        super();
        this.animationSequencer = new AnimatorSequencersApplier({
            background,
            sequencerConfigurations: sequencerConfigurations,
        })
    }
}

export { SpiralInside };
