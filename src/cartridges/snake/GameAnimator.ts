import { BrickMap } from "../../types/types";
import { getEmptyBoard } from "../constants";
import { GameCreator } from "../GameCreator";

const ANIMATION_LAST = 30;

export class GameAnimator{
    memorizedBackground = getEmptyBoard();
    isCurtainAnimationOngoing = false;
    ticks = 0;
    curtain = getEmptyBoard().map((row) => 
        row.map((brick) => 1)
    )

    curtainAnimation(visitedObject:GameCreator) {
        console.log('STARTING CURTAIN')
        this.ticks = 0;
        this.isCurtainAnimationOngoing = true;
        this.memorizedBackground = visitedObject.background;
        visitedObject.isAnimating = true;
        visitedObject.background = this.curtain;
        console.log(visitedObject.background)
    }

    getEmptyBoard(){
        if (this.isCurtainAnimationOngoing) {
            return this.curtain
        }
        return getEmptyBoard();
    }

    setMemoizedBackground(barickMap:BrickMap){
        this.memorizedBackground = barickMap;
        return this.isCurtainAnimationOngoing
    }

    tick(visitedObject:GameCreator) {
        if (this.isCurtainAnimationOngoing ){
            visitedObject.background = this.curtain;
            this.ticks++;
            this.stopAnimation(visitedObject);
        }
    }

    private stopAnimation(visitedObject:GameCreator){
        if (this.ticks > ANIMATION_LAST){
            visitedObject.background = this.memorizedBackground;
            visitedObject.isAnimating = false;
            this.isCurtainAnimationOngoing = false; 
        }
    }
}