import { getBackgroundCopy } from "../AnimationSequencer/AnimationSequencer";

describe('Testing getBackgroundCopy', () => {
    it('Should return a true copy of an array', () => {
        const bg = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]
        const expected = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],    
        ]
        const mutated = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 5, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],    
        ]
        const cp = getBackgroundCopy(bg);
        bg[2][2] = 5;
        expect(cp).toEqual(expected);
        expect(bg).toEqual(mutated)
    })
})