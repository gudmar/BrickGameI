import { BallDirections, ObstacleLocations } from "../../types/types";
import { PawnCords } from "../GameCreator"
import { calculateObstacleLocations, getObstacleLocations } from "./getObstacleLocations";


export interface NextBallDirectionCalculatorInterface {
    currentDirection: BallDirections,
    ballCords: PawnCords,
    background: number[][],
    playerPosition: number,
    isPlayerMovingLeft?: boolean,
    isPlayerMovingRight?: boolean,
}
const OBSTACLE_LOCATIONS = [
    ObstacleLocations.above, ObstacleLocations.below, ObstacleLocations.bottomLeft, ObstacleLocations.bottomRight, ObstacleLocations.gameLost, ObstacleLocations.left, ObstacleLocations.noTouch, ObstacleLocations.right, ObstacleLocations.topLeft, ObstacleLocations.topRight
]

export const calculateNextBallDirection = ({
    currentDirection, ballCords, background, playerPosition, isPlayerMovingLeft = false, isPlayerMovingRight = false,
}: NextBallDirectionCalculatorInterface) => {
    if (isGameLost(ballCords, background)) return BallDirections.gameLost
    // const obstacleLocations = calculateObstacleLocations(ballCords);
    const obstacleLocations = getObstacleLocations({background, ballCords, currentDirection, playerPosition})
    if (obstacleLocations.includes(ObstacleLocations.above) && obstacleLocations.includes(ObstacleLocations.left)){
        if (currentDirection === BallDirections.upLeft) return BallDirections.downRight;    
    }
    if (obstacleLocations.includes(ObstacleLocations.above) && obstacleLocations.includes(ObstacleLocations.right)){
        if (currentDirection === BallDirections.upRight) return BallDirections.downLeft;
    }
    if (obstacleLocations.includes(ObstacleLocations.below) && obstacleLocations.includes(ObstacleLocations.right)){
        if (currentDirection === BallDirections.downRight) return BallDirections.upLeft;
    }
    if (obstacleLocations.includes(ObstacleLocations.below) && obstacleLocations.includes(ObstacleLocations.left)){
        if (currentDirection === BallDirections.downLeft) return BallDirections.upRight;
    }


    if (obstacleLocations.includes(ObstacleLocations.above)){
        if (currentDirection === BallDirections.upLeft) return BallDirections.downLeft;
        if (currentDirection === BallDirections.upRight) return BallDirections.downRight;
    }
    if (obstacleLocations.includes(ObstacleLocations.right)){
        if (currentDirection === BallDirections.upRight) return BallDirections.upLeft
        if (currentDirection === BallDirections.downRight) return BallDirections.downLeft
    }
    if (obstacleLocations.includes(ObstacleLocations.left)){
        if (currentDirection === BallDirections.upLeft) return BallDirections.upRight
        if (currentDirection === BallDirections.downLeft) return BallDirections.downRight
    }
    if (obstacleLocations.includes(ObstacleLocations.below)){
        if (currentDirection === BallDirections.downLeft) return BallDirections.upLeft
        if (currentDirection === BallDirections.downRight) return BallDirections.upRight
    }

    return currentDirection;
}

const isGameLost = (ballCords: PawnCords, background: number[][]) => {
    const {row } = ballCords;
    const maxRowIndex = background.length - 1;
    return (row === 0 || row === maxRowIndex)
}

const getMaxCol = (background: number[][]) => background[0].length - 1;
