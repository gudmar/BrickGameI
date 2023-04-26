import { directions } from "../../../types/types"
import { getRotatedDirection } from "../tankUtils"

describe('Testing getRotatedDirection', () => {
    it('Should return the same direction when given rotations 0', () => {
        const input = directions.DOWN;
        const expected = directions.DOWN;
        const result = getRotatedDirection(input, 0);
        expect(result).toBe(expected);
    })
    it('Should return LEFT when given DOWN and rotation 1', () => {
        const input = directions.DOWN;
        const expected = directions.LEFT;
        const result = getRotatedDirection(input, 1);
        expect(result).toBe(expected);
    })
    it('Should return RIGHT when given DOWN and rotation 3', () => {
        const input = directions.DOWN;
        const expected = directions.RIGHT;
        const result = getRotatedDirection(input, 3);
        expect(result).toBe(expected);
    })
    it('Should return DOWN when given DOWN and rotation 4', () => {
        const input = directions.DOWN;
        const expected = directions.DOWN;
        const result = getRotatedDirection(input, 4);
        expect(result).toBe(expected);
    })
    it('Should return UP when given DOWN and rotation 10', () => {
        const input = directions.DOWN;
        const expected = directions.UP;
        const result = getRotatedDirection(input, 10);
        expect(result).toBe(expected);
    })
})