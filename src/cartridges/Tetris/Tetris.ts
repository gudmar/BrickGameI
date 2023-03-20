
import { sumArrayElements } from "../../functions/sumArrayElements";
import { BrickMap } from "../../types/types";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { EMPTY_BOARD, getEmptyBoard } from "../constants";
import { GameCreator, PawnCords } from "../GameCreator";
import { or } from "../layers/toggle/toggleFunction";
import { BlockData, Blocks } from "./blocks";

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
        this.placeNewBlocks(visitedObject);
        visitedObject.pawnCords = this.getStartingCords(visitedObject.currentBlock)
        // this.placeBlock(visitedObject);

    }

    getStartingCords(block: any){
        const { col, row } = block.currentHandlePoint;
        // const { currentFigure } = block;
        // const figureHeight = currentFigure.length;
        // const figureWidth = currentFigure[0].length;
        // const getCeilingDistance = () => {

        // }
        // console.log(block, row, col, figureHeight, figureWidth,row >= 0 ? row : 0)
        return { col: col + 5, row: row >= 0 ? row : 0 };
    }

    rotate(visitedObject:any) {
        if (this.isNextRotationValid(visitedObject)) {
            visitedObject.currentBlock.rotate();
            this.placeBlock(visitedObject);
        }
    }

    setVisitorToNextStateOnTick(visitedObject:any){

        visitedObject.juggernaut.tick();
    }

    move(visitedObject:any, deltaRow:number, deltaCol:number) {
        if (!visitedObject.frozen && deltaRow < 0) return;
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
            this.placeNewBlocks(visitedObject)
        }
    }

    handleDemolition(visitedObject:any) {
        visitedObject.juggernaut.tryDemolition();
    }

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
        return sumCurrentBg === sumNextBg;
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
        const nextLayer = this.getMergedBlockToFreshLayer(visitedObject, figureAfterRotation);
        const sumOfCurrentLayer = sumArrayElements(this.combineLayers(visitedObject.pawnLayer, visitedObject.background));
        const sumOfnextLayer = sumArrayElements(this.combineLayers(nextLayer, visitedObject.background));

        return sumOfCurrentLayer === sumOfnextLayer;
    }

    setNewBrick(visitedObject: any) {
        visitedObject.currentBlock = visitedObject.blocksMaker.getBlock(0);
    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number){
        //////////////////////
        this.move(visitedObject, 1, 0);
    }

    placeBlock(visitedObject:any) {
        this.mergeCurrentBlockToLayer(visitedObject);
    }

    takeNewBlocks(visitedObject:any) {
        const blocks = visitedObject.blocksMaker;
        blocks.setNewBlock();
        const { currentBlock, nextBlock } = blocks;
        return { currentBlock, nextBlock}
    }

    placeNewBlocks(visitedObject:any){
        const { currentBlock, nextBlock } = this.takeNewBlocks(visitedObject);
        visitedObject.currentBlock = currentBlock;
        visitedObject.nextBlock = nextBlock;
        visitedObject.nextFigure =  nextBlock.blockDescriptor.figure;
        visitedObject.pawnCords = this.getStartingCords(visitedObject.currentBlock);
        this.placeBlock(visitedObject)
    }

    mergeCurrentBlockToLayer(visitedObject:any){
        visitedObject.resetLayer();
        const {currentBlock} = visitedObject;
        const {currentFigure, currentHandlePoint} = currentBlock;
        visitedObject.pawnLayer = this.getMergedBlockToFreshLayer(visitedObject, {figure: currentFigure, handlePoint: currentHandlePoint})
    }

    getMergedBlockToFreshLayer(visitedObject:any, block:BlockData) {
        const layer = getEmptyBoard();
        const result = this.mergeBlockToLayer({
            layer, block, cords: visitedObject.pawnCords
        });
        return result;
    }


    mergeBlockToLayer({ layer, block, cords }: { layer: BrickMap, block: BlockData, cords:PawnCords }) {
        const { col, row } = cords;
        const {figure, handlePoint} = block;
        const { col: deltaCol, row: deltaRow } = handlePoint;
        const positiveDeltaRow = deltaRow < 0 ? 0 : deltaRow;
        const mergeRow = (rowIndex: number) => {
            figure[rowIndex].forEach(
                (bit: 0 | 1, colIndex: number) => {
                    if (layer.length - 1 >= rowIndex + row + positiveDeltaRow && layer[0].length - 1 >= colIndex) {
                        layer[rowIndex + row + positiveDeltaRow][colIndex + col + deltaCol] = bit;
                    }
                }
            )
        }
        figure.forEach((row: (0 | 1)[], rowIndex:number) => { mergeRow(rowIndex); })
        return layer;
    }


}


class Juggernaut {
    private ANIMATION_DELAY_DIVIDER = 5;
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
        this.informJudge(indexesForDemolition);
        if (indexesForDemolition.length > 0) {
            this.queueAllDevastations(indexesForDemolition)
        }
    }

    queueAllDevastations(indexesForDemolition:number[]){
        this.controlledObject.isAnimating = true;
        const orderedDevastations = indexesForDemolition.map((indexForDemolition) => {
            const devastationProces = this.getDevastationProces(indexForDemolition);
            return devastationProces;
        });
        this.demolitionsQueue = orderedDevastations;
        console.log(indexesForDemolition, this.demolitionsQueue)
    }

    getCopy(obj:any) { return JSON.parse(JSON.stringify(obj))}

    getDevastationProces(indexForDemolition:number) {
        let ticks = 1;
        const devastateTick = () => {
            if (ticks === 1) {
                this.controlledObject.pawnLayer[indexForDemolition] = this.controlledObject.getEmptyRow();
            }
            if (ticks % this.ANIMATION_DELAY_DIVIDER === 0 && ticks % (2 * this.ANIMATION_DELAY_DIVIDER) !== 0){
                this.controlledObject.background[indexForDemolition] = this.controlledObject.getEmptyRow();
            }
            if (ticks % (2 * this.ANIMATION_DELAY_DIVIDER) === 0) {
                this.controlledObject.background.splice(indexForDemolition, 1);
                this.controlledObject.background.unshift(this.controlledObject.getEmptyRow());
                return true;
            }
            ticks++;
            return false;
        }
        return devastateTick.bind(this);
    }


    informJudge(indexesForDemolition:number[]){
        const judge = new Judge();
        const  { length: nrOfDemolitions } = indexesForDemolition;
        const eventsList = [gameEvents.NO_DEMOLITION, gameEvents.DEMOLISH_SINGLE, gameEvents.DEMOLISH_DOUBLE, gameEvents.DEMOLISH_TRIPLE, gameEvents.DEMOLISH_QUATRO];
        const properEvent = eventsList[nrOfDemolitions];
        judge.inform(this.controlledObject, properEvent)
        // return properEvent;
    }

    findRowIndexesForDemolition(visitedObject:any){
        const { background } = visitedObject;
        const indexesForDemolition = background.reduce((indexes:number[], row:number[], index:number) => {
            if (this.isRowForDemolition(row)) { indexes.push(index)}
            return indexes;
        }, [])
        return indexesForDemolition;
    }
    isRowForDemolition(row: number[]){
        return row.every(item => item > 0);
    }

}
