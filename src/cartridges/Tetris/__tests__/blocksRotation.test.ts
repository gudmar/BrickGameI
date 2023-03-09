import { FigureHandlePoint } from "../../../types/types";
import { Block, BLOCK_LONG, BLOCK_L_LEFT, BLOCK_S, BLOCK_T } from "../blocks"

const figureHandlePoints: FigureHandlePoint[] = [
    {row: 1, col: 1},
    {row: 1, col: 1},
    {row: 1, col: 1},
    {row: 1, col: 1},
]

describe('Tetris blocks testing', () => {
    describe('Testing block variant preparation', () => {
        it('Should return a once rotated T figure', () => {
            const expected = [
                [0, 1],
                [1, 1],
                [0, 1],
            ];
            const variantNr = 1;
            const testedBlock = new Block(BLOCK_T, figureHandlePoints)
            const result = testedBlock.prepareVariant(variantNr);
            expect(result).toEqual(expected);    
        });
        it('Should return a twice rotated T figure', () => {
            const expected = [
                [0, 1, 0],
                [1, 1, 1],
            ];
            const variantNr = 2;
            const testedBlock = new Block(BLOCK_T, figureHandlePoints)
            const result = testedBlock.prepareVariant(variantNr);
            expect(result).toEqual(expected);    
        });
        it('Should return a twice rotated S figure', () => {
            const expected = [
                [0, 1, 1],
                [1, 1, 0],
            ];
            const variantNr = 2;
            const testedBlock = new Block(BLOCK_S, figureHandlePoints)
            const result = testedBlock.prepareVariant(variantNr);
            expect(result).toEqual(expected);    
        });
        it('Should return a 3 times rotated S figure', () => {
            const expected = [
                [1, 0],
                [1, 1],
                [0, 1],
            ];
            const variantNr = 3;
            const testedBlock = new Block(BLOCK_S, figureHandlePoints)
            const result = testedBlock.prepareVariant(variantNr);
            
            expect(result).toEqual(expected);    
        });
        it('Should return a 3 times rotated L-left figure', () => {
            const expected = [
                [1, 0],
                [1, 0],
                [1, 1],
            ];
            const variantNr = 3;
            const testedBlock = new Block(BLOCK_L_LEFT, figureHandlePoints)
            const result = testedBlock.prepareVariant(variantNr);
            console.log(result)
            expect(result).toEqual(expected);
        });
        it('Should return a 2 times rotated L-left figure', () => {
            const expected = [
                [0, 0, 1],
                [1, 1, 1],
            ];
            const variantNr = 2;
            const testedBlock = new Block(BLOCK_L_LEFT, figureHandlePoints)
            const result = testedBlock.prepareVariant(variantNr);
            console.log(result)
            expect(result).toEqual(expected);    
        });
        it('Should not mutate original figure if rotated 3 times', () => {
            const expected = [
                [1, 1, 1],
                [1, 0, 0],
            ];
            const variantNr = 3;
            const testedBlock = new Block(BLOCK_L_LEFT, figureHandlePoints)
            testedBlock.prepareVariant(variantNr);
            expect(testedBlock.basicFigure).toEqual(expected);
        })
        it('Should not mutate original figure if rotated 2 times', () => {
            const expected = [
                [1, 1, 1],
                [1, 0, 0],
            ];
            const variantNr = 2;
            const testedBlock = new Block(BLOCK_L_LEFT, figureHandlePoints)
            testedBlock.prepareVariant(variantNr);
            expect(testedBlock.basicFigure).toEqual(expected);
        })
        it('Should not mutate original figure if rotated 1 time', () => {
            const expected = [
                [1, 1, 1],
                [1, 0, 0],
            ];
            const variantNr = 1;
            const testedBlock = new Block(BLOCK_L_LEFT, figureHandlePoints)
            testedBlock.prepareVariant(variantNr);
            expect(testedBlock.basicFigure).toEqual(expected);
        })

        it('Should return a 3 times rotated Long figure', () => {
            const expected = [
                [1],
                [1],
                [1],
                [1],
            ];
            const variantNr = 3;
            const testedBlock = new Block(BLOCK_LONG, figureHandlePoints)
            const result = testedBlock.prepareVariant(variantNr);
            console.log(result)
            expect(result).toEqual(expected);    
        });
    })
})