import { checkIfInBoardBoundreis } from "../../functions/checkIfInBoardBoundries";
import { Bulletable, directions, Variants } from "../../types/types";
import { GameCreator, PawnCords } from "../GameCreator";
import { checkIfBulletHit } from "./checkIfBulletHit";
import { gameEvents, Judge } from "./judge";
import { Tank } from "./tank";
import { TankVisitor } from "./tanks";

export class Bullet {
    static nrOfBulletsSoFar:number;
    static instances:Bullet[] = [];
    static buletsSoFar:number;
    isMovedThisTurn = false;
    variant: Variants;
    direction: directions;
    id: number;
    cords: PawnCords;
    sourceTank: Tank;
    judge = new Judge();
    hitCallback = (arg: any) => {};
    nextStateCalculator?: TankVisitor;

    static removeInstance(instance:Bullet) {
        const instancesToLeave = Bullet.instances.filter((i: Bullet) => i !== instance)
        Bullet.instances = instancesToLeave
    }
    
    static destroyBulletIfHit(bulletInstance: Bullet) {
        const wasBulletDestroyed = Bullet.instances.some((bullet) => bullet.destroyThisBulletIfHit(bulletInstance))
        return wasBulletDestroyed
    }

    destroyThisBulletIfHit(bulletInstance: Bullet) {
        if (bulletInstance === this) return false;
        const isThisBulletHit = checkIfBulletHit(this, bulletInstance)
        if (isThisBulletHit) {
            this.destroyThisBullet();
            return true;
        }
        return false;
    }

    constructor({
        startCords, sourceTank, hitCallback = () => {}, nextStateCalculator,
    }: Bulletable ) {
        if (!Bullet.nrOfBulletsSoFar) {
            Bullet.nrOfBulletsSoFar = 0;
        } else {
            Bullet.nrOfBulletsSoFar += 1;
        }
        this.direction = sourceTank.direction;
        const isAnyBulletOwnedByThisTank = Bullet.isAnyBulletOwnedByThisTank(sourceTank);
        this.sourceTank = sourceTank;
        this.variant = sourceTank.variant;
        this.id = Bullet.nrOfBulletsSoFar;
        this.cords = startCords;
        this.hitCallback = hitCallback;
        this.nextStateCalculator = nextStateCalculator;

        if (!(isAnyBulletOwnedByThisTank && sourceTank.variant === Variants.ENEMY)) Bullet.instances.push(this)
    }
    static moveAllBullets(tanksInstance: TankVisitor, visitedObject: GameCreator) {
        Bullet.instances.forEach((bullet) => {bullet.move(visitedObject)})
        Bullet.instances.forEach((bullet) => {bullet.handleColision(visitedObject)})
    }
    static isAnyBulletOwnedByThisTank(tank: Tank) {
        return Bullet.instances.some(({sourceTank}) => sourceTank === tank)
    }

    move(visitedObject: GameCreator){
        this.handleOutsideBoundries();
        this.cords = this.getNextCords();
    }

    getNextCords(){
        switch(this.direction){
            case directions.DOWN: return { row: this.cords.row + 1, col: this.cords.col };
            case directions.UP: return { row: this.cords.row - 1, col: this.cords.col };
            case directions.RIGHT:  return { row: this.cords.row, col: this.cords.col + 1 };
            case directions.LEFT: return { row: this.cords.row, col: this.cords.col - 1 };
            default: return { row: this.cords.row, col: this.cords.col }
        }
    }

    handleColision(visitedObject: GameCreator) {
        // this.handleOutsideBoundries();
        this.handleObstacleColision(visitedObject);
        this.handleColisionWithTank(visitedObject);
        this.handleColisionWithBullet(visitedObject);
    }
    handleOutsideBoundries(){
        const nextCords = this.getNextCords();
        const isInBoardBoundreis = checkIfInBoardBoundreis(nextCords)
        if (!isInBoardBoundreis) this.destroyThisBullet();
    }
    handleObstacleColision(visitedObject: GameCreator){
        const {row, col} = this.cords;
        const isObstacle = visitedObject.background[row][col];
        
        if (isObstacle) {
            visitedObject.background[row][col] = 0;
            this.destroyThisBullet();
            if (this.variant === Variants.PLAYER) {
                this.judge.inform(visitedObject, gameEvents.HIT_BRICK);
            }
        }
    }
    handleColisionWithBullet(visitedObject: GameCreator) {
        const isOpositeBulletHit = Bullet.destroyBulletIfHit(this);
        if (isOpositeBulletHit) {
            this.destroyThisBullet();
            this.judge.inform(visitedObject, gameEvents.HIT_BULLET)
        }
    }   

    handleColisionWithTank(visitedObject: GameCreator){
        const hitTank = Tank.destroyTankIfHit(this.cords, this.variant);
        if (hitTank !== undefined) {
            this.destroyThisBullet();
            if (this.variant === Variants.PLAYER){
                this.judge.inform(visitedObject, gameEvents.HIT_TANK)
            } else if (this.variant === Variants.ENEMY && hitTank.variant === Variants.PLAYER) {
                if (this.nextStateCalculator !== undefined) {
                    this.nextStateCalculator.lifes--;
                    this.nextStateCalculator.reInitiateGame(visitedObject);    
                }
            }
        }
    }

    destroyThisBullet() {
        Bullet.removeInstance(this);
        this.hitCallback(this)
    }
}