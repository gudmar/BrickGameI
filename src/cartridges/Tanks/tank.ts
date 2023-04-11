import { rotateArray } from "../../functions/rotateArray";
import { directions } from "../../types/types";
import { getEmptyBoard } from "../constants";
import { GameCreator, PawnCords } from "../GameCreator";

const PLAYER_TANK = [
    [0, 1, 0],
    [1, 1, 1],
    [1, 1, 1],
]

const ENEMY_TANK = [
    [0, 1, 0],
    [1, 1, 1],
    [1, 0, 1],
]

interface Delta {
    deltaCol:number, deltaRow: number
}

export enum variants {PLAYER, ENEMY}

export class Tank{
    variant = variants.ENEMY;
    currentTank = this.getInitialTank();
    cords:PawnCords;
    isDestroyed = false;
    static instances: Tank[];

    constructor(variant: variants, cords: PawnCords){
        this.currentTank = this.getInitialTank();
        this.variant = variant;
        this.cords = cords;
        if (!Tank.instances) {
            Tank.instances = []
        }
        Tank.instances.push(this);
    }

    static removeDestroyed() {
        const newInstances = Tank.instances.filter(instance => !instance.isDestroyed);
        Tank.instances = newInstances;
    }

    destroy(){
        this.isDestroyed = true;
        Tank.removeDestroyed()
    }

    getInitialTank(){
        if (this.variant === variants.ENEMY) {
            return ENEMY_TANK;
        }
        return PLAYER_TANK;
    }

    rotateLeft(){
        const newTank = rotateArray(this.currentTank, -1);
        this.currentTank = newTank;
    }

    rotateRight(){
        const newTank = rotateArray(this.currentTank, 1);
        this.currentTank = newTank;
    }

    move(visitedObject: GameCreator, direction: directions){
        switch (direction) {
            case directions.UP:
                this.tryMoveUp(visitedObject);
                break;
            case directions.DOWN:
                this.tryMoveDown(visitedObject);
                break;
            case directions.LEFT:
                this.tryMoveLeft(visitedObject);
                break;
            case directions.RIGHT:
                this.tryMoveRight(visitedObject);
                break;
        }
    }
    tryMoveUp(visitedObject:GameCreator){
        const delta = { deltaRow: -1, deltaCol: 0 };
        this.tryMove(visitedObject, delta)
    }
    tryMoveDown(visitedObject:GameCreator){
        const delta = { deltaRow: 1, deltaCol: 0 };
        this.tryMove(visitedObject, delta)
    }
    tryMoveRight(visitedObject:GameCreator){
        const delta = { deltaRow: 0, deltaCol: 1 };
        this.tryMove(visitedObject, delta)
    }
    tryMoveLeft(visitedObject:GameCreator){
        const delta = { deltaRow: 0, deltaCol: -1 };
        this.tryMove(visitedObject, delta)
    }

    tryMove(visitedObject:GameCreator, delta: Delta){
        const {deltaRow, deltaCol} = delta;
        const {row, col} = this.cords;
        const plannedCords = {row: deltaRow + row, col: deltaCol + col }
        const isMovePossible = this.checkIfMoveIsPossible(visitedObject, plannedCords);
        if (isMovePossible) { this.cords = plannedCords; }
    }

    getLayerWithTank(visitedObject:GameCreator) {
        const blankLayer = getEmptyBoard();
        const {row, col} = visitedObject.pawnCords;
    }

    checkIfMoveIsPossible(visitedObject:GameCreator, plannedCords: PawnCords) {

    }
}
