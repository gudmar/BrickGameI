import { NextStateCalculator } from "../../AbstractNextStateCalculator";
import { getEmptyBoard } from "../../constants";
import { GameCreator } from "../../GameCreator";
import { AnimatorOfDestruction } from "../animatorOfDestruction";
import { MIDDLE_BOARD_EXPECTED, MIDDLE_CORDS } from "../mocks/mergeBurningTankEffect";
import { TankVisitor } from "../tanks";

describe('Testing animatorOfDestruction for tanks', () => {
    describe('Testing generateChessboard', () => {
        const animator = new AnimatorOfDestruction({} as GameCreator, {} as TankVisitor)
        it('Should return [[]] in case size is 0', () => {
            const result = animator.generateChessboard(0, true);
            expect(result).toEqual([]);
        });
        it('Should return [[0]] in case size is 1 and startFromZero is true', () => {
            const result = animator.generateChessboard(1, true);
            expect(result).toEqual([[0]]);
        })
        it('Should return [[1]] in case size is 1 and startFromZero is false', () => {
            const result = animator.generateChessboard(1, false);
            expect(result).toEqual([[1]]);
        })
        it('Should return array with first row equal to 0, 1 when size is 2 and startFromZero is true', () => {
            const result = animator.generateChessboard(2, true);
            expect(result[0]).toEqual([0, 1]);
        })
        it('Should return array with second row equal to 1, 0 when size is 2 and startFromZero is true', () => {
            const result = animator.generateChessboard(2, true);
            expect(result[1]).toEqual([1, 0]);
        })
        it('Should return correctl array in case size 5 and startFromZero is true', () => {
            const expected = [
                [0, 1, 0, 1, 0],
                [1, 0, 1, 0, 1],
                [0, 1, 0, 1, 0],
                [1, 0, 1, 0, 1],
                [0, 1, 0, 1, 0],
            ]
            const result = animator.generateChessboard(5, true);
            expect(result).toEqual(expected);
        })
        it('Should return correct array in case size is 5, and starFromZero is false', () => {
            const expected = [
                [1, 0, 1, 0, 1],
                [0, 1, 0, 1, 0],
                [1, 0, 1, 0, 1],
                [0, 1, 0, 1, 0],
                [1, 0, 1, 0, 1],
            ]
            const result = animator.generateChessboard(5, false);
            expect(result).toEqual(expected);
        })

    });
    describe('Testing mergeBurningTankToBoard', () => {
        const animator = new AnimatorOfDestruction({} as GameCreator, {} as TankVisitor)
        it('Should merge single row properly if tank in the middle of the board', () => {
            const expected = [0, 0, 0, 0, 1, 0, 1, 0, 0, 0];
            const cords = MIDDLE_CORDS;
            const result = animator.mergeBurningTankToBoard(getEmptyBoard(), cords, true)
            expect(result[3]).toEqual(expected);
        })
        it('Should merge burning effect for tank in the middle of the board (burning area not touching anything)', () => {
            const expected = MIDDLE_BOARD_EXPECTED;
            const cords = MIDDLE_CORDS;
            const result = animator.mergeBurningTankToBoard(getEmptyBoard(), cords, true)
            expect(result).toEqual(expected);
        });
        it('Should merge burning effect for burning effect touching left upper layer corner', () => {

        })
        it('Shoud merge burning effect for tank touching left upper layer corner', () => {

        })
        it('Should merge burning effect for burning effect touching down right board corner', () => {

        })
        it('Should merge burning effect for tank touching down right part of board', () => {
    
        })
    })
})