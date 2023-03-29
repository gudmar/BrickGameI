
import { Logger } from "../../functions/Logger";
import { KeyPress } from "../../types/KeyPress";
import { getEmptyBoard } from "../constants";


enum Direction {up, down};

export class AnimationAfterGame {

    private lastAnimatedRowIndex = -1;
    private direction = Direction.up;
    initiate(visitedObject: any) {
        Logger.inform('AnimationAfterGame instance initilted')
        console.log('Animation after game initialized')
    }

    clean(visitedObject:any){
        console.log(visitedObject.pawnLayer, visitedObject.pawnLayer.length)
    };

    restartSpecificAttributes(visitedObject:any) {
        // 'direction,lastAnimatedRowIndex'.split(',').forEach(
        //     (key) => delete visitedObject[key],
        // )
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
        visitedObject.pawnLayer[this.lastAnimatedRowIndex] = this.getRowOf(visitedObject.pawnLayer[0].length, 1)
        if (this.lastAnimatedRowIndex < 1) this.direction = Direction.down;
    }

    tryMoveDown(visitedObject:any) {
        if (this.direction !== Direction.down) { return; }
        
        visitedObject.pawnLayer[this.lastAnimatedRowIndex] = this.getRowOf(visitedObject.pawnLayer[0].length, 0)
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