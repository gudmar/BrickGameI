import { addSyntheticLeadingComment, DiagnosticCategory } from "typescript";
import { findLastIndex } from "../../functions/findLastIndex";
import { sumArrayElements } from "../../functions/sumArrayElements";
import { BrickMap, KeyPress, NextFigure } from "../../types/types";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { EMPTY_BOARD, getEmptyBoard } from "../constants";
import { GameCreator, PawnCords } from "../GameCreator";
import { and, or } from "../layers/toggle/toggleFunction";
import { BlockData, Blocks } from "./blocks";

const SINGLE_ANIMATION_DELAY = 500;

export class TetrisDecorator {
    constructor() {
        const decoratedClass = new GameCreator(TetrisVisitor, Judge, EMPTY_BOARD);
        return decoratedClass;
    }
}

const gameEvents = {
    NO_DEMOLITION: 'Dont demolish',
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
        // if (visitedObject.score % 10000) {
        //     visitedObject.speed += 1;
        // }
    }
}

enum MoveDirection {
    down, up, left, right,
}

export class TetrisVisitor extends NextStateCalculator {
    initiate(visitedObject: any){
        const blocksInstance = new Blocks()
        const juggernaut = new Juggernaut(visitedObject);
        visitedObject.name = 'Tetris'
        visitedObject.blocksMaker = blocksInstance;
        visitedObject.juggernaut = juggernaut;
        this.setNewBrick(visitedObject);
        visitedObject.pawnCords = this.getStartingCords(visitedObject.currentBlock)
        this.placeBlock(visitedObject);

    }

    getStartingCords(block: BlockData){
        return { col: 3, row: 5 };
    }

    rotate(visitedObject:any) {
        if (this.isNextRotationValid(visitedObject)) {
            visitedObject.currentBlock.rotate();
            this.placeBlock(visitedObject);
        }
    }

    setVisitorToNextStateOnTick(visitedObject:any){
        //////////////////////////
    }

    async move(visitedObject:any, deltaRow:number, deltaCol:number) {
        const {row, col} = visitedObject.pawnCords
        const newCords = {row: deltaRow + row, col:deltaCol + col};
        const isNextMoveValid = this.isNextMoveValid(visitedObject, newCords)
        if (isNextMoveValid){
            visitedObject.resetLayer();
            visitedObject.pawnCords.row = row + deltaRow;
            visitedObject.pawnCords.col = col + deltaCol;
            this.mergeCurrentBlockToLayer(visitedObject);    
        }
        const wasBrickEmbeded = this.tryEmbedBrick(visitedObject, isNextMoveValid, newCords);
        if (wasBrickEmbeded) {
            this.handleDemolition(visitedObject)
            this.placeNextBlock(visitedObject)
        }
    }

    handleDemolition(visitedObject:any) {
        visitedObject.juggernaut.tryDemolition();
    }

    // async tryDemolition(visitedObject:any) {
    //     const indexesForDemolition = this.findRowIndexesForDemolition(visitedObject);
    //     if (indexesForDemolition.length > 0) {
    //         await this.devastateAll(visitedObject, indexesForDemolition)
    //     }
    // }

    // async devastateAll(visitedObject:any, indexesForDemolition:number[]){
    //     visitedObject.isAnimating = true;
    //     for (let index = indexesForDemolition.length -1; index--; index >=0) {
    //         await this.devastateSingle(visitedObject, indexesForDemolition[index])
    //     }
    //     visitedObject.isAnimating = false;
    // }

    // async devastateSingle(visitedObject:any, index:number) {
    //     visitedObject.pawnLayer[index] = visitedObject.getEmptyRow();
    //     await visitedObject.delay(SINGLE_ANIMATION_DELAY);
    //     visitedObject.pawnLayer.splice(index, 1);
    //     visitedObject.pawnLayer.unshift(visitedObject.getEmptyRow());
    //     await visitedObject.delay(SINGLE_ANIMATION_DELAY);
    //     return true;
    // }

    // informJudge(indexesForDemolition:number[]){
    //     const  { length: nrOfDemolitions } = indexesForDemolition;
    //     const eventsList = [gameEvents.NO_DEMOLITION, gameEvents.DEMOLISH_SINGLE, gameEvents.DEMOLISH_DOUBLE, gameEvents.DEMOLISH_TRIPLE, gameEvents.DEMOLISH_QUATRO];
    //     const properEvent = eventsList[nrOfDemolitions];
    //     return properEvent;
    // }

