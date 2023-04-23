import { checkIfInBoardBoundreis } from "../../functions/__tests__/checkIfInBoardBoundries";
import { deleteClassInstance } from "../../functions/__tests__/deleteClassInstance";
import { Bulletable, directions, Variants } from "../../types/types";
import { GameCreator, PawnCords } from "../GameCreator";
import { checkIfBulletHit } from "./checkIfBulletHit";
import { Tank } from "./tank";
import { mergeEverythingToLayer } from "./tankUtils";

export class Bullet {
    static nrOfBulletsSoFar:number;
    static instances:Bullet[] = [];
    static buletsSoFar:number;
    isMovedThisTurn = false;
    variant: Variants;
    direction: directions;
    id: number;
    cords: PawnCords;
    hitCallback = (arg: any) => {};

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
        variant, startCords, direction, hitCallback = () => {}
    }: Bulletable ) {
        if (!Bullet.nrOfBulletsSoFar) {
            Bullet.nrOfBulletsSoFar = 0;
        } else {
            Bullet.nrOfBulletsSoFar += 1;
        }
        this.direction = direction;
        this.variant = variant;
        this.id = Bullet.nrOfBulletsSoFar;
        this.cords = startCords;
        this.hitCallback = hitCallback;
        Bullet.instances.push(this)
    }
    static moveAllBullets(visitedObject: GameCreator) {
        Bullet.instances.forEach((bullet) => {bullet.move(visitedObject)})
        Bullet.instances.forEach((bullet) => {bullet.handleColision(visitedObject)})
        mergeEverythingToLayer(visitedObject);
    }

    move(visitedObject: GameCreator){
        this.handleOutsideBoundries();
        this.cords = this.getNextCords();
        // this.handleColision(visitedObject);
        // mergeEverythingToLayer(visitedObject);
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
        this.handleColisionWithTank();
        this.handleColisionWithBullet();
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
        }
    }
    handleColisionWithBullet() {
        const isOpositeBulletHit = Bullet.destroyBulletIfHit(this);
        if (isOpositeBulletHit) this.destroyThisBullet()
    }   

    handleColisionWithTank(){
        const isTankHit = Tank.destroyTankIfHit(this.cords, this.variant);
        if (isTankHit) this.destroyThisBullet();
    }

    destroyThisBullet() {
        Bullet.removeInstance(this);
        this.hitCallback(this)
        // deleteClassInstance(this);
    }
}