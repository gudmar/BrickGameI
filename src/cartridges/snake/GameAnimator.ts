import { BrickMap } from "../../types/types";
import { getEmptyBoard } from "../constants";
import { GameCreator } from "../GameCreator";
import { FoodLocalisator } from "./FoodLocalisator";

const ANIMATION_LAST = 30;

export class GameAnimator{
    memorizedBackground = getEmptyBoard();
    isCurtainAnimationOngoing = false;
    ticks = 0;
    curtain = getEmptyBoard().map((row) => 
        row.map((brick) => 1)
    )

    curtainAnimation(visitedObject:GameCreator) {
        this.ticks = 0;
        this.isCurtainAnimationOngoing = true;
        this.memorizedBackground = visitedObject.background;
        visitedObject.isAnimating = true;
        visitedObject.background = this.curtain;
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

    tick(visitedObject:GameCreator, snakeInstance:any) {
        if (this.isCurtainAnimationOngoing ){
            visitedObject.background = this.curtain;
            this.ticks++;
            this.stopAnimation(visitedObject, snakeInstance);
        }
    }

    private stopAnimation(visitedObject:GameCreator, snakeInstance:any){
        if (this.ticks > ANIMATION_LAST){
            visitedObject.background = this.memorizedBackground;
            visitedObject.isAnimating = false;
            this.isCurtainAnimationOngoing = false; 
            FoodLocalisator.randomlyPlaceFood(snakeInstance, visitedObject);
        }
    }
}