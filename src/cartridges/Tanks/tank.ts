import { copyBackground } from "../../functions/copyBackground";
import { rotateArray } from "../../functions/rotateArray";
import { BrickMap, directions, Variants } from "../../types/types";
import { getEmptyBoard } from "../constants";
import { GameCreator, PawnCords } from "../GameCreator";
import { or } from "../layers/toggle/toggleFunction";
import { Bullet } from "./bullet";

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
    static instances: Tank[];

    constructor(variant: Variants, cords: PawnCords){
        this.currentTank = this.getInitialTank();
        this.variant = variant;
        this.cords = cords;
        if (!Tank.instances) {
            Tank.instances = []
        }
        Tank.instances.push(this);
        this.tryPlacing();
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
        // const layerWithPlacedTanks = getLayerWithAllPlacedTanks(undefined, setColisionOr);
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
    }

    // getLayerWithTank(tankObject) {
    //     const blankLayer = getEmptyBoard();
    //     const {row, col} = visitedObject.pawnCords;
    // }

    static summAllTankLayers = () => {
        const blankLayer = getEmptyBoard();

    }
}

const getPlannedCords = (iteratedTank: Tank, checkedTank: Tank, delta: PawnCords) => {
    if (iteratedTank === checkedTank) {
        const {row, col} = checkedTank.cords;
        return {row: row + delta.row, col: col + delta.col}
    }
    return iteratedTank.cords;
}

export const mergeAllPlacedTanks = (layer: BrickMap) => {
    let layerCp: BrickMap = getMergedLayers( getEmptyBoard(), layer);
    Tank.instances.forEach((tankInstance: Tank) => {
        if (tankInstance.isPlacedOnBoard) {
            layerCp = getLayerWithTank(layerCp, tankInstance.cords, tankInstance.currentTank);
        }
    })
    return layerCp;
}

export const checkIsColision = (tank: Tank, visitedObject: GameCreator, delta: PawnCords) => {
    let bgCopy: number[][] = getMergedLayers(getEmptyBoard(), visitedObject.background);
    let isColision = false;
    const mergeWithCheck = (brickA:number, brickB:number) => {
        if (brickA === 1 && brickB === 1) isColision = true;
        return brickA || brickB ? 1 : 0
    }
    Tank.instances.forEach((tankInstance: Tank) => {
        if (tankInstance.isPlacedOnBoard) {
            const {col, row} = getPlannedCords(tankInstance, tank, delta);
            const isOutsieBoundreis = checkIfOutsideBoundries(bgCopy, {col, row});
            if (isOutsieBoundreis) isColision = true;
            bgCopy = getLayerWithTank(bgCopy, {col, row}, tankInstance.currentTank, mergeWithCheck)    
        }
    })
    return isColision;
}

const checkIfOutsideBoundries = (background: number[][], plannedCords: PawnCords) => {
    const maxWidthIndex = background[0].length - 1;
    const maxHeightIndex = background.length - 1;
    const {col, row} = plannedCords
    const isColisionWithTopEdge = row < 1;
    const isColisionWithBottomEdge = row > maxHeightIndex -1;
    const isColisionWithRightEdge = col > maxWidthIndex - 1;
    const isColisionWithLeftEdge = col < 1;
    return isColisionWithBottomEdge || 
             isColisionWithLeftEdge || 
             isColisionWithRightEdge || 
             isColisionWithTopEdge

}

const getMergedLayers = (layerA: number[][], layerB: number[][], mergeFunction = or) => {
    const mergeRows = (rowA:number[], rowB:number[]) => rowA.map((aItem:number, index:number) => mergeFunction(aItem, rowB[index]));
    const merged = layerA.map((row, index) => mergeRows(row, layerB[index]));
    return merged;
} 

export const getLayerWithTank = (layer: number[][], tankCords: PawnCords, tankMap: number[][], mergeFunction = or) => {
    const tankUpperLeftCorner = {row: tankCords.row -1, col: tankCords.col - 1};
    tankMap.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const rowAtLayer = rowIndex + tankUpperLeftCorner.row;
            const colAtLayer = colIndex + tankUpperLeftCorner.col;
            const layerBrickAtPoint = layer[rowAtLayer][colAtLayer];
            const tankBrickAtPoint = tankMap[rowIndex][colIndex];
            const resultBrick = mergeFunction(tankBrickAtPoint, layerBrickAtPoint);
            layer[rowAtLayer][colAtLayer] = resultBrick
        })
    })
    return layer;
};

interface GetLayerWithObstaclesInterface {
    notIncludeTankInstance?: Tank,
    initialLayer?: number[][],
    mergeFunction?: (a:number, b:number)=>(1|0)
}

export const getLayerWithAllPlacedObstacles = ({ notIncludeTankInstance, initialLayer, mergeFunction}:GetLayerWithObstaclesInterface) => {
    if (!initialLayer) initialLayer = getEmptyBoard();
    if (!mergeFunction) mergeFunction = or;
    let layerCopy = copyBackground(initialLayer);
    const tanks = Tank.instances || [];
    const bullets = Bullet.instances || [];
    bullets.forEach(bullet => {
        const {row, col} = bullet.cords;
        layerCopy[row][col] = 1
    })
    tanks.forEach(tank => {
        if (tank !== notIncludeTankInstance && tank.isPlacedOnBoard)
            layerCopy = getLayerWithTank(layerCopy, tank.cords, tank.currentTank, mergeFunction)
    })
    return layerCopy;
}

export const getLayerWithAllPlacedTanks = (notIncludeTankInstance?:Tank, mergeFunction:(a:number, b:number)=>(1|0) = or) => {
    let initialLayer = getEmptyBoard();
    const tanks = Tank.instances || [];
    tanks.forEach(tank => {
        if (tank !== notIncludeTankInstance && tank.isPlacedOnBoard)
            initialLayer = getLayerWithTank(initialLayer, tank.cords, tank.currentTank, mergeFunction)
    })
    return initialLayer;
}
