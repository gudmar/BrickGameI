import { Variants } from "../../types/types";
import { Tank } from "./tank";

export class TankCommander___1 {
    static nrOfInstances: number;
    MAX_NR_INSTANCES = 3;
    tankInstance?: Tank;
    instanceNumber:number;
    placed = false;

    constructor() {
        if (!TankCommander___1.nrOfInstances) {
            TankCommander___1.nrOfInstances = 1;
            this.instanceNumber = 1;
            return this;
        }
        if (TankCommander___1.nrOfInstances > this.MAX_NR_INSTANCES) {
            throw new Error(`Only ${this.MAX_NR_INSTANCES} instances may be created`)
        }
        TankCommander___1.nrOfInstances++;
        this.instanceNumber = TankCommander___1.nrOfInstances;
        this.tankInstance = new Tank(Variants.ENEMY, this.getInitialTankCords());
        return this;
    }

    getInitialTankCords() {
        switch(this.instanceNumber){
            case 1: return {col: 1, row: 1};
            case 2: return {col: 8, row: 1};
            case 3: return {col: 1, row: 18};
            default: return {col: 8, row: 18};
        }
    }

    move() {
        // Select one of:
        // place
        // go left
        // go right
        // go up
        // go down
        // Shoot (only one existing bulet)
        // If move not possible try from start, max iter is 50
    }

    tryPlace() {
        // If no colision with other obatacles: set placed to true
    }

    destroy() {
        // set placed to false
    }
}