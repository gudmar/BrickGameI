import { EMPTY_NEXT_FIGURE, TWO_IN_ONE } from '../constants';
import { TestCartridge } from '../test';


describe('Testing test cardridge', () => {
    const cartridge = new TestCartridge();
    describe('Testing static image', () => {
        it('Should return GameLogicArgs with static brickCoordinantes', () => {
            const expected = {
                score: 0,
                level: 0,
                speed: 0,
                nextFigureFieldContent: EMPTY_NEXT_FIGURE,
                brickCoordinantes: TWO_IN_ONE,
            }
            const result = cartridge.getTwoInOne();
            expect(result).toEqual(expected);
        })
    })
})
