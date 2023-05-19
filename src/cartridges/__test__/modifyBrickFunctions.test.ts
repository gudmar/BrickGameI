import { toggle, xor } from "../layers/toggle/toggleFunction"

describe('ModifyBrickFunctions', () => {
    describe('xor', () => {
        it('0 0 => 0', () => {
            const CURRENT_BRICK = 0;
            const LAYER_BRICK = 0;
            const result = xor(CURRENT_BRICK, LAYER_BRICK) 
            expect(result).toEqual(0)
        });
        it('0 1 => 1', () => {
            const CURRENT_BRICK = 0;
            const LAYER_BRICK = 1;
            const result = xor(CURRENT_BRICK, LAYER_BRICK) 
            expect(result).toEqual(1)
        });
        it('1 0 => 1', () => {
            const CURRENT_BRICK = 1;
            const LAYER_BRICK = 0;
            const result = xor(CURRENT_BRICK, LAYER_BRICK) 
            expect(result).toEqual(1)
        })
        it('1 1 => 0', () => {
            const CURRENT_BRICK = 1;
            const LAYER_BRICK = 1;
            const result = xor(CURRENT_BRICK, LAYER_BRICK) 
            expect(result).toEqual(0)
        })
    });
    describe('Testing toggle', () => {
        it('0 0 => 0', () => {
            const CURRENT_BRICK = 0;
            const LAYER_BRICK = 0;
            const result = toggle(CURRENT_BRICK, LAYER_BRICK) 
            expect(result).toEqual(0)
        });
        it('0 1 => 1', () => {
            const CURRENT_BRICK = 0;
            const LAYER_BRICK = 1;
            const result = toggle(CURRENT_BRICK, LAYER_BRICK) 
            expect(result).toEqual(1)
        });
        it('1 0 => 1', () => {
            const CURRENT_BRICK = 1;
            const LAYER_BRICK = 0;
            const result = toggle(CURRENT_BRICK, LAYER_BRICK) 
            expect(result).toEqual(1)
        })
        it('1 1 => 0', () => {
            const CURRENT_BRICK = 1;
            const LAYER_BRICK = 1;
            const result = toggle(CURRENT_BRICK, LAYER_BRICK) 
            expect(result).toEqual(0)
        })
    })
})