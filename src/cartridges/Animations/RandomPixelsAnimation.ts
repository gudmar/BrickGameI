import { AnimatorSequencersApplier } from "../AnimationSequencer/AnimationSequencer";
import { BarLeftRightLayer } from "../layers/toggle/BarLeftRightLayer";
import { BarDownUpLayer } from "../layers/toggle/BarDownUpLayer";
import { AnimationTemplate } from "./AnimationTemplate";
import { TWO_IN_ONE } from "../constants";
import { RandomPixels } from "../layers/toggle/RandomPixels";

const sequencerConfigurations = [

    [
        {
            animators: [RandomPixels],
            repetitions: 20,
        },
    ],
]

export class RandomPixelsAnimation extends AnimationTemplate {
    public NAME = "Random pixel animation";
    constructor(background = TWO_IN_ONE) {
        super();
        this.animationSequencer = new AnimatorSequencersApplier({
            background,
            sequencerConfigurations,
        })
    }
}
