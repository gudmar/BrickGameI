import { directions, Variants } from "../../types/types";
import { GameCreator, PawnCords } from "../GameCreator";
import { TankRotator } from "./tankRotator";
import { checkIsColision, didRotate, getLayerWithAllPlacedObstacles, getLayerWithAllPlacedTanks, getLayerWithTank } from "./tankUtils";

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

export class Tank{
    variant = Variants.ENEMY;
    currentTank = this.getInitialTank();
    cords:PawnCords;
    isDestroyed = false;
    isPlacedOnBoard = false;
    direction: directions = directions.UP;
    tankRotator: TankRotator;
    static instances: Tank[];

    constructor(variant: Variants, cords: PawnCords){
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
        this.setInitialOrientationIfEnemy();
    }

    setInitialOrientationIfEnemy() {
        // if (this.variant === Variants.ENEMY) {
        //     const nrOfRotations = getRandom(0, 3);
        //     for (let i = 0; i < nrOfRotations; i++) {
        //         this.rotateLeft();
        //     }
        // }
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

    move(visitedObject: GameCreator, direction: directions){
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
        getLayerWithTank(layerWithPlacedTanks, this.cords, this.currentTank, setColisionOr);
        if (!isColision) this.isPlacedOnBoard = true;
    }

    destroy(){
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

