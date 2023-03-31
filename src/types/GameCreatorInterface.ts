import { GameCreator } from "../cartridges/GameCreator";
import { KeyPress } from "./KeyPress";

export interface GameCreatorInterface {
    initiate(visitedObject:GameCreator): void,
    passCode(visitedObject:GameCreator, code:string): void,
    setVisitorToNextStateOnSpeedTick(visitedObject:GameCreator, time:number): void,
    restartSpecificAttributes(visitedObject: GameCreator): void,
    rotate(visitedObject: GameCreator): void,
    setLevel(visitedObject: GameCreator): void,
    pauseGame(visitedObject: GameCreator):void,
    setVisitorToNextStateOnTick(visitedObject: GameCreator, time?:number):void,
    setVisitorToNextStateOnKeyPress(visitedObject: GameCreator, keyPresses: KeyPress):void,
}
