import { range } from "../../functions/range";
import { GameCreator, PawnCords } from "../GameCreator";
import { TankVisitor } from "./tanks";

const MAX_NR_OF_ANIMATIONS = 16;

export class AnimatorOfDestruction{
    visitedObject: GameCreator;
    nextStateCalculator: TankVisitor;
    nrOfAnimationsSoFar = 0;
    constructor(visitedObject: GameCreator, nextStateCalculator: TankVisitor){
        this.nextStateCalculator = nextStateCalculator;
        this.visitedObject = visitedObject;
    }
    set isAnimating(val: boolean){
        this.visitedObject.isAnimating = val;
    }
    get isAnimating() { return this.visitedObject.isAnimating }

    tick(){
        const isAnimationStopped = this.tryStopAnimation();
        if (isAnimationStopped) return;
        const pawnLayer = this.mergeBurningTankToBoard(this.visitedObject.pawnLayer, this.nextStateCalculator.playerTankCords, this.nrOfAnimationsSoFar % 2 === 0)
        this.visitedObject.pawnLayer = pawnLayer;
        this.nrOfAnimationsSoFar++;
    }
    tryStopAnimation(){
        if (this.nrOfAnimationsSoFar >= MAX_NR_OF_ANIMATIONS) {
            this.visitedObject.isAnimating = false;
            this.nrOfAnimationsSoFar = 0;
            this.nextStateCalculator.reInitiateGame(this.visitedObject)
            return true;
        }
        return false;
    };
    mergeBurningTankToBoard(pawnLayer: number[][], tankCords: PawnCords, startFromZero: boolean) {
        const maxRow = pawnLayer.length - 1;
        const maxCol = pawnLayer[0].length - 1;
        const startRow = Math.max(tankCords.row - 2, 0);
        const startCol = Math.max(tankCords.col - 2, 0);
        const endRow = Math.min(tankCords.row + 2, maxRow);
        const endCol = Math.min(tankCords.col + 2, maxCol);
        const fire = this.generateChessboard(5, startFromZero)
        for(let rowIndex = startRow; rowIndex <= endRow; rowIndex++){
            for(let colIndex = startCol; colIndex <= endCol; colIndex++){
                pawnLayer[rowIndex][colIndex] = fire[rowIndex - startRow][colIndex - startCol];
            }
        }
        return pawnLayer;
    }

    generateChessboard(size: number, startFromZero: boolean){

        return range(size).map((item, index) => 
            index % 2 === 0 ?
            this.generateRow(size, startFromZero):
            this.generateRow(size, !startFromZero))
    }
    generateRow(size: number, startFromZero: boolean) {
        return range(size).map((item, index) => {
            return startFromZero ? 
                index % 2 :
                (index + 1) % 2
        })
    }
}