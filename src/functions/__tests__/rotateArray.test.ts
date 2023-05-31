import { rotateArray } from "../rotateArray"

describe('Testing rotateArray', () => {
    it('Should return empty array of arrays if empty array of arrays is given', () =>{
        const result = rotateArray([[]], 1);
        expect(result).toEqual([[]]);
    })
    it('Should return one element array if one element array is given', () =>{
        const result = rotateArray([[1]], 1);
        expect(result).toEqual([[1]]);
    })
    it('Should properly rotate single row array of arrays', () => {
        const result = rotateArray([[1, 2]], 1);
        expect(result).toEqual([[1], [2]]);
    })
    it('Should properly rotate single row array of arrays with 3 elements', () => {
        const result = rotateArray([[1, 2, 3]], 1);
        expect(result).toEqual([[1], [2], [3]]);
    })
    it('Should properly rotate single row array of arrays with 6 elements', () => {
        const result = rotateArray([[1, 2, 3, 4, 5, 6]], 1);
        expect(result).toEqual([[1], [2], [3], [4], [5], [6]]);
    })
    it('Should properly rotate a 2 elements single column array', () => {
        const result = rotateArray([[1], [2]], 1);
        expect(result).toEqual([[2, 1]])
    })
    it('Should properly rotate a 4 elements single column array', () => {
        const result = rotateArray([[1], [2], [3], [4]], 1);
        expect(result).toEqual([[4,3,2, 1]])
    })
    it('Should properly rotate a 2 by 3 array', () => {
        const arr = [
            [1, 2, 3],
            [4, 5, 6],
        ]
        const expected = [
            [4, 1],
            [5, 2],
            [6, 3]
        ]
        expect(rotateArray(arr, 1)).toEqual(expected);
    })

    it('Should rotate single row array twice if called with nrOfRotations 2', () => {        
            const result = rotateArray([[1, 2]], 2);
            expect(result).toEqual([[2, 1]]);        
    })
    it('Should rotate single row array 3 times', () => {
        const result = rotateArray([[1, 2]], 3);
        expect(result).toEqual([[2],[1]]);        
    })
    it('Should rotate single row array 4 times', () => {
        const result = rotateArray([[1, 2]], 4);
        expect(result).toEqual([[1, 2]]);        
    })
    it('Should rotate single row array 7 times', () => {
        const result = rotateArray([[1, 2]], 7);
        expect(result).toEqual([[2],[1]]);        
    })

    it('Should rotate 2 by 3 array twice', () => {
        const arr = [
            [1, 2, 3],
            [4, 5, 6],
        ]
        const rotatedTwice = [
            [6, 5, 4],
            [3, 2, 1]
        ]
        expect(rotateArray(arr, 2)).toEqual(rotatedTwice);
    })
    it('Should rotate 2 by 3 array -1 times', () => {
        const arr = [
            [1, 2, 3],
            [4, 5, 6],
        ]
        const expected = [
            [3, 6],
            [2, 5],
            [1, 4]
        ]
        expect(rotateArray(arr, -1)).toEqual(expected);
    })
    it('Should rotate 2 by 3 array -7 times', () => {
        const arr = [
            [1, 2, 3],
            [4, 5, 6],
        ]
        const expected = [
            [4, 1],
            [5, 2],
            [6, 3]
        ]
        expect(rotateArray(arr, -7)).toEqual(expected);
    })
})