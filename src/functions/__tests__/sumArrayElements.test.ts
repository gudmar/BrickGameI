import { sumArrayElements } from "../sumArrayElements";

describe('Testing sumArrayElements', () => {
    it('Should sum a list', () => {
        const input = [ 1, 2, 3, 4, 5 ];
        const expected = 15;
        const result = sumArrayElements(input);
        expect(result).toBe(expected);
    })
    it('Should sum 2 dim array', () => {
        const input = [
            [1, 2, 3, 4], //10
            [5, 6, 7, 8], //26
            [9, 10, 11, 12], //42
        ];
        const expected = 78;
        const result = sumArrayElements(input);
        expect(result).toBe(expected);
    })
    it('Should return -1 in case of different row lengths', () => {
        const input = [
            [0, 0, 0, 1],
            [1, 1, 0, 0, 0, 1],
            [1, 1, 0, 0],
        ];
        const expected = -1;
        const result = sumArrayElements(input);
        expect(result).toBe(expected);
    })

    it('Should return 3 in case of a 1 element array of arrays', () => {
        const input = [
            [1, 1, 0, 0, 0, 1]
        ];
        const expected = 3;
        const result = sumArrayElements(input);
        expect(result).toBe(expected);
    })
    it('Should return -1 in case of mixed element types (numbers with arrays)', () => {
        const input = [
            2,
            [1, 1, 0, 0, 0, 1],
            [1, 1, 0, 0],
        ];
        const expected = -1;
        const result = sumArrayElements(input);
        expect(result).toBe(expected);
    })

})