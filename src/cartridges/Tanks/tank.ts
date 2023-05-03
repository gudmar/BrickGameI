import { getBoardMaxIndexes } from "../../functions/getBoardMaxIndexes";
import { getRandom } from "../../functions/getRandom";
import { rotateArray } from "../../functions/rotateArray";
import { directions, Variants } from "../../types/types";
import { GameCreator, PawnCords } from "../GameCreator";
import { Bullet } from "./bullet";
import { TankRotator } from "./tankRotator";
import { TankVisitor } from "./tanks";
import { checkIsColision, didRotate, getLayerWithAllPlacedObstacles, getLayerWithAllPlacedTanks, getLayerWithTank, getRotatedDirection } from "./tankUtils";

const PLAYER_TANK = [
    [0, 1, 0],
    [1, 1, 1],
    [1, 1, 1],
]

export const ENEMY_TANK = [
    [0, 1, 0],
    [1, 1, 1],
    [1, 0, 1],
]

export class Tank{
    variant = Variants.ENEMY;
    currentTank = this.getInitialTank();
    cords:PawnCords;
    isDestroyed = false;
    isPlacedOnBoard = false;
    direction: directions = directions.UP;
    tankRotator: TankRotator;
    nrOfBulletsShot: number = 0;
    MAX_ENEMY_BULLETS: number = 1;
    MAX_PLAYER_BULLETS: number = 4;
    NR_TURNS_NOT_AVAILABLE = 4;
    nrTurnsNotAvailableAfterHit = 0;
    canBePlaced = true;
    nextStateCalculator?: TankVisitor;
    static MAX_NR_TURNS_CHEET_WORKS = 10;
    static _temporaryFreezeEnemyTanks = false;
    static nrOfTurnsFromCheetCode = 0;
    static instances: Tank[];
    
    
    static set temporaryFreezeEnemyTanks(val: boolean) {
        Tank.nrOfTurnsFromCheetCode = 0;
        Tank._temporaryFreezeEnemyTanks = val;
    }

    static tryDeleteCheetFlag() {
        Tank.nrOfTurnsFromCheetCode++;
        if (Tank.nrOfTurnsFromCheetCode === Tank.MAX_NR_TURNS_CHEET_WORKS) {
            Tank.temporaryFreezeEnemyTanks = false;
        }
    }

    static get temporaryFreezeEnemyTanks(){ return Tank._temporaryFreezeEnemyTanks }

    static destroyTankIfHit(cords:PawnCords, bulletVariant: Variants) {
        const isTankDestroyed = Tank.instances.find((instance) =>
            instance.destroyIfHit(cords, bulletVariant)
        );
        return isTankDestroyed;
    }

    constructor(variant: Variants, cords: PawnCords, nextStateCalculator?: TankVisitor){
        this.nextStateCalculator = nextStateCalculator;
        this.variant = variant;
        this.currentTank = this.getInitialTank();
        this.cords = cords;
        if (!Tank.instances) {
            Tank.instances = []
        }
        Tank.instances.push(this);
        this.tryPlacing();
        this.tankRotator = new TankRotator(this);
    }

    setInitialTank() {
        this.currentTank = this.getInitialTank();
        this.setInitialOrientationIfPlayer();
    }

    setInitialOrientationIfPlayer() {
        this.direction = directions.UP;
    }

    shot(visitedObject: GameCreator) {
        if (this.variant === Variants.ENEMY && Tank.temporaryFreezeEnemyTanks) return;
        const startCords = this.getCordsOfShotBullet();
        if (this.isNrOfBulletsExceeded()) return false;
        const {maxHeightIndex, maxWidthIndex} = getBoardMaxIndexes(visitedObject);
        if (startCords.row < 0 || startCords.col < 0 || startCords.row > maxHeightIndex - 1 || startCords.col > maxWidthIndex - 1) {
            return false;
        }
        const bullet = new Bullet({
            startCords,
            sourceTank: this,
            hitCallback: () => {this.nrOfBulletsShot--},
            nextStateCalculator: this.nextStateCalculator,
        })
        this.nrOfBulletsShot++;
        bullet.handleColision(visitedObject)
        return true;
    }

    isNrOfBulletsExceeded() {
        return this.variant === Variants.ENEMY ? this.nrOfBulletsShot >= this.MAX_ENEMY_BULLETS : this.nrOfBulletsShot >= this.MAX_PLAYER_BULLETS;
    }

    getCordsOfShotBullet() {
        const TANK_CENTER_TO_BARREL_DISTANCE = 2
        const {row: tankRow, col: tankCol} = this.cords;
        switch(this.direction){
            case directions.UP: return {row: tankRow - TANK_CENTER_TO_BARREL_DISTANCE, col: tankCol}
            case directions.DOWN: return {row: tankRow + TANK_CENTER_TO_BARREL_DISTANCE, col: tankCol}
            case directions.LEFT: return {row: tankRow, col: tankCol - TANK_CENTER_TO_BARREL_DISTANCE}
            default: return {row: tankRow, col: tankCol + TANK_CENTER_TO_BARREL_DISTANCE}
        }
    }

    delete() {
        const myIndex = Tank.instances.findIndex((tank:Tank) => tank === this)
        if (myIndex < 0) throw new Error('Tank instance not found!!! Will not be deleted');
        Tank.instances.splice(myIndex, 1);
    }

    getInitialTank(){
        if (this.variant === Variants.ENEMY) {
            return ENEMY_TANK;
        }
        return PLAYER_TANK;
    }

    correctCanBePlaced() {
        if (!this.isPlacedOnBoard) this.nrTurnsNotAvailableAfterHit++;
        if (this.isPlacedOnBoard) this.nrTurnsNotAvailableAfterHit = 0;
        if (this.nrTurnsNotAvailableAfterHit > this.NR_TURNS_NOT_AVAILABLE) this.canBePlaced = true;
    }

    move(visitedObject: GameCreator, direction: directions){
        if (Tank.temporaryFreezeEnemyTanks && this.variant !== Variants.PLAYER) return;
        const rotationOutcome = this.tankRotator.tryRotate(visitedObject, direction);
        if (rotationOutcome === didRotate.ROTATED) return;
        if (rotationOutcome === didRotate.NOT_ROTATED) {
            switch (direction) {
                case directions.UP: this.tryMoveUp(visitedObject); break;
                case directions.DOWN: this.tryMoveDown(visitedObject); break;
                case directions.LEFT: this.tryMoveLeft(visitedObject); break;
                case directions.RIGHT: this.tryMoveRight(visitedObject); break;
            }    
        }
        if (rotationOutcome === didRotate.COLISION) {
            switch (direction) {
                case directions.UP:
                    if (this.direction === directions.DOWN)
                        this.tryMoveUp(visitedObject);
                    break;
                case directions.DOWN:
                    if (this.direction === directions.UP)
                        this.tryMoveDown(visitedObject);
                    break;
                case directions.LEFT:
                    if (this.direction === directions.RIGHT)
                        this.tryMoveLeft(visitedObject);
                    break;
                case directions.RIGHT:
                    if (this.direction === directions.LEFT)
                        this.tryMoveRight(visitedObject);
                    break;
            }    
        }
    }
    tryMoveUp(visitedObject:GameCreator){
        const delta = { row: -1, col: 0 };
        this.tryMove(visitedObject, delta)
    }
    tryMoveDown(visitedObject:GameCreator){
        const delta = { row: 1, col: 0 };
        this.tryMove(visitedObject, delta)
    }
    tryMoveRight(visitedObject:GameCreator){
        const delta = { row: 0, col: 1 };
        this.tryMove(visitedObject, delta)
    }
    tryMoveLeft(visitedObject:GameCreator){
        const delta = { row: 0, col: -1 };
        this.tryMove(visitedObject, delta)
    }

    randomlyRotateTank() {
        const nrOfRotations = getRandom(0, 3);
        this.currentTank = rotateArray(this.currentTank, nrOfRotations);
        this.direction = getRotatedDirection(this.direction, nrOfRotations)
    }

    tryPlacing() {
        let isColision = false;
        const setColisionOr = (a: number, b:number) => {
            if (a > 0 && b > 0) {
                isColision = true;
                return 1;
            }
            if ((a > 0 && b === 0) || (b > 0 && a === 0)) return 1;
            return 0
        }
        if (this.isPlacedOnBoard) return;
        const layerWithPlacedTanks = getLayerWithAllPlacedObstacles({
            mergeFunction: setColisionOr
        });
        if (this.variant === Variants.ENEMY) this.randomlyRotateTank();
        getLayerWithTank(layerWithPlacedTanks, this.cords, this.currentTank, setColisionOr);
        if (!isColision) this.isPlacedOnBoard = true;
    }

    destroyIfHit(cordsToCheck: PawnCords, bulletVariant: Variants) {
        
        if (!this.isPlacedOnBoard) return false;
        const {row, col} = cordsToCheck;
        const tankCords = this.getCordsTakenByTank();
        const isThisTankHit = tankCords.find(({row: brickRow, col: brickCol}) => {
            return row === brickRow && col === brickCol
        })
        if (isThisTankHit) {
            if (this.variant !== bulletVariant){
                this.destroy();
            }
            return true;
        }
        return false;
    }

    getCordsTakenByTank() {
        const cords: PawnCords[] = [];
        const tankCordsOffset = -1;
        this.currentTank.forEach((row, rowIndex) => {
            row.forEach((brick, colIndex) => {
                const isThisTankBody = brick;
                if (isThisTankBody) {
                    const rowToAdd = this.cords.row + rowIndex + tankCordsOffset;
                    const colToAdd = this.cords.col + colIndex + tankCordsOffset;
                    cords.push({col: colToAdd, row: rowToAdd})    
                }
            })
        })
        return cords;
    }

    destroy(){
        this.canBePlaced = false;
        this.isPlacedOnBoard = false; // tanks are not destroyed, they are just temporary removed from board
    }

    tryMove(visitedObject:GameCreator, delta: PawnCords){
        const {row: deltaRow, col: deltaCol} = delta;
        const {row, col} = this.cords;
        const plannedCords = {row: deltaRow + row, col: deltaCol + col }
        const isMovePossible = !checkIsColision(this, visitedObject, delta)
        if (isMovePossible) { this.cords = plannedCords; }
        visitedObject.pawnLayer = getLayerWithAllPlacedTanks();
    }
}

