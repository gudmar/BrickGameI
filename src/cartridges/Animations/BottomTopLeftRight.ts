import { AnimatorSequencersApplier } from "../AnimationSequencer/AnimationSequencer";
import { BarLeftRightLayer } from "../layers/toggle/BarLeftRightLayer";
import { BarDownUpLayer } from "../layers/toggle/BarDownUpLayer";
import { AnimationTemplate } from "./AnimationTemplate";
import { TWO_IN_ONE } from "../constants";

const sequencerConfigurations = [

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

export class BottomTopLeftRight extends AnimationTemplate {
    public NAME = "BottomTopLeftRight";
    constructor() {
        super();
        this.animationSequencer = new AnimatorSequencersApplier({
            background: TWO_IN_ONE,
            sequencerConfigurations,
        })
    }
}
