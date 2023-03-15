import { findLastIndex } from "../../functions/findLastIndex";
import { sumArrayElements } from "../../functions/sumArrayElements";
import { BrickMap, KeyPress, NextFigure } from "../../types/types";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { EMPTY_BOARD, getEmptyBoard } from "../constants";
import { GameCreator, PawnCords } from "../GameCreator";
import { Blocks } from "./blocks";

export class TetrisDecorator {
    constructor() {
        const decoratedClass = new GameCreator(TetrisVisitor, Judge, EMPTY_BOARD);
        return decoratedClass;
    }
}

const gameEvents = {
    DEMOLISH_SINGLE: 'Single score', // 11500 - 10800 = 700
    DEMOLISH_DOUBLE: 'Double score',
    DEMOLISH_TRIPLE: 'Triple score',
    DEMOLISH_QUATRO: 'Quatro score',
}

class Judge {
    inform(visitedObject: any, information: string, pyload?:any){
        switch(information){
            case gameEvents.DEMOLISH_SINGLE: visitedObject.score += 100; break;
            case gameEvents.DEMOLISH_DOUBLE: visitedObject.score += 300; break;
            case gameEvents.DEMOLISH_TRIPLE: visitedObject.score += 700; break;
            case gameEvents.DEMOLISH_QUATRO: visitedObject.score += 1100;
        }
        if (visitedObject.score % 10000) {
            visitedObject.speed += 1;
        }
    }
}

enum MoveDirection {
    down, up, left, right,
}

class TetrisVisitor extends NextStateCalculator {
    initiate(visitedObject: any){
        const blocksInstance = new Blocks()
        visitedObject.name = 'Tetris'
        visitedObject.pawnCords = { col: 5, row: 0 };
        visitedObject.blocksMaker = blocksInstance;
        this.setNewBrick(visitedObject); // visitedObject.currentBlock
        this.placeBlock(visitedObject);
        console.log(visitedObject)
    }

    rotate(visitedObject:any) {
        if (this.isNextRotationValid(visitedObject)) {
            // visitedObject.currentBlock.currentFigure = visitedObject.currentBlock.rotateOnce();
            visitedObject.currentBlock.rotate();
            this.placeBlock(visitedObject);
            console.log(visitedObject)
        }
    }

    setVisitorToNextStateOnTick(visitedObject:any){

    }

    move(visitedObject:any, deltaRow:number, deltaCol:number) {
        const {row, col} = visitedObject.pawnCords
        if (this.isNextMoveValid(visitedObject, {row: deltaRow + row, col:deltaCol + col})){
            visitedObject.resetLayer();
            visitedObject.pawnCords.row = row + deltaRow;
            visitedObject.pawnCords.col = col + deltaCol;
            this.mergeCurrentBlockToLayer(visitedObject);    
        }
    }

    isNextMoveValid(visitedObject:any, newCords:PawnCords) {
        const isInBoundries = this.isNextMoveInBoundries(visitedObject, newCords);
        return isInBoundries;
    }

    isNextMoveInBoundries(visitedObject:any, newCords:PawnCords) {
        if (newCords.row < 0 || newCords.col < 0) return false;
        console.log(newCords)
        const { pawnLayer, currentBlock } = visitedObject;
        const newLayer = this.mergeBlockToLayer({
            layer:getEmptyBoard(),
            block: currentBlock.currentFigure,
            cords: newCords,
        })
        const sumOfCurrentLayer = sumArrayElements(pawnLayer);
        const sumOfNewLayer = sumArrayElements(newLayer);
        console.log(newLayer)
        console.log(sumOfNewLayer, sumOfCurrentLayer, sumOfCurrentLayer === sumOfNewLayer)
        return sumOfCurrentLayer === sumOfNewLayer;
    }

    isNextRotationValid(visitedObject:any) {
        const figureAfterRotation = visitedObject.currentBlock.foretellFigureAfterRotation();
        const sumOfCurrentLayer = sumArrayElements(visitedObject.pawnLayer);
        const sumOfnextLayer = sumArrayElements(this.getMergedBlockToFreshLayer(visitedObject, figureAfterRotation));
        return sumOfCurrentLayer === sumOfnextLayer;
    }

    setNewBrick(visitedObject: any) {
        // visitedObject.currentBrick = visitedObject.blocksMaker.randomBlock;
        visitedObject.currentBlock = visitedObject.blocksMaker.getBlock(1);
    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number){
        // this.move(visitedObject, 1, 0);
        // move down,
        // check if should be merged permanently with background,
        // merge if should be merged
    }

    placeBlock(visitedObject:any) {
        // const { col, row } = visitedObject.currentBlock.currentHandlePoint;
        this.mergeCurrentBlockToLayer(visitedObject);
        // visitedObject.pawnCords.row = row;
    }

    // mergeCurrentBlockToLayer(visitedObject:any){
    //     // const {pawnLayer, currentBlock} = visitedObject;
    //     visitedObject.resetLayer();
    //     const {pawnLayer, currentBlock} = visitedObject;
    //     const {currentFigure, currentHandlePoint} = currentBlock;
    //     visitedObject.pawnLayer = this.mergeBlockToLayer({
    //         // layer: pawnLayer, block: currentFigure, cords: visitedObject.pawnCords
    //         layer: pawnLayer, block: currentFigure, cords: visitedObject.pawnCords
    //     });
    // }

    mergeCurrentBlockToLayer(visitedObject:any){
        visitedObject.resetLayer();
        const {pawnLayer, currentBlock} = visitedObject;
        const {currentFigure, currentHandlePoint} = currentBlock;
        visitedObject.pawnLayer = this.getMergedBlockToFreshLayer(visitedObject, currentFigure)
    }

    getMergedBlockToFreshLayer(visitedObject:any, block:NextFigure) {
        const layer = getEmptyBoard();
        const result = this.mergeBlockToLayer({
            layer, block, cords: visitedObject.pawnCords
        });
        return result;
    }


    mergeBlockToLayer({ layer, block, cords }: { layer: BrickMap, block: NextFigure, cords:PawnCords }) {
        const { col, row } = cords;
        
        const mergeRow = (rowIndex: number) => {
            block[rowIndex].forEach(
                (bit: 0 | 1, colIndex: number) => {
                    if (layer.length - 1 >= rowIndex + row && layer[0].length - 1 >= colIndex) {
                        layer[rowIndex + row][colIndex + col] = bit;
                    }
                }
            )
        }
        block.forEach((row: (0 | 1)[], rowIndex:number) => { mergeRow(rowIndex); })
        return layer;
    }


}
