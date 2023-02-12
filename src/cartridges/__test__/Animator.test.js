import { getBackgroundCopy } from '../AnimationSequencer/AnimationSequencer';
import { Animator } from '../AnimationSequencer/AnimationSequencer.ts'
import { TWO_IN_ONE } from '../constants'
import { BarDownLayer } from '../layers/BarDownLayer.ts'
import { BarRightLayer} from '../layers/BarRightLayer.ts'

const getBg = () => getBackgroundCopy(TWO_IN_ONE);

describe('Testing Animator from AnimationSequencer', () => {
    it('Should modify background with 2 animation modifiers if array of 2 animators is given', () => {
        const expected = [
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
        const background = getBg();
        const animator = new Animator([BarDownLayer, BarRightLayer]);
        animator.applyNextAnimationFrame(background);
        expect(background).toEqual(expected);
    });
    it('Should apply animation 3 times correctly', () => {
        const expected = [
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
        const background = getBg();
        const animator = new Animator([BarDownLayer, BarRightLayer]);
        animator.applyNextAnimationFrame(background);
        animator.applyNextAnimationFrame(background);
        const lastBg = getBg();
        console.log(lastBg)
        animator.applyNextAnimationFrame(lastBg);
        expect(lastBg).toEqual(expected);
    })
})