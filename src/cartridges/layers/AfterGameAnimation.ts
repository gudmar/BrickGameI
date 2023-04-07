
import { copyBackground } from "../../functions/copyBackground";
import { Logger } from "../../functions/Logger";
import { KeyPress } from "../../types/KeyPress";
import { getEmptyBoard } from "../constants";


enum Direction {up, down};

export class AnimationAfterGame {

    private lastAnimatedRowIndex = -1;
    private direction = Direction.up;
    initiate(visitedObject: any) {
        Logger.inform('AnimationAfterGame instance initilted')
    }

    clean(visitedObject:any){
    };

    restartSpecificAttributes(visitedObject:any) {
    }

    passCode(){
        Logger.inform('Passcodes do not work in animation mode')
    }

    setVisitorToNextStateOnTick(visitedObject: any, time: number) {
        if (this.lastAnimatedRowIndex === -1) this.lastAnimatedRowIndex = visitedObject.pawnLayer.length; // NOT THIS
        this.tryMoveUp(visitedObject);
        this.tryMoveDown(visitedObject);
    }

    tryMoveUp(visitedObject:any) {
        if (this.direction !== Direction.up) { return; }
        
        this.lastAnimatedRowIndex -= 1;
        const rowOfOnes = this.getRowOf(visitedObject.pawnLayer[0].length, 1);
        const layerCopy = copyBackground(visitedObject.pawnLayer);
        layerCopy.splice(this.lastAnimatedRowIndex, 1, rowOfOnes)
        visitedObject.pawnLayer = layerCopy;
        if (this.lastAnimatedRowIndex < 1) this.direction = Direction.down;
    }

    tryMoveDown(visitedObject:any) {
        if (this.direction !== Direction.down) { return; }
        const rowOfZeros = this.getRowOf(visitedObject.pawnLayer[0].length, 0);
        const layerCopy = copyBackground(visitedObject.pawnLayer);
        layerCopy.splice(this.lastAnimatedRowIndex, 1, rowOfZeros)
        visitedObject.pawnLayer = layerCopy;
        this.lastAnimatedRowIndex += 1;
        if (this.lastAnimatedRowIndex >= visitedObject.background.length) this.animationEnded(visitedObject);
    }

    private animationEnded(visitedObject:any) {
        visitedObject.afterGameAnimationEnded();
    }

    getRowOf(size: number, element:any) {
        return new Array(size).fill((()=>element)());
    }

    setVisitorToNextStateOnSpeedTick(visitedObject: any, time: number) {

    }

    setVisitorToNextStateOnKeyPress(keyPresses: KeyPress) {

    }

    rotate() {}

    setLevel(visitedObject:any){

    }
}