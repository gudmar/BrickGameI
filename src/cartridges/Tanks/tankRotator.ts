import { copyBackground } from "../../functions/copyBackground";
import { rotateArray } from "../../functions/rotateArray";
import { BrickMap, directions } from "../../types/types";
import { GameCreator } from "../GameCreator";
import { Tank } from "./tank";
import { getLayerWithAllPlacedObstacles, getLayerWithAllPlacedTanks, getLayerWithTank } from "./tankUtils";

export class TankRotator{
    tank:Tank;
    constructor(tank: Tank){
        this.tank = tank;
    }

    copyTank(){
        return copyBackground(this.tank.currentTank);
    }

    getRotatedToRightCopy() {
        switch(this.tank.direction){
            case directions.UP: return rotateArray(this.tank.currentTank, 1);
            case directions.DOWN: return rotateArray(this.tank.currentTank, -1);
            case directions.LEFT: return rotateArray(this.tank.currentTank, 2);
        }
        return copyBackground(this.tank.currentTank)
    }
    getRotatedToLeftCopy() {
        switch(this.tank.direction){
            case directions.UP: return rotateArray(this.tank.currentTank, -1);
            case directions.DOWN: return rotateArray(this.tank.currentTank, 1);
            case directions.RIGHT: return rotateArray(this.tank.currentTank, 2);
        }
        return copyBackground(this.tank.currentTank)
    }
    getRotatedToUpCopy() {
        switch(this.tank.direction){
            case directions.RIGHT: return rotateArray(this.tank.currentTank, -1);
            case directions.LEFT: return rotateArray(this.tank.currentTank, 1);
            case directions.DOWN: return rotateArray(this.tank.currentTank, 2);
        }
        return copyBackground(this.tank.currentTank)
    }
    getRotatedToDownCopy() {
        switch(this.tank.direction){
            case directions.RIGHT: return rotateArray(this.tank.currentTank, 1);
            case directions.LEFT: return rotateArray(this.tank.currentTank, -1);
            case directions.UP: return rotateArray(this.tank.currentTank, 2);
        }
        return copyBackground(this.tank.currentTank)
    }

    getRotatedCopy(moveDirection: directions) {
        switch(moveDirection){
            case directions.UP: return this.getRotatedToUpCopy();
            case directions.DOWN: return this.getRotatedToDownCopy();
            case directions.RIGHT: return this.getRotatedToRightCopy();
            case directions.LEFT: return this.getRotatedToLeftCopy();
            default: copyBackground(this.tank.currentTank)
        }
    }

    tryRotate(visitedObject:GameCreator, moveDirection: directions) {
        if (this.tank.direction === moveDirection) return false;
        const rotatedTankCopy = this.getRotatedCopy(moveDirection);
        const isColision = this.canTankBeRotated(visitedObject, rotatedTankCopy as BrickMap);
        if (isColision) return true;
        this.tank.direction = moveDirection;
        this.tank.currentTank = rotatedTankCopy as number[][];
        const pawnLayer = getLayerWithAllPlacedTanks();
        visitedObject.pawnLayer = pawnLayer;
        return true;
    }

    canTankBeRotated(visitedObject:GameCreator, rotatedTankCopy: BrickMap){
        let isColision = false;
        const setColisionOr = (a: number, b:number) => {
            if (a > 0 && b > 0) {
                isColision = true;
                return 1;
            }
            if ((a > 0 && b === 0) || (b > 0 && a === 0)) return 1;
            return 0
        }
        const layerWithObstaclesCp = getLayerWithAllPlacedObstacles({
            notIncludeTankInstance: this.tank,
            initialLayer: visitedObject.background,
        });
        getLayerWithTank(
            layerWithObstaclesCp, this.tank.cords, rotatedTankCopy, setColisionOr
        )
        return isColision;
    }


}