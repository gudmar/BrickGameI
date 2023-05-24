
import { ADD_POINTS, START_TIMER, STOP_TIMER, UP_LOCK, UP_UNLOCK } from "../../constants/gameCodes";
import { sumArrayElements } from "../../functions/sumArrayElements";
import { BrickMap, FigureHandlePoint, NextFigure } from "../../types/types";
import { getEmptyBoard } from "../constants";
import { ContinuousMovementNestStateCalculator } from "../ContinuousMovementNextStateCalculator";
import { GameCreator, PawnCords } from "../GameCreator";
import { GamesIntro } from "../GamesIntro/GamesIntro";
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { or } from "../layers/toggle/toggleFunction";
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
                afterGameAnimation: AnimationAfterGame,
                beforeGameAnimation: GameIntroCloasure,
            }
        );
        return decoratedClass;
    }
}

export class TetrisVisitor extends ContinuousMovementNestStateCalculator {

    private blockMaker: Blocks = new Blocks();
    private juggernaut: Juggernaut | null = null;
    private upLock: boolean = true;
    private cheatStopTimer: boolean = false;
    private isMovingLeft: boolean = false;
    private isMovingRight: boolean = false;
    private isAccelerated: boolean = false;

    initiate(visitedObject: any){
        this.isAccelerated = false;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        visitedObject.name = 'Tetris'
        visitedObject.background = getEmptyBoard();
        this.juggernaut = new Juggernaut(visitedObject);
        this.setNewBrick(visitedObject);
        this.tryToPlaceNewBlock(visitedObject);
        visitedObject.pawnCords = this.getStartingCords(visitedObject.currentBlock)
        
        visitedObject.isCheater = false;
        this.setLevel(visitedObject);
        visitedObject.score = 0;
    }

    clean(visitedObject: any): void {
        this.upLock = false;
        this.cheatStopTimer = false;
        visitedObject.background = getEmptyBoard();
        visitedObject.pawnLayer = getEmptyBoard();
    }

    spaceUp(visitedObject: GameCreator) {}

    passCode(visitedObject:any, code:string) {
        console.log(code)
        switch (code){
            case START_TIMER:
                this.cheatStopTimer = false;
                visitedObject.isCheater = true;
                break;
            case STOP_TIMER:
                this.cheatStopTimer = true;
                visitedObject.isCheater = true;
                break;
            case UP_UNLOCK:
                this.upLock = false;
                visitedObject.isCheater = true;
                break;
            case UP_LOCK:
                this.upLock = true;
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

    clearMoveFlags(){
        if (this.isAnimating) {
            this.isMovingLeft = false;
            this.isMovingRight = false;
            this.isAccelerated = false;
        }
    }

    setVisitorToNextStateOnTick(visitedObject:any, time: number){
        this.clearMoveFlags();
        this.juggernaut!.tick();
        this.moveOnTick(visitedObject, time)
        
    }

    setLevel(visitedObject: any) {
        LevelSetter.setLevel(visitedObject);
    }

    move(visitedObject:any, deltaRow:number, deltaCol:number) {
        if (deltaRow < 0 && this.upLock) return;
        if (visitedObject.isGameOver) return;
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
        this.juggernaut!.tryDemolition();
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
        visitedObject.currentBlock = this.blockMaker.getBlock(0);
    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number){
        if (!this.cheatStopTimer && !this.isAccelerated){
            this.move(visitedObject, 1, 0);
        }
    }

    placeBlock(visitedObject:any) {
        this.mergeCurrentBlockToLayer(visitedObject);
    }

    takeNextAndCurrentBlocks(visitedObject:any) {
        this.blockMaker.setNewBlock();
        const { currentBlock, nextBlock } = this.blockMaker;
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
        const {nextBlock} = this.blockMaker;
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
