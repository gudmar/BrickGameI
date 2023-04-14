import { directions, Variants } from "../../types/types";
import { PawnCords } from "../GameCreator";

export class Bullet {
    static nrOfBulletsSoFar:number;
    static allBullets:Bullet[];
    static buletsSoFar:number;
    variant: Variants;
    direction: directions;
    id: number;
    cords: PawnCords;
    

    constructor(variant: Variants, startCords: PawnCords, direction: directions) {
        if (!Bullet.nrOfBulletsSoFar) {
            Bullet.nrOfBulletsSoFar = 0;
        } else {
            Bullet.nrOfBulletsSoFar += 1;
        }
        this.direction = direction;
        this.variant = variant;
        this.id = Bullet.nrOfBulletsSoFar;
        this.cords = startCords;
        Bullet.allBullets.push(this)
    }
}