import { getEmptyBoard } from "../../constants";
import { LongBlock } from "../blocks";
import { TetrisVisitor } from "../Tetris";
import { EXPECTED_NOT_ROTATED_LONG_1, EXPECTED_ROTATED_LONG_1 } from "../mocks/boardMocks";



describe('Testing TetrisDecorator: mergeBlockToLayer', () => {
    const methodProvider = new TetrisVisitor();
    let longBlock = new LongBlock();
    beforeEach(() => {
        longBlock = new LongBlock();
    })

    it('Should return layer with block rotated around handlePoint if is given empty layer, cords (5, 5), long block', () => {
        const layer = getEmptyBoard();
        const longBlockBefore = longBlock.blockDescriptor;
        longBlock.rotate();
        const longBlockAfter = longBlock.blockDescriptor;
        const cords = {col: 5, row: 5};
        const resultBefore = methodProvider.mergeBlockToLayer({layer, cords, block: longBlockBefore});
        const resultAfter = methodProvider.mergeBlockToLayer({layer, cords, block: longBlockAfter});
        expect(resultBefore).toEqual(EXPECTED_NOT_ROTATED_LONG_1)
        expect(resultAfter).toEqual(EXPECTED_ROTATED_LONG_1)
    })
})
