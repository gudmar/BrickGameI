import { copyBackground } from "../../functions/copyBackground";
import { BrickMap } from "../../types/types";
import { getEmptyBoard } from "../constants";
import { GameCreator, PawnCords } from "../GameCreator";
import { or } from "../layers/toggle/toggleFunction";
import { Bullet } from "./bullet";
import { Tank } from "./tank";

export enum didRotate {ROTATED, COLISION, NOT_ROTATED}

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
            if (isOutsieBoundreis) {
                isColision = true;
                return true;
            }
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

export const mergeEverythingToLayer = (visitedObject: GameCreator) => {

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