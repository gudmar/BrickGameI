import { getBackgroundCopy } from "../AnimationSequencer/AnimationSequencer"
import { TWO_IN_ONE } from "../constants"
import { BarLeftLayer } from "../layers/BarLeftLayer";

const getBg = () => getBackgroundCopy(TWO_IN_ONE);

describe('Testing LeftBarLayer', () => {
    it('Should move bar 2 columns left if called 2 times', () => {
        const expected = [
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
            [0, 0, 0, 1, 1, 1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 0, 1, 0, 0, 1, 1, 0],
            [0, 0, 1, 0, 1, 1, 0, 1, 1, 0],
            [0, 0, 1, 0, 1, 0, 1, 1, 1, 0],
            [0, 0, 1, 0, 1, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        ]
        const bg1 = getBg();
        const layerApplier = new BarLeftLayer();
        layerApplier.applyNextAnimationFrame(bg1);
        const bg2 = getBg();
        layerApplier.applyNextAnimationFrame(bg2);
        console.log(bg2)
        expect(bg2).toEqual(expected);
    })
})