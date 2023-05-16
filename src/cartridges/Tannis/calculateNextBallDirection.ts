import { updateExpressionWithTypeArguments } from "typescript";
import { BallDirections, directions, ObstacleLocations } from "../../types/types";
import { PawnCords } from "../GameCreator"
import { LAST_COL, LAST_ROW, PLAYER_LENGTH } from "./constants";
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

const isGameLost = (ballCords: PawnCords, background: number[][]) => {
    const {row } = ballCords;
    const maxRowIndex = background.length - 1;
    return (row === 0 || row === maxRowIndex)
}

const throwIfBothDirections = (isPlayerMovingLeft: boolean, isPlayerMovingRight: boolean) => {
    if (isPlayerMovingLeft && isPlayerMovingRight) throw new Error('Player seems moving in both directions: left and right at the same time')
}

const isInteractionWithPlayer = (
    {ballCords, direction, playerPosition, isPlayerMovingLeft, isPlayerMovingRight}:
    {ballCords: PawnCords, direction: BallDirections, playerPosition: number, isPlayerMovingLeft: boolean, isPlayerMovingRight: boolean}
) => {
    const {row, col} = ballCords;
    if (row === 1) {
        if (direction === BallDirections.upLeft) {
            if (isPlayerMovingLeft) {
                if (col === playerPosition - 1) return true
            }
            if (col >= playerPosition && col <= playerPosition + PLAYER_LENGTH + 1) return true;
            if (col === 0 && playerPosition === 1) return true;
        } else if (direction === BallDirections.upRight) {
            if (isPlayerMovingRight) {
                if (col === playerPosition + PLAYER_LENGTH + 1) return true
            }
            if (col >= playerPosition - 1 && col <= playerPosition + PLAYER_LENGTH - 1) return true;
            if (col === LAST_COL && playerPosition === LAST_COL - PLAYER_LENGTH) return true
        }    
    } else if (row === LAST_ROW - 1) {
        if (direction === BallDirections.downLeft) {
            if (isPlayerMovingLeft) {
                if (col === playerPosition - 1) return true;
            }
            if (col >= playerPosition && col <= playerPosition + PLAYER_LENGTH + 1) return true;
            if (col === 0 && playerPosition === 1) return true;
        } else if (direction === BallDirections.downRight) {
            if (isPlayerMovingRight) {
                if (col === playerPosition + PLAYER_LENGTH + 1) return true;
            }
            if (col >= playerPosition - 1 && col <= playerPosition + PLAYER_LENGTH - 1) return true;
            if (col === LAST_COL && playerPosition === LAST_COL - PLAYER_LENGTH) return true
        }
    }
    return false
}

const getDirectionAfterInteractionWithPlayer = (
    { direction, isPlayerMovingLeft, isPlayerMovingRight, ballCords, playerPosition }:
    { direction: BallDirections, isPlayerMovingLeft: boolean, isPlayerMovingRight: boolean, ballCords: PawnCords, playerPosition: number }
) => {
    const { col } = ballCords;
    if (isPlayerMovingLeft) {
        if (direction === BallDirections.upRight) return BallDirections.downLeft;
        if (direction === BallDirections.downRight) return BallDirections.upLeft;
    } else if (isPlayerMovingRight) {
        if (direction === BallDirections.upLeft) return BallDirections.downRight;
        if (direction === BallDirections.downLeft) return BallDirections.upRight;
    }
    if (direction === BallDirections.upLeft) {
        if (col === 0) return BallDirections.downRight;
        if (col === playerPosition + PLAYER_LENGTH) return BallDirections.downRight
        return BallDirections.downLeft;
    }
    if (direction === BallDirections.upRight){
        if (col === LAST_COL) return BallDirections.downLeft;
        if (col === playerPosition - 1) return BallDirections.downLeft
        return BallDirections.downRight;
    }
    if (direction === BallDirections.downLeft){
        if (col === 0) return BallDirections.upRight;
        if (col === playerPosition + PLAYER_LENGTH) return BallDirections.upRight
        return BallDirections.upLeft;
    }
    if (direction === BallDirections.downRight){
        if (col === LAST_COL) return BallDirections.upLeft;
        if (col === playerPosition - 1) return BallDirections.upLeft
        return BallDirections.upRight;
    }
    throw new Error('getting direction after interaction with player: some case is missed')
}

export const calculateNextBallDirection = ({
    currentDirection, ballCords, background, playerPosition, isPlayerMovingLeft = false, isPlayerMovingRight = false,
}: NextBallDirectionCalculatorInterface) => {
    const {row, col} = ballCords;
    throwIfBothDirections(isPlayerMovingLeft, isPlayerMovingRight);
    if (isGameLost(ballCords, background)) return BallDirections.gameLost
    // const obstacleLocations = calculateObstacleLocations(ballCords);
    const obstacleLocations = getObstacleLocations({background, ballCords, currentDirection, playerPosition})

    if (isInteractionWithPlayer({ballCords, direction: currentDirection, playerPosition, isPlayerMovingLeft, isPlayerMovingRight})) {
        const newDirection = getDirectionAfterInteractionWithPlayer(
            { direction: currentDirection, isPlayerMovingLeft, isPlayerMovingRight, ballCords, playerPosition }
        )
        return newDirection;
    }
    
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


const getMaxCol = (background: number[][]) => { return background[0].length - 1};
