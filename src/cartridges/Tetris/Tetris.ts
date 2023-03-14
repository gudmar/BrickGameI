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
        this.setNewBrick(visitedObject);
        this.placeNewBlock(visitedObject);
        console.log(visitedObject)
    }

    setVisitorToNextStateOnTick(visitedObject:any){

    }

    // setVisitorToNextStateOnKeyPress(visitedObject:any, keyPresses: KeyPress){
    //     if (keyPresses === KeyPress.Speed) {visitedObject.increaseSpeed()}
    //     if (keyPresses === KeyPress.Level) {visitedObject.increaseLevel()}
    //     if (keyPresses === KeyPress.Start) {
    //         this.restart(visitedObject);
    //         visitedObject.startGame();
    //     }
    //     if (keyPresses === KeyPress.Pause) {visitedObject.pauseGame()}
    //     if (!visitedObject.checkIfGameLocked()) {
    //         this.tryMoving(visitedObject, keyPresses);
    //     }
    // }

    // tryMoving( visitedObject: any, keyPresses: KeyPress ) {

    //     if (keyPresses === KeyPress.Down) this.move(visitedObject, 1, 0);
    //     if (keyPresses === KeyPress.Up) this.move(visitedObject, -1, 0);
    //     if (keyPresses === KeyPress.Left) this.move(visitedObject, 0, -1);
    //     if (keyPresses === KeyPress.Right) this.move(visitedObject, 0, 1);
    // }

    // restart(visitedObject:any){
    //     if (visitedObject.isGameWon || visitedObject.isGameOver){
    //         this.initiate(visitedObject);
    //         visitedObject.restart();    
    //     }
    // }

    // tryMoving( visitedObject: any, keyPresses: KeyPress ) {
    //     console.log('try moving')
    //     if (keyPresses === KeyPress.Down) this.tryMoveDown(visitedObject);
    //     if (keyPresses === KeyPress.Up) this.tryMoveUp(visitedObject);
    //     if (keyPresses === KeyPress.Left) this.tryMoveLeft(visitedObject);
    //     if (keyPresses === KeyPress.Right) this.tryMoveRight(visitedObject);
    // }

    // tryMoveDown(visitedObject:any) {
    //     visitedObject.pawnCords.row += 1;
    //     this.move(visitedObject);
    // }
    // tryMoveUp(visitedObject:any) {
    //     visitedObject.pawnCords.row -= 1;
    //     this.move(visitedObject);
    // }
    // tryMoveLeft(visitedObject:any) {
    //     visitedObject.pawnCords.col -= 1;
    //     this.move(visitedObject);
    // }
    // tryMoveRight(visitedObject:any){
    //     visitedObject.pawnCords.col += 1;
    //     this.move(visitedObject);
    // }

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


    // getRowOfZeros(array:any){
    //     const { lenght } = array;
    //     const newArr = [];
    //     for(let i = 0; i < lenght; i++){
    //         newArr.push(0)
    //     }
    //     return newArr;
    // }

    // findFirstBlockBrickRowIndexFromTop(visitedObject:any){
    //     const {pawnLayer: layer} = visitedObject;
    //     const result = layer.findIndex((row:(0 | 1)[] ) => this.isRowEngaged(row))
    //     return result;
    // }

    // findFirstBlockBrickRowIndexFromBottom(visitedObject:any){
    //     const {pawnLayer: layer} = visitedObject;
    //     // const result = layer.findLastIndex((row:(0 | 1)[] ) => this.isRowEngaged(row))
    //     const result = findLastIndex(layer, (row:(0 | 1)[] ) => this.isRowEngaged(row));
    //     return result;
    // }

    // isRowEngaged(row: (0 | 1)[]){
    //     return row.some(bit => bit === 1)
    // }

    setNewBrick(visitedObject: any) {
        // visitedObject.currentBrick = visitedObject.blocksMaker.randomBlock;
        visitedObject.currentBlock = visitedObject.blocksMaker.getBlock(0);
    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number){
        // this.move(visitedObject, 1, 0);
        // move down,
        // check if should be merged permanently with background,
        // merge if should be merged
    }

    placeNewBlock(visitedObject:any) {
        const { col, row } = visitedObject.currentBlock.currentHandlePoint;
        this.mergeCurrentBlockToLayer(visitedObject);
        // visitedObject.pawnCords.row = row;
    }

    mergeCurrentBlockToLayer(visitedObject:any){
        const {pawnLayer, currentBlock} = visitedObject;
        const {currentFigure, currentHandlePoint} = currentBlock;
        visitedObject.resetLayer();

        visitedObject.pawnLayer = this.mergeBlockToLayer({
            layer: pawnLayer, block: currentFigure, cords: visitedObject.pawnCords
        });
    }


    mergeBlockToLayer({ layer, block, cords }: { layer: BrickMap, block: NextFigure, cords:PawnCords }) {
        const { col, row } = cords;
        
        const mergeRow = (rowIndex: number) => {
            block[rowIndex].forEach(
                (bit: 0 | 1, colIndex: number) => {
                    layer[rowIndex + row][colIndex + col] = bit;
                }
            )
        }
        block.forEach((row: (0 | 1)[], rowIndex:number) => { mergeRow(rowIndex); })
        return layer;
    }


}