    // findRowIndexesForDemolition(visitedObject:any){
    //     const { background } = visitedObject;
    //     const indexesForDemolition = background.reduce((indexes:number[], row:number[], index:number) => {
    //         if (this.isRowForDemolition(row)) { indexes.push(index)}
    //     }, [])
    //     return indexesForDemolition;
    // }
    // isRowForDemolition(row: number[]){
    //     return row.every(item => item > 0);
    // }

    tryEmbedBrick(visitedObject: any, wasMoveMade: boolean, newCords:PawnCords) {
        const isNextMoveDown = this.isNextMoveDownDirection(visitedObject, newCords);
        if (!wasMoveMade && isNextMoveDown) {
            this.embedBrick(visitedObject);
            return true;
        }
        return false;
    }

    embedBrick(visitedObject:any) {
        const newBackground = visitedObject.embedLayer();
        visitedObject.background = newBackground;
    }

    isNextMoveValid(visitedObject:any, newCords:PawnCords) {
        const isInBoundries = this.isNextMoveInBoundries(visitedObject, newCords);
        return isInBoundries;
    }

    isNextMoveInBoundries(visitedObject:any, newCords:PawnCords) {
        if (newCords.row < 0 || newCords.col < 0) return false;
        const { pawnLayer, currentBlock } = visitedObject;
        const newLayer = this.mergeBlockToLayer({
            layer:getEmptyBoard(),
            block: currentBlock.blockDescriptor,
            cords: newCords,
        })
        const pawnLayerWithBg = this.combineLayers(pawnLayer, visitedObject.background);
        const nextLayerWithBg = this.combineLayers(newLayer, visitedObject.background);
        const sumCurrentBg = sumArrayElements(pawnLayerWithBg);
        const sumNextBg = sumArrayElements(nextLayerWithBg);
        const sumOfCurrentLayer = sumArrayElements(pawnLayer);
        const sumOfNewLayer = sumArrayElements(newLayer);
        // console.log(newLayer)
        // console.log(sumOfNewLayer, sumOfCurrentLayer, sumOfCurrentLayer === sumOfNewLayer)
        return sumCurrentBg === sumNextBg;
        return sumOfCurrentLayer === sumOfNewLayer;
    }

    combineLayers(l1:BrickMap, l2: BrickMap):BrickMap {
        const result = l1.map((layerRow: number[], index: number) => {
            return this.combineRow(layerRow, l2[index])
        })
        return result;
    }
    private combineRow(layerRow: number[], boardRow: number[]):number[] {
        return layerRow.map((layerBrick:number, index:number) => this.combineBrick(layerBrick, boardRow[index]))
    }

    private combineBrick(currentBrick:number, layerBrick:number):number {
        return or(currentBrick, layerBrick);
    }

    isNextMoveDownDirection(visitedObject:any, newCords:PawnCords) {
        const { pawnCords } = visitedObject;
        const { row: prevRow } = pawnCords;
        const { row: nextRow } = newCords;
        return nextRow > prevRow;
    }

    isNextRotationValid(visitedObject:any) {
        const figureAfterRotation = visitedObject.currentBlock.foretellFigureAfterRotation();
        const sumOfCurrentLayer = sumArrayElements(visitedObject.pawnLayer);
        const sumOfnextLayer = sumArrayElements(this.getMergedBlockToFreshLayer(visitedObject, figureAfterRotation));
        return sumOfCurrentLayer === sumOfnextLayer;
    }

    setNewBrick(visitedObject: any) {
        visitedObject.currentBlock = visitedObject.blocksMaker.getBlock(0);
    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number){
        console.log(time)
        visitedObject.juggernaut.tick();
    }

    placeBlock(visitedObject:any) {
        this.mergeCurrentBlockToLayer(visitedObject);
    }

    getNextBlock() {
        const blocks = new Blocks();
        blocks.setRandomBlock();
        const randomBlock = blocks.randomBlock;
        return randomBlock;
    }

    placeNextBlock(visitedObject:any){
        // this.setNewBrick(visitedObject);
        visitedObject.currentBlock = this.getNextBlock();
        visitedObject.pawnCords = this.getStartingCords(visitedObject.currentBlock);
        this.placeBlock(visitedObject)
    }

    mergeCurrentBlockToLayer(visitedObject:any){
        visitedObject.resetLayer();
        const {pawnLayer, currentBlock} = visitedObject;
        const {currentFigure, currentHandlePoint} = currentBlock;
        visitedObject.pawnLayer = this.getMergedBlockToFreshLayer(visitedObject, {figure: currentFigure, handlePoint: currentHandlePoint})
    }

