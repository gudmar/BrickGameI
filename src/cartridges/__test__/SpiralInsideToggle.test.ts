import { getDojoOfSymbols } from "../AbstractGameLogic";
import { SpiralInsideToggle } from "../layers/toggle/SpiralInsideToggle";
import { BACKGROUND_0, BACKGROUND_1_BRICK, BACKGROUND_5_BRICKS, COL_1_TURN } from "./data/spiralInsideData"

describe('Testing getDojoOfSymbols', () => {
    it('Should set a single element on received array', () => {
        const result = getDojoOfSymbols(0);
        result[0][0] = 1;
        expect(result).toEqual(BACKGROUND_1_BRICK);
    })
})

describe('Testing SpiralInsideToggle', () => {
    let animator: any;
    beforeEach(() => animator = new SpiralInsideToggle())
    // afterEach(() => delete animator)
    it('Should fill first 1 brick', () => {
        const input = BACKGROUND_0;
        const expected = BACKGROUND_1_BRICK;
        animator.applyNextAnimationFrame(input);
        expect(input).toEqual(expected);
    });
    it.only('Should fill first 5 bricks', () => {
        let result;
        const expected = BACKGROUND_5_BRICKS;
        for(let i = 0; i < 5; i++) {
            const input = BACKGROUND_0;
            animator.applyNextAnimationFrame(input);
            result = input;
        }
        expect(result).toEqual(expected);
    });
    it('Should fill first column and turn with run 21 tims', () => {
        const input = BACKGROUND_0;
        const expected = COL_1_TURN;
        for(let i = 0; i < 20; i++) {
            animator.applyNextAnimationFrame(input);
        }
        expect(input).toEqual(expected);
    })
})