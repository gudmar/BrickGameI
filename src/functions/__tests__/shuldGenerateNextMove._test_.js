import { shouldGenerateNextMove } from "../shouldGenerateNextMove.ts";

describe('Testing shouldGenerateNextMove', () => {
    it('Should return true if clock value 1540 and speed 0', () => {
        const expected = true;
        const result = shouldGenerateNextMove(0, 1540);
        expect(result).toEqual(expected)
    })    
    it('Should return false if clock value 1540 and speed 1', () => {
        const expected = false;
        const result = shouldGenerateNextMove(1, 1540);
        expect(result).toEqual(expected)
    }) 

    it('Should return true if clock value 1540 and speed 5', () => {
        const expected = true;
        const result = shouldGenerateNextMove(5, 1540);
        expect(result).toEqual(expected)
    }) 

    it('Should return true if clock value 1530 and speed 3', () => {
        const expected = true;
        const result = shouldGenerateNextMove(7, 1530);
        expect(result).toEqual(expected)
    }) 
    it('Should return true if clock value 1530 and speed 1', () => {
        const expected = true;
        const result = shouldGenerateNextMove(7, 1530);
        expect(result).toEqual(expected)
    }) 
    it('Should return false if clock value 1530 and speed 2', () => {
        const expected = false;
        const result = shouldGenerateNextMove(2, 1530);
        expect(result).toEqual(expected)
    }) 
    it('Should return true if clock value 1530 and speed 4', () => {
        const expected = true;
        const result = shouldGenerateNextMove(4, 1530);
        expect(result).toEqual(expected)
    }) 
    it('Should return false if clock value 1530 and speed 6', () => {
        const expected = false;
        const result = shouldGenerateNextMove(6, 1530);
        expect(result).toEqual(expected)
    }) 

})
