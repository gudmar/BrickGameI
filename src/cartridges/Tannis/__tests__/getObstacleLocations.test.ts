import { ObstacleLocations } from "../../../types/types";
import { calculateObstacleLocations } from "../getObstacleLocations"

describe('Check if getObstacleLocations processes cords to locations in correct way', () => {
    it('Should return empty array in case empty obstacle cords are passed', () => {
        const ballPosition = {row: 4, col: 4};
        const result = calculateObstacleLocations([], ballPosition);
        expect(result).toEqual([]);
    });

    it('Should return above, left, leftTop in case [row-1, col], [row-1, col-1], [row, col-1] are given', () => {
        const ballPosition = {row: 5, col: 5};
        const obstacleCords = [
            {row: 4, col: 5}, {row: 4, col: 4}, {row: 5, col: 4}
        ]
        const result = calculateObstacleLocations(obstacleCords, ballPosition);
        const expected = [ObstacleLocations.above, ObstacleLocations.left, ObstacleLocations.topLeft]
        expect(result).toEqual(expect.arrayContaining(expected))               
    })
    it('Should return bottomLeft, below, bottomRight, right, topRight if [row+1, col], [row+ 1, col-1], [row+1,col+1], [row, col+1] ,[row-1, col+1] given', () => {
        const ballCord = {row: 5, col: 5};
        const bottomLeftCord = [{row: 6, col: 4}];
        const belowCord = [{row: 6, col: 5}];
        const bottomRightCord = [{row: 6, col: 6}];
        const rightCord = [{row: 5, col: 6}];
        const rightTop = [{row: 4, col: 6}];
        expect(calculateObstacleLocations(bottomLeftCord, ballCord)).toEqual([ObstacleLocations.bottomLeft]);
        expect(calculateObstacleLocations(belowCord, ballCord)).toEqual([ObstacleLocations.below]);
        expect(calculateObstacleLocations(bottomRightCord, ballCord)).toEqual([ObstacleLocations.bottomRight]);
        expect(calculateObstacleLocations(rightCord, ballCord)).toEqual([ObstacleLocations.right]);
        expect(calculateObstacleLocations(rightTop, ballCord)).toEqual([ObstacleLocations.topRight]);
    })
})