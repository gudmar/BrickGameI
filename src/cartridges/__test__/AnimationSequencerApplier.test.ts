import { AnimatorSequencersApplier, getBackgroundCopy } from "../AnimationSequencer/AnimationSequencer";
import { TWO_IN_ONE } from "../constants";
import { BarDownLayer } from "../layers/BarDownLayer";
import { BarRightLayer } from "../layers/BarRightLayer";

const getBg = () => getBackgroundCopy(TWO_IN_ONE);

describe('Testing AnimatorSequencerApplier', () => {
    it('Should apply 2 animation sequences with different repetitions and perform them simultaneously', () => {
        const configuration = [
            [
                { repetitions: 4, animators: [BarDownLayer, BarRightLayer]},
                { repetitions: 6, animators: [BarDownLayer, BarRightLayer]},
            ],
            
        ]
    })
})
