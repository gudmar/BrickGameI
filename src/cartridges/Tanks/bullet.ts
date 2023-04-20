import { checkIfInBoardBoundreis } from "../../functions/__tests__/checkIfInBoardBoundries";
import { deleteClassInstance } from "../../functions/__tests__/deleteClassInstance";
import { Bulletable, directions, Variants } from "../../types/types";
import { GameCreator, PawnCords } from "../GameCreator";
import { mergeEverythingToLayer } from "./tankUtils";

export class Bullet {
    static nrOfBulletsSoFar:number;
    static instances:Bullet[] = [];
    static buletsSoFar:number;
    variant: Variants;
    direction: directions;
    id: number;
    cords: PawnCords;
    hitCallback = (arg: any) => {};

    static removeInstance(instance:Bullet) {
        const instancesToLeave = Bullet.instances.filter((i: Bullet) => i !== instance)
        Bullet.instances = instancesToLeave
    }
    

    constructor({
        variant, startCords, direction, hitCallback
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
    move(visitedObject: GameCreator){
        this.handleColision(visitedObject);
        this.cords = this.getNextCords();
        mergeEverythingToLayer(visitedObject);
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
        this.handleOutsideBoundries();
    }
    handleOutsideBoundries(){
        const nextCords = this.getNextCords();
        const isInBoardBoundreis = checkIfInBoardBoundreis(nextCords)
        if (!isInBoardBoundreis) this.destroyThisBullet();
    }

    destroyThisBullet() {
        Bullet.removeInstance(this);
        this.hitCallback(this)
        deleteClassInstance(this);
    }
}