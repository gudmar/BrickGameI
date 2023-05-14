import { BallDirections } from "../../types/types";
import { PawnCords } from "../GameCreator"


export interface NextBallDirectionCalculatorInterface {
    currentDirection: BallDirections,
    ballCords: PawnCords,
    background: number[][],
    playerPosition: number,
}

export const calculateNextBallDirection = ({
    currentDirection, ballCords, background, playerPosition
}: NextBallDirectionCalculatorInterface) => {
    return currentDirection;
}

// const getObstacleLocation = ({
//     currentDirection, ballCords, background, playerPosition
// }: NextBallDirectionCalculatorInterface ) => {
//     const (row, col) = ballCords;
// }

const getObstacleLocations = (ballCords: PawnCords, background: number[][]) => {
    const {row, col} = ballCords;
    const cords: PawnCords[] = [];
    const maxColIndex = background[0].length - 1;
    
    if (col === maxColIndex) cords.push({col: maxColIndex + 1, row})
}
const isGameLost = (ballCords: PawnCords, background: number[][]) => {
    const {row } = ballCords;
    const maxRowIndex = background.length - 1;
    return (row === 0 || row === maxRowIndex)
}

const getObstacleCordsLeft = (ballCords: PawnCords, direction: BallDirections, background: number[][]) => {
    const {row, col} = ballCords;
    if (
        isGameLost(ballCords, background) ||
        (
            direction !== BallDirections.downLeft &&
            direction !== BallDirections.upLeft    
        )
    ) return [];
    if (col === 0) return [{col: -1, row}];
    if (direction === BallDirections.downLeft){
        const possibleCords = [{row: row + 1, col: col - 1}, {row, col: col - 1}];
        const result = filterPossibleCords(possibleCords, background);
        return result;
    }
    if (direction === BallDirections.upLeft){
        const possibleCords = [{row: row - 1, col: col - 1}, {row, col: col - 1}]
        const result = filterPossibleCords(possibleCords, background);
        return result;
    }
    return [];
}

const getMaxCol = (background: number[][]) => background[0].length - 1;

const getObstacleCordsRight = (ballCords: PawnCords, direction: BallDirections, background: number[][]) => {
    const {row, col} = ballCords;
    if (
        isGameLost(ballCords, background) ||
        (
            direction !== BallDirections.upLeft &&
            direction !== BallDirections.upRight
        )
    ) return [];
    if (col === getMaxCol(background)) return [{col: getMaxCol(background) + 1, row}];
    if (direction === BallDirections.upRight){
        const possibleCords = [{row: row - 1, col: col + 1}, {row: row - 1, col}];
        const result = filterPossibleCords(possibleCords, background);
        return result;
    }
    if (direction === BallDirections.upLeft){
        const possibleCords = [{row: row - 1, col: col - 1}, {row: row - 1, col}]
        const result = filterPossibleCords(possibleCords, background);
        return result;
    }
    return [];
}

const getObstacleCordsUp = (ballCords: PawnCords, direction: BallDirections, background: number[][]) => {
    const {row, col} = ballCords;
    if (
        isGameLost(ballCords, background) ||
        (
            direction !== BallDirections.upLeft &&
            direction !== BallDirections.upRight
        )
    ) return [];
    if (col === 0) return [{col: -1, row}];
    if (direction === BallDirections.downRight){
        const possibleCords = [{row: row + 1, col: col + 1}, {row, col: col + 1}];
        const result = filterPossibleCords(possibleCords, background);
        return result;
    }
    if (direction === BallDirections.upRight){
        const possibleCords = [{row: row - 1, col: col + 1}, {row, col: col + 1}]
        const result = filterPossibleCords(possibleCords, background);
        return result;
    }
    return [];
}

const filterPossibleCords = (possibleCords: PawnCords[], background: number[][]) =>
     possibleCords.filter((cord: PawnCords) => isObstacleUnderCords(cord, background));

const isObstacleUnderCords = (cord: PawnCords, background: number[][]) => {
    const {row, col} = cord;
    const result = background[row][col] === 1 ? true : false;
    return result;
}

const getContactWithPlayerCords = (ballCords: PawnCords, playerPosition: number) => {

}
