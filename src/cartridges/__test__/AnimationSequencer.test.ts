import { AnimationSequencer, getBackgroundCopy } from "../AnimationSequencer/AnimationSequencer"
import { TWO_IN_ONE } from "../constants";
import { BarDownLayer } from "../layers/BarDownLayer";
import { BarRightLayer } from "../layers/BarRightLayer";

const getBg = () => getBackgroundCopy(TWO_IN_ONE);

describe('Testing AnimationSequencer', () => {
    it('Should repeat a single animation 4 times, then reset its state and start from scratch', () => {
        const configuration = [{
            repetitions: 4,
            animators: [ BarDownLayer, BarRightLayer ],
        }]
        const expectedBeforeReset = [
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1 ,1, 1, 1],
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 1, 1, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        ]
        const expectedAfterResetAndInvocation = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [1, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
            [1, 0, 1, 0, 1, 1, 0, 1, 0, 0],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 0],
            [1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
        const sequencer = new AnimationSequencer({ configuration });
        const background = getBg();
        sequencer.applyNextStateOnTick(background);
        sequencer.applyNextStateOnTick(background);
        sequencer.applyNextStateOnTick(background);
        const finalBg = getBg();
        sequencer.applyNextStateOnTick(finalBg);
        expect(finalBg).toEqual(expectedBeforeReset);
        const afterResetBg = getBg();
        sequencer.applyNextStateOnTick(afterResetBg);
        expect(afterResetBg).toEqual(expectedAfterResetAndInvocation);
    })
    it('Should repeat a single animation 4 times, and then second animation 3 times when sequence with repetitions 2 and 3 given', () => {
        const configuration = [
        {
            repetitions: 4,
            animators: [ BarDownLayer, BarRightLayer ],
        },
        {
            repetitions: 3,
            animators: [ BarDownLayer, BarRightLayer ],
        },
    ]
        const firstRound = [
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1 ,1, 1, 1],
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 1, 1, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        ]
        const secondRound = [
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1 ,1, 1, 1],
            [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 0, 1, 1, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        ];
        const sequencer = new AnimationSequencer({ configuration });
        const background = getBg();
        sequencer.applyNextStateOnTick(background);
        sequencer.applyNextStateOnTick(background);
        sequencer.applyNextStateOnTick(background);
        const finalBg = getBg();
        sequencer.applyNextStateOnTick(finalBg);
        expect(finalBg).toEqual(firstRound);

        sequencer.applyNextStateOnTick(background);
        sequencer.applyNextStateOnTick(background);
        const afterResetBg = getBg();
        sequencer.applyNextStateOnTick(afterResetBg);
        expect(afterResetBg).toEqual(secondRound);

        sequencer.applyNextStateOnTick(background);
        sequencer.applyNextStateOnTick(background);
        sequencer.applyNextStateOnTick(background);
        const nextRoundBg = getBg();
        sequencer.applyNextStateOnTick(nextRoundBg);
        expect(nextRoundBg).toEqual(firstRound);

    })
})