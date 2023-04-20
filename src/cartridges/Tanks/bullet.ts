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
        Bullet.instances.push(this)
    }
    move(visitedObject: GameCreator){
        switch(this.direction){
            case directions.DOWN: this.cords.row += 1; break;
            case directions.UP: this.cords.row -= 1; break;
            case directions.RIGHT: this.cords.col += 1; break;
            case directions.LEFT: this.cords.col -= 1; break;
        }
        mergeEverythingToLayer(visitedObject);
    }

}