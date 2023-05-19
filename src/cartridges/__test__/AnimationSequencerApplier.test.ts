import { AnimatorSequencersApplier, getBackgroundCopy } from "../AnimationSequencer/AnimationSequencer";
import { TWO_IN_ONE } from "../constants";
import { BarDownLayer } from "../layers/BarDownLayer";
import { BarLeftLayer } from "../layers/BarLeftLayer";
import { BarRightLayer } from "../layers/BarRightLayer";
import { BarUpLayer } from "../layers/BarUpLayer";

describe('Testing AnimatorSequencerApplier', () => {
    it('Should apply 2 animation sequences with different repetitions and perform them simultaneously. 10 ticks.', () => {
        const configuration = [
            [
                { repetitions: 4, animators: [BarDownLayer, BarRightLayer]},
                { repetitions: 6, animators: [BarDownLayer, BarRightLayer]},
            ],
            [
                { repetitions: 3, animators: [BarUpLayer, BarLeftLayer]},
                { repetitions: 4, animators: [BarUpLayer, BarLeftLayer]},
            ]
        ]
        const expected = [
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],        
        ]
        const sequencerApplier = new AnimatorSequencersApplier({ background: TWO_IN_ONE, sequencerConfigurations: configuration });
        let result: any;
        for (let i = 0; i < 10; i++) {
            result = sequencerApplier.getNextStateOnTick();
        }
        expect(result).toEqual(expected)
    })
})
