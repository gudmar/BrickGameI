
import { ADD_POINTS, START_TIMER, STOP_TIMER, UP_LOCK, UP_UNLOCK } from "../../constants/gameCodes";
import { sumArrayElements } from "../../functions/sumArrayElements";
import { BrickMap, FigureHandlePoint, NextFigure } from "../../types/types";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { EMPTY_BOARD, getEmptyBoard } from "../constants";
import { GameCreator, PawnCords } from "../GameCreator";
import { GamesIntro } from "../GamesIntro/GamesIntro";
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { and, or } from "../layers/toggle/toggleFunction";
import { BlockData, Blocks } from "./blocks";
import { gameEvents, Judge } from "./Judge";
import { Juggernaut } from "./Juggernaut";
import { LevelSetter } from "./LevelSetter";

const INTRO_BACKGROUND = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 1, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

class GameIntroCloasure{
    constructor() {
        const gameIntro = new GamesIntro(INTRO_BACKGROUND);
        return gameIntro;
    }
}

export class TetrisDecorator {
    constructor() {

        const decoratedClass = new GameCreator(
            {
                nextStateCalculator: TetrisVisitor,
                judge: Judge,
                background: EMPTY_BOARD,
                afterGameAnimation: AnimationAfterGame,
                beforeGameAnimation: GameIntroCloasure,
            }
        );
        return decoratedClass;
    }
}

export class TetrisVisitor extends NextStateCalculator {
    initiate(visitedObject: any){
        const blocksInstance = new Blocks()
        const juggernaut = new Juggernaut(visitedObject);
        visitedObject.name = 'Tetris'
        visitedObject.blocksMaker = blocksInstance;
        visitedObject.juggernaut = juggernaut;
        this.setNewBrick(visitedObject);
        this.tryToPlaceNewBlock(visitedObject);
        visitedObject.pawnCords = this.getStartingCords(visitedObject.currentBlock)
        visitedObject.upLock = true;
        visitedObject.isCheater = false;
        this.setLevel(visitedObject);
    }

    clean(visitedObject: any): void {
        const speceficAttributes = [
            'upLock', 'blocksMaster', 'juggernaut, cheatStopTimer',
            'cheatStopTimer',
        ];
        speceficAttributes.forEach((attrib) => delete visitedObject[attrib]);
        visitedObject.background = getEmptyBoard();
        visitedObject.pawnLayer = getEmptyBoard();
    }

    passCode(visitedObject:any, code:string) {
        console.log(code)
        switch (code){
            case START_TIMER:
                visitedObject.cheatStopTimer = false;
                visitedObject.isCheater = true;
                break;
            case STOP_TIMER:
                visitedObject.cheatStopTimer = true;
                visitedObject.isCheater = true;
                break;
            case UP_UNLOCK:
                visitedObject.upLock = false;
                visitedObject.isCheater = true;
                break;
            case UP_LOCK:
                visitedObject.upLock = true;
                break;
            case ADD_POINTS:
                visitedObject.informJudge(gameEvents.CHEATER_MONEY);
                visitedObject.isCheater = true;
        }
    }

    getStartingCords(block: any){
        const { col, row } = block.currentHandlePoint;
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

    setLevel(visitedObject: any) {
        LevelSetter.setLevel(visitedObject);
    }

    move(visitedObject:any, deltaRow:number, deltaCol:number) {
        if (deltaRow < 0 && visitedObject.upLock) return;
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
            this.tryToPlaceNewBlock(visitedObject)
            this.endGameIfCannotAddNextBlock(visitedObject)
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
        if (!visitedObject.cheatStopTimer){
            this.move(visitedObject, 1, 0);
        }
        
    }

    placeBlock(visitedObject:any) {
        this.mergeCurrentBlockToLayer(visitedObject);
    }

    takeNextAndCurrentBlocks(visitedObject:any) {
        const blocks = visitedObject.blocksMaker;
        blocks.setNewBlock();
        const { currentBlock, nextBlock } = blocks;
        return { currentBlock, nextBlock}
    }

    tryToPlaceNewBlock(visitedObject:any){
        const { currentBlock, nextBlock } = this.takeNextAndCurrentBlocks(visitedObject);
        const nextFigure = nextBlock.blockDescriptor.figure;
        const newPawnCords = this.getStartingCords(currentBlock);
        visitedObject.currentBlock = currentBlock;
        visitedObject.nextBlock = nextBlock;
        visitedObject.nextFigure =  nextFigure;
        visitedObject.pawnCords = newPawnCords;
        this.placeBlock(visitedObject)
    }

    endGameIfCannotAddNextBlock(visitedObject:any) {
        const {nextBlock} = visitedObject.blocksMaker;
        const newPawnCords = this.getStartingCords(nextBlock);
        const nextFigure = nextBlock.blockDescriptor.figure;
        const isGameOver = !this.canAddNewBlock(visitedObject, nextFigure, newPawnCords);
        if (isGameOver) this.endGame(visitedObject)
    }

    canAddNewBlock(visitedObject:any, nextFigure: NextFigure, newPawnCords: FigureHandlePoint) {
        const summOfBoard = this.summArrayOfArrays(visitedObject.background);
        const summOfNextFigure = this.summArrayOfArrays(nextFigure)
        const nextSimulatedBoard = this.getSimulatedMergedBlockAndLayer(newPawnCords, nextFigure, visitedObject.background);
        const summOfNextSimulatedBoard = this.summArrayOfArrays(nextSimulatedBoard);
        const result = summOfBoard + summOfNextFigure === summOfNextSimulatedBoard
        return result;

    }

    getSimulatedMergedBlockAndLayer(startPoint: FigureHandlePoint, block: NextFigure, layer: BrickMap){
        const blockLayer = this.mergeBlockToLayer({
            layer: getEmptyBoard(),
            block: {figure: block, handlePoint: {col: 0, row: 0}},
            cords: startPoint,
        })
        const simulatedBlockAndBackground = this.getNewMergedLayer(blockLayer, layer, or);
        return simulatedBlockAndBackground;
    }

    endGame(visitedObject: any) {
        visitedObject.isGameOver = true;
        visitedObject.gameEnded();
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
