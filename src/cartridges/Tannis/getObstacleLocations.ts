import { BallDirections, directions } from "../../types/types";
import { PawnCords } from "../GameCreator";

export interface NextBallDirectionCalculatorInterface {
    currentDirection: BallDirections,
    ballCords: PawnCords,
    background: number[][],
    playerPosition: number,
}

export const GAME_LOST_ERROR = 'Game lost';

const isGameLost = (ballCords: PawnCords, background: number[][]) => {
    const {row } = ballCords;
    const maxRowIndex = background.length - 1;
    return (row === 0 || row === maxRowIndex)
}

const throwIfGameLoss = (ballCords: PawnCords, background: number[][]) => {
    if (isGameLost(ballCords, background)) throw new Error(GAME_LOST_ERROR)
}
    
const getMaxColIndex = (background:number[][]) => background[0].length - 1;
const getMaxRowIndex = (background:number[][]) => background.length - 1;

const isMoveLeft = (direction: BallDirections) => direction === BallDirections.downLeft || direction === BallDirections.upLeft;
const isMoveRight = (direction: BallDirections) => direction === BallDirections.downRight || direction === BallDirections.upRight;

const getPossibleObstacleCordsForDirection = (direction: BallDirections, cords: PawnCords) => {
    const {row, col} = cords;
    switch(direction){
        case BallDirections.upRight: return [{row: row - 1, col: col + 1}, {row: row - 1, col}, {row, col: col + 1}];
        case BallDirections.upLeft: return [{row: row - 1, col: col - 1}, {row: row - 1, col}, {row, col: col  - 1}];
        case BallDirections.downLeft: return [{row: row + 1, col: col - 1}, {row: row + 1, col}, {row, col: col  - 1}];
        case BallDirections.downRight: return [{row: row + 1, col: col + 1}, {row: row + 1, col}, {row, col: col + 1}];
    }
}

const isObstacleUnderCords = (cord: PawnCords, background: number[][]) => {
    const {row, col} = cord;
    const result = background[row][col] === 1 ? true : false;
    return result;
}

export const getObstacleCords = ({
    background,
    playerPosition,
    ballCords,
    currentDirection
}: NextBallDirectionCalculatorInterface) => {
    throwIfGameLoss(ballCords, background)
    const {row, col} = ballCords;
    const cords: PawnCords[] = [];
    if (col === 0 && isMoveLeft(currentDirection)) return [{row, col: col - 1}]
    if (col === getMaxColIndex(background) && isMoveRight(currentDirection)) return [{row, col: col + 1}]
    const possibleObctacleCords = getPossibleObstacleCordsForDirection(currentDirection, ballCords)
    const obstacleCords = possibleObctacleCords.filter((cord) => isObstacleUnderCords(cord, background))
    return(obstacleCords)
}