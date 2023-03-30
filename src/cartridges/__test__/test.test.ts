import { getNextFigureOfSymbols } from '../AbstractGameLogic';
import { TWO_IN_ONE } from '../constants';
import { TestCartridge } from '../test';


describe('Testing test cardridge', () => {
    const cartridge = new TestCartridge();
    describe('Testing static image', () => {
        it('Should return GameLogicArgs with static brickCoordinantes', () => {
            const expected = {
                score: 0,
                level: 1,
                speed: 1,
                brickMap: TWO_IN_ONE,
                isAnimating: false,
                isPaused: false,
                nextFigure: getNextFigureOfSymbols(0),
            }
            const result = cartridge.getTwoInOne();
            expect(result).toEqual(expected);
        })
    })
})
