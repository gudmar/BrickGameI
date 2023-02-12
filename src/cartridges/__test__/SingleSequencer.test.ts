import { getBackgroundCopy, SingleSequencer } from "../AnimationSequencer/AnimationSequencer"
import { TWO_IN_ONE } from "../constants";
import { BarDownLayer } from "../layers/BarDownLayer";
import { BarRightLayer } from "../layers/BarRightLayer";

const getBg = () => getBackgroundCopy(TWO_IN_ONE);

describe('Testing SingleSequencer', () => {
    it('Should repeat a single animation 4 times, then reset its state and start from scratch', () => {
        const configuration = {
            repetitions: 4,
            animators: [ BarDownLayer, BarRightLayer ],
        }
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
        const expectedAfterReset = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 0, 1, 1, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
        const sequencer = new SingleSequencer(configuration);
        const background = getBg();
        sequencer.applyNextStateOnTick(background);
        sequencer.applyNextStateOnTick(background);
        sequencer.applyNextStateOnTick(background);
        const finalBg = getBg();
        sequencer.applyNextStateOnTick(finalBg);
        console.log(finalBg)
        expect(finalBg).toEqual(expectedBeforeReset);
    })
    it('Should repeat a single animation 2 times, and then second animation 3 times when sequence with repetitions 2 and 3 given', () => {
        
    })
})