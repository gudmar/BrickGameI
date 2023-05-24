// Keyboard if a key pressed and hold provides a behaviour, where 
// there is a single move and after a while there is a continuous servies
// of moves.
// This move improvement causes continuous, not broken move after
// key is hold

import { NextStateCalculator } from "./AbstractNextStateCalculator";
import { GameCreator } from "./GameCreator";

export abstract class ContinuousMovementNestStateCalculator extends NextStateCalculator {
    
    isMoveLeft = false;
    isMoveRight = false;
    isMoveUp = false;
    isMoveDown = false;

    startLeft(visitedObject: any): void {this.isMoveLeft = true}
    stopLeft(visitedObject: any): void {this.isMoveLeft = false}
    startRight(visitedObject: any): void {this.isMoveRight = true;}
    stopRight(visitedObject: any): void {this.isMoveRight = false;}
    startUp(visitedObject: any): void {this.isMoveUp = true;}
    stopUp(visitedObject: any): void {this.isMoveUp = false;}
    startDown(visitedObject: any): void {this.isMoveDown = true;}
    stopDown(visitedObject: any): void {this.isMoveDown = false;}

    moveOnTick(visitedObject: GameCreator, time: number) {
        const MOVE_TIME_DIVIDER = 4;
        const shouldMove = time % MOVE_TIME_DIVIDER === 0;
        if (this.isMoveDown && shouldMove) this.move(visitedObject, 1, 0);
        if (this.isMoveLeft && shouldMove) this.move(visitedObject, 0, -1);
        if (this.isMoveRight && shouldMove) this.move(visitedObject, 0, 1);
        if (this.isMoveUp && shouldMove) this.move(visitedObject, -1, 0);
    }


}