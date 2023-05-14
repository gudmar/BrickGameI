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

const getMaxCol = (background: number[][]) => background[0].length - 1;
