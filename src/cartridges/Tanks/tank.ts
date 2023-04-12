import { AmdDependency } from "typescript";
import { rotateArray } from "../../functions/rotateArray";
import { directions } from "../../types/types";
import { getEmptyBoard } from "../constants";
import { GameCreator, PawnCords } from "../GameCreator";
import { and, or } from "../layers/toggle/toggleFunction";

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

    getLayerWithTank(tankObject) {
        const blankLayer = getEmptyBoard();
        const {row, col} = visitedObject.pawnCords;
    }

    static summAllTankLayers = () => {
        const blankLayer = getEmptyBoard();

    }

    checkIfMoveIsPossible(visitedObject:GameCreator, plannedCords: PawnCords) {

    }
}

const getPlannedCords = (iteratedTank: Tank, checkedTank: Tank, delta: PawnCords) => {
    if (iteratedTank === checkedTank) {
        const {row, col} = checkedTank.cords;
        return {row: row + delta.row, col: col + delta.col}
    }
    return iteratedTank.cords;
}

export const checkIsColision = (tank: Tank, visitedObject: GameCreator, delta: PawnCords) => {
    let bgCopy: number[][] = getMergedLayers(getEmptyBoard(), visitedObject.background);
    let isColision = false;
    const mergeWithCheck = (brickA:number, brickB:number) => {
        if (brickA === 1 && brickB === 1) isColision = true;
        return brickA || brickB ? 1 : 0
    }
    Tank.instances.forEach((tankInstance: Tank) => {
        const {col, row} = getPlannedCords(tankInstance, tank, delta);
        const isOutsieBoundreis = checkIfOutsideBoundries(bgCopy, {col, row});
        if (isOutsieBoundreis) isColision = true;
        bgCopy = getLayerWithTank(bgCopy, {col, row}, tankInstance.currentTank, mergeWithCheck)
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