    getMergedBlockToFreshLayer(visitedObject:any, block:BlockData) {
        const layer = getEmptyBoard();
        // const {currentBlock} = visitedObject;
        const result = this.mergeBlockToLayer({
            layer, block, cords: visitedObject.pawnCords
        });
        return result;
    }


    mergeBlockToLayer({ layer, block, cords }: { layer: BrickMap, block: BlockData, cords:PawnCords }) {
        const { col, row } = cords;
        const {figure, handlePoint} = block;
        const { col: deltaCol, row: deltaRow } = handlePoint;
        const mergeRow = (rowIndex: number) => {
            figure[rowIndex].forEach(
                (bit: 0 | 1, colIndex: number) => {
                    if (layer.length - 1 >= rowIndex + row + deltaRow && layer[0].length - 1 >= colIndex) {
                        layer[rowIndex + row + deltaRow][colIndex + col + deltaCol] = bit;
                    }
                }
            )
        }
        figure.forEach((row: (0 | 1)[], rowIndex:number) => { mergeRow(rowIndex); })
        return layer;
    }


}


class Juggernaut {
    private ANIMATION_DELAY_DIVIDER = 100;
    // private isAnimating:boolean = false;
    private nrOfTicksSinceStartedAnimation: number = 0;
    private demolitionsQueue: any[] = [];
    private controlledObject: any;
    constructor(controlledObject:any){
        this.controlledObject = controlledObject;
    }

    tick(){
        if (this.controlledObject.isAnimating) this.nrOfTicksSinceStartedAnimation++;
        this.runQueue();
    }

    runQueue() {
        if (this.demolitionsQueue.length !== 0) {
            this.tickTask();
        } else {
            this.controlledObject.isAnimating = false;
            this.nrOfTicksSinceStartedAnimation = 0;
        }
    }

    tickTask() {
        const result = this.demolitionsQueue[0]();
        if (result) this.demolitionsQueue.shift();
    }

    tryDemolition() {
        if (this.controlledObject.isAnimating) {this.tick(); return;}
        const indexesForDemolition = this.findRowIndexesForDemolition(this.controlledObject);
        if (indexesForDemolition.length > 0) {
            this.queueAllDevastations(indexesForDemolition)
        }
    }

    queueAllDevastations(indexesForDemolition:number[]){
        this.controlledObject.isAnimating = true;
        const orderedDevastations = indexesForDemolition.map((indexForDemolition) => {
            const devastationProces = this.getDevastationProces(indexForDemolition);
            return devastationProces;
        }).reverse();
        this.demolitionsQueue = orderedDevastations;
        console.log(this.demolitionsQueue)
    }

    getCopy(obj:any) { return JSON.parse(JSON.stringify(obj))}

    getDevastationProces(indexForDemolition:number) {
        let ticks = 0;
        const devastateTick = () => {
            if (ticks === 0) {
                this.controlledObject.pawnLayer[indexForDemolition] = this.controlledObject.getEmptyRow();
                console.log('Getting empty row')
            }
            if (ticks % this.ANIMATION_DELAY_DIVIDER === 0){
                this.controlledObject.pawnLayer.splice(indexForDemolition, 1);
                console.log('After remove', this.getCopy(this.controlledObject.pawnLayer))
            }
            if (ticks % (2 * this.ANIMATION_DELAY_DIVIDER) === 0 && ticks % this.ANIMATION_DELAY_DIVIDER !== 0) {
                this.controlledObject.pawnLayer.unshift(this.controlledObject.getEmptyRow());
                console.log('After addeing empty', this.getCopy(this.controlledObject.pawnLayer))
                return true;
            }
            ticks++;
            return false;
        }
        return devastateTick.bind(this);
    }


    informJudge(indexesForDemolition:number[]){
        const  { length: nrOfDemolitions } = indexesForDemolition;
        const eventsList = [gameEvents.NO_DEMOLITION, gameEvents.DEMOLISH_SINGLE, gameEvents.DEMOLISH_DOUBLE, gameEvents.DEMOLISH_TRIPLE, gameEvents.DEMOLISH_QUATRO];
        const properEvent = eventsList[nrOfDemolitions];
        return properEvent;
    }

    findRowIndexesForDemolition(visitedObject:any){
        const { background } = visitedObject;
        const indexesForDemolition = background.reduce((indexes:number[], row:number[], index:number) => {
            if (this.isRowForDemolition(row)) { indexes.push(index)}
            return indexes;
        }, [])
        console.log('For demo', indexesForDemolition)
        return indexesForDemolition;
    }
    isRowForDemolition(row: number[]){
        return row.every(item => item > 0);
    }

}
