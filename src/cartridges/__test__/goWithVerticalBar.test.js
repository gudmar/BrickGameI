import { doWithVerticalBar } from "../AbstractGameLogic";
import { INDEX_OUT_OF_RANGE, TYPE_MISMATCH } from "../constants";

describe('Test do with vertical bar in abstractGameLogic', () => {
    const getInput = () => ([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    it('Should set third column to 1ces if index 3 given, and proper callback', () => {
        const expected = [
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],    
        ];
        const cb = () => 1;
        const result = doWithVerticalBar({
            dojo: getInput(),
            index: 3,
            pixelModificationFunction: cb,
        });
        expect(result).toEqual(expected);
    })
    it('Should set last column to 1ces if index 3 given, and proper callback', () => {
        const expected = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],    
        ];
        const cb = () => 1;
        const result = doWithVerticalBar({
            dojo: getInput(),
            index: 9,
            pixelModificationFunction: cb,
        });
        expect(result).toEqual(expected);
    })
    it('Should set first column to 1ces if index 3 given, and proper callback', () => {
        const expected = [
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],    
        ];
        const cb = () => 1;
        const result = doWithVerticalBar({
            dojo: getInput(),
            index: 0,
            pixelModificationFunction: cb,
        });
        expect(result).toEqual(expected);
    })
    it('Should throw if attempt to set column with not existing index: length + 1', () => {
        const throwingFunction = () => doWithVerticalBar({
            dojo: getInput(),
            index: 10,
            pixelModificationFunction: () => 1,
        })
        expect(throwingFunction).toThrow(INDEX_OUT_OF_RANGE);
    })
    it('Should throw if attempt to set column with not existing index: -1', () => {
        const throwingFunction = () => doWithVerticalBar({
            dojo: getInput(),
            index: -1,
            pixelModificationFunction: () => 1,
        })
        expect(throwingFunction).toThrow(INDEX_OUT_OF_RANGE);        
    })
    it('Should throw if given argument is not an array', () => {
        const throwingFunction = () => doWithVerticalBar({})
        expect(throwingFunction).toThrow(TYPE_MISMATCH);
    })

})
