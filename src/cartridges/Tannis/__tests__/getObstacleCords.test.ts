import { BallDirections } from "../../../types/types";
import { getEmptyBoard } from "../../constants";
import { PawnCords } from "../../GameCreator";
import { GAME_LOST_ERROR, getObstacleCords } from "../getObstacleLocations";

const STANDARD_BALL = {
    background: getEmptyBoard(),
    playerPosition: 3,
    ballCords: {row: 5, col: 5},
    currentDirection: BallDirections.upLeft
}

const surroundBallWighObstacles = (cords: PawnCords) => {
    const background = getEmptyBoard();
    const {row, col} = cords;
    const neighbourhood = [
        {row: row -1, col: col - 1},
        {row: row -1, col},
        {row: row -1, col: col + 1},
        {row, col: col + 1},
        {row: row + 1, col: col + 1},
        {row: row + 1, col},
        {row: row + 1, col: col - 1},
        {row, col: col - 1},
    ]
    neighbourhood.forEach(({row, col}) => background[row][col] = 1);
    return background;
}

describe('Testing getObstacleCords', () => {
    it('Should throw GAME_LOSS_ERROR in case row 0 or last row', () => {
        const throwingFunctionStart = () => getObstacleCords(
            {...STANDARD_BALL, ballCords: {row: 0, col: 5}}
        )
        const throwingFunctionEnd = () => getObstacleCords(
            {...STANDARD_BALL, ballCords: {row: 19, col: 5}}
        )
        expect(throwingFunctionStart).toThrow(GAME_LOST_ERROR)
        expect(throwingFunctionEnd).toThrow(GAME_LOST_ERROR)
    })
    it('Should return empty array in case no obstacle in neighbourhood', () => {
        const result = getObstacleCords({...STANDARD_BALL})
        expect(result).toEqual([])
    })
    it('Should return [row, -1] in case no obstacle but col 0 and direction upLeft or downLeft', () => {
        const resultUp = getObstacleCords({...STANDARD_BALL, ballCords: {row: 5, col: 0}})
        const resultDown = getObstacleCords({...STANDARD_BALL, ballCords: {row: 5, col: 0}, currentDirection: BallDirections.downLeft})
        expect(resultUp).toEqual([{row: 5, col: -1}])
        expect(resultDown).toEqual([{row: 5, col: -1}])
    })
    it('Should return [row, 20] in case no obstacle but col 19 and direction upRight or downRight', () => {
        const resultUp = getObstacleCords({...STANDARD_BALL, ballCords: {row: 5, col: 9}, currentDirection: BallDirections.downRight})
        const resultDown = getObstacleCords({...STANDARD_BALL, ballCords: {row: 5, col: 9}, currentDirection: BallDirections.upRight})
        expect(resultUp).toEqual([{row: 5, col: 10}])
        expect(resultDown).toEqual([{row: 5, col: 10}])
    })
    it('Should return [row -1, col], [row - 1, col-1], [row, col-1] in case upLeft direction and surrounded by cords', () => {
        const obstacledBackground = surroundBallWighObstacles(STANDARD_BALL.ballCords);
        const result = getObstacleCords({
            ...STANDARD_BALL, background: obstacledBackground
        })
        const expected = [
            {col: 4, row: 5}, {row: 4, col: 4}, {row: 5, col: 4}
        ]
        expect(result).toEqual(expect.arrayContaining(expected));
    })
    it('Should return [row +1, col], [row + 1, col+1], [row, col+1] in case downRight direction and surrounded by cords except for 6, 6 obstacle', () => {
        const obstacledBackground = surroundBallWighObstacles(STANDARD_BALL.ballCords);
        obstacledBackground[6][6] = 0;
        const result = getObstacleCords({
            ...STANDARD_BALL, background: obstacledBackground, currentDirection: BallDirections.downRight
        })
        const expected = [
            {col: 6, row: 5}, {row: 5, col: 6}
        ]
        expect(result).toEqual(expect.arrayContaining(expected));
    })
})