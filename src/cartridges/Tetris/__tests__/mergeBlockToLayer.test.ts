import { getEmptyBoard } from "../../constants";
import { LongBlock, TBlock } from "../blocks";
import { TetrisVisitor } from "../Tetris";
import { EXPECTED_NOT_ROTATED_LONG_1, EXPECTED_ROTATED_LONG_1 } from "../mocks/boardMocks";



describe('Testing TetrisDecorator: mergeBlockToLayer with LongBlock', () => {
    const methodProvider = new TetrisVisitor();
    describe('Testing LongBlock', () => {
        let longBlock = new LongBlock();
        beforeEach(() => {
            longBlock = new LongBlock();
        })
    
        it('Should set start position properly', () => {
            const layer = getEmptyBoard();
            const longBlockBefore = longBlock.blockDescriptor;
            const cords = {col: 5, row: 5};
            const resultBefore = methodProvider.mergeBlockToLayer({layer, cords, block: longBlockBefore});
            expect(resultBefore).toEqual(EXPECTED_NOT_ROTATED_LONG_1)
        })
    
    
        it('Should return layer with block rotated around handlePoint if is given empty layer, cords (5, 5), long block', () => {
            const layer = getEmptyBoard();
            longBlock.rotate();
            const longBlockAfter = longBlock.blockDescriptor;
            const cords = {col: 5, row: 5};
            const resultAfter = methodProvider.mergeBlockToLayer({layer, cords, block: longBlockAfter});
            expect(resultAfter).toEqual(EXPECTED_ROTATED_LONG_1)
        })
    
        it('Should return properly rotatated 2 times long block', () => {
            const layer = getEmptyBoard();
            const cords = {col: 5, row: 5};
            longBlock.rotate();
            longBlock.rotate();
            const longBlockAfter = longBlock.blockDescriptor;
            const resultAfter = methodProvider.mergeBlockToLayer({layer, cords, block: longBlockAfter});
            expect(resultAfter).toEqual(EXPECTED_NOT_ROTATED_LONG_1)
        })
    
        it('Should return properly rotatated 3 times long block', () => {
            const layer = getEmptyBoard();
            const cords = {col: 5, row: 5};
            longBlock.rotate();
            longBlock.rotate();
            longBlock.rotate();
            const longBlockAfter = longBlock.blockDescriptor;
            const resultAfter = methodProvider.mergeBlockToLayer({layer, cords, block: longBlockAfter});
            expect(resultAfter).toEqual(EXPECTED_ROTATED_LONG_1)
        })    
    });
})
