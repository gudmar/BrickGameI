import { BallDirections } from "../../types/types";
import { setLifesToNextFigure } from "../Functions/setLifesToNextFigure";
import { GameCreator, PawnCords } from "../GameCreator";
import { calculateNextBallDirection } from "./calculateNextBallDirection";
import { LOWER_PLAYER_ROW, PLAYER_LENGTH } from "./constants";
import { getObstacleCords } from "./getObstacleLocations";
import { gameEvents } from "./Judge";
import { TennisVisitor } from "./Tennis";
import { getMaxColIndex, getMaxRowIndex } from "./utils";

export class BallCordsCalculator {
    visitedObject: GameCreator;
    currentBallDirection: BallDirections;
    tennisController: TennisVisitor;

    constructor(visitedObject: GameCreator, tennisController: TennisVisitor) {
        this.currentBallDirection = BallDirections.upRight;
        this.visitedObject = visitedObject;
        this.tennisController = tennisController;
    }

    getIsGameStarted() { return this.visitedObject.isGameStarted }
    getPlayerPosition() {return this.tennisController.pawnLayerRenderer!.playerPosition;}

    public restart() {
        this.currentBallDirection = BallDirections.upRight
    }

    private getBallCordsGameNotStarted(visitedObject: GameCreator){
        return {row: LOWER_PLAYER_ROW - 1, col: this.getPlayerPosition() + 1} 
    }

    public moveBallIfTouchesPlayer(offset:number) {
        if (this.tennisController.shouldMoveBallWithPlayer === false) return;
        const {col, row} = this.visitedObject.pawnCords;
        const playerPosition = this.tennisController.pawnLayerRenderer!.playerPosition;
        const isBallInRow = row === 1 || row === getMaxRowIndex() - 1;
        const isPlayerBallContact = (
            isBallInRow &&
            col >= playerPosition &&
            col < playerPosition + PLAYER_LENGTH
        )
        if (isPlayerBallContact) this.visitedObject.pawnCords.col += offset;
    }

    public renderBall(visitedObject: GameCreator, newLayer: number[][]){
        if (!this.getIsGameStarted()) visitedObject.pawnCords = this.getBallCordsGameNotStarted(visitedObject);
        const {row, col} = visitedObject.pawnCords;
        newLayer[row][col] = 1;
    }

    private hitAllBricks(visitedObject: GameCreator) {
        let newDirection = this.currentBallDirection;
        let bricksToDemolish:PawnCords[] = [];
        do {
            newDirection = calculateNextBallDirection({
                currentDirection: this.currentBallDirection,
                ballCords: visitedObject.pawnCords,
                background: visitedObject.background,
                playerPosition: this.getPlayerPosition(),
                isPlayerMovingLeft: this.tennisController.isPlayerMovingLeft,
                isPlayerMovingRight: this.tennisController.isPlayerMovingRight,
            })
            const nrBricksToScore = this.demolishBricks(visitedObject);
            this.score(visitedObject, nrBricksToScore);
            this.currentBallDirection = newDirection;
            bricksToDemolish = this.getBricksNominatedToDemolish(visitedObject)
        } while (bricksToDemolish.length !== 0);
    }

    private movePawnToNextCords(visitedObject: GameCreator){
        const nextBallPosition = getNewBallCords(this.currentBallDirection, visitedObject.pawnCords);
        visitedObject.pawnCords = nextBallPosition;
    }

    public doBoardSideEffects(visitedObject: GameCreator) {
        this.hitAllBricks(visitedObject);
        this.endGameIfLost(visitedObject);
        this.gemLost(visitedObject);
        if (!visitedObject.isGameOver) {
            this.movePawnToNextCords(visitedObject);
        }
    }

    private score(visitedObject: GameCreator, nrBricks: number){
        switch(nrBricks){
            case 0: break;
            case 1: visitedObject.judge.inform(visitedObject, gameEvents.HIT_1); break;
            case 2: visitedObject.judge.inform(visitedObject, gameEvents.HIT_2); break;
            case 3: visitedObject.judge.inform(visitedObject, gameEvents.HIT_3); break;
            default: throw new Error('Nr of bricks to demolish > 3, this should not happen');
        }
    }

    private getBricksNominatedToDemolish(visitedObject: GameCreator) {
        const nominatedBricks = getObstacleCords({
            background: visitedObject.background,
            ballCords: visitedObject.pawnCords,
            currentDirection: this.currentBallDirection,
        });
        return nominatedBricks;
    }

    private demolishBricks(visitedObject: GameCreator) {
        const nominatedBricks = this.getBricksNominatedToDemolish(visitedObject)
        const bricksToDemolish = filterBricksToDemolish(nominatedBricks);
        const nrOfBricksToScore = bricksToDemolish.length;
        bricksToDemolish.forEach(({col, row}) => visitedObject.background[row][col] = 0)
        return nrOfBricksToScore
    }

    private gemLost(visitedObject: GameCreator) {
        const {row} = visitedObject.pawnCords;
        if (row <= 0 || row >= getMaxRowIndex(visitedObject.background)){
            this.tennisController.lifes -= 1;
            setLifesToNextFigure(this.tennisController, this.visitedObject)
            if (this.tennisController.lifes === 0) {
                visitedObject.isGameOver = true;
                visitedObject.gameLost();
            } else {
                this.tennisController.restart(visitedObject);
            }    
        }
    }

    private endGameIfLost(visitedObject: GameCreator) {
        if (this.tennisController.lifes === 0) {
            visitedObject.isGameOver = true;
        }
    }
}

const filterBricksToDemolish = (bricks: PawnCords[]) => {
    const result = bricks.filter((brick) => shouldBrickBeDemolished(brick));
    return result;
}

const shouldBrickBeDemolished = (brick: PawnCords) => {
    const { row, col } = brick;
    if (
        row >= getMaxRowIndex() - 1 ||
        row <= 1 ||
        col <0 ||
        col > getMaxColIndex()
    ) return false;
    return true;
}

const getNewBallCords = (direction: BallDirections, ballCords: PawnCords) => {
    const {row, col} = ballCords;
    switch(direction){
        case BallDirections.downLeft: return {row: row + 1, col: col - 1}
        case BallDirections.downRight: return {row: row + 1, col: col + 1}
        case BallDirections.upLeft: return {row: row -1, col: col - 1}
        case BallDirections.upRight: return {row: row - 1, col: col + 1}
        default: return ballCords;
    }
}
