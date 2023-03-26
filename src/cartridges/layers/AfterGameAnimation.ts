
import { Logger } from "../../functions/Logger";
import { KeyPress } from "../../types/types";

enum Direction {up, down};

export class AnimationAfterGame {

    initiate(visitedObject: any) {
        visitedObject.direction = Direction.up;
        visitedObject.lastIndex = -1;
        Logger.inform('AnimationAfterGame instance initilted')
        console.log('Animation after game initialized')
    }

    restartSpecificAttributes(visitedObject:any) {
        'direction,lastIndex'.split(',').forEach(
            (key) => delete visitedObject[key],
        )
    }

    passCode(){
        Logger.inform('Passcodes do not work in animation mode')
    }

    setVisitorToNextStateOnTick(visitedObject: any, time: number) {
        if (visitedObject.lastIndex === -1) visitedObject.lastIndex = visitedObject.pawnLayer.length;
        this.moveUp(visitedObject);
        this.moveDown(visitedObject);
        // switch (visitedObject.direction) {
        //     case Direction.up: this.moveUp(visitedObject); break;
        //     case Direction.down: this.moveDown(visitedObject); break;
        // }
    }

    moveUp(visitedObject:any) {
        if (visitedObject.direction !== Direction.up) { return; }
        visitedObject.lastIndex -= 1;
        visitedObject.pawnLayer[visitedObject.lastIndex] = this.getRowOf(visitedObject.pawnLayer[0].length, 1)
        if (visitedObject.lastIndex < 1) visitedObject.direction = Direction.down;
    }

    moveDown(visitedObject:any) {
        if (visitedObject.direction !== Direction.down) { return; }
        visitedObject.pawnLayer[visitedObject.lastIndex] = this.getRowOf(visitedObject.pawnLayer[0].length, 0)
        visitedObject.lastIndex += 1;
        if (visitedObject.lastIndex > visitedObject.background.length) this.animationEnded(visitedObject);
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