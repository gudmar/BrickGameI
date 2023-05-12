import { GameCreator } from "./GameCreator";

export interface LevelIncreasable {
    visitedObject: GameCreator,
    pointsThreshold:number,
    lastPointGain: number
}
export abstract class AbstractJudge{
    increaseLevelIfShould(
        {
            visitedObject,
            pointsThreshold,
            lastPointGain,
        }: LevelIncreasable
        ){
        const pointsBeforeAdding = visitedObject.score - lastPointGain;
        const modulo = pointsBeforeAdding % pointsThreshold;
        const pointsToCompare = modulo + lastPointGain;
        const shouldIncrease = pointsToCompare >= pointsThreshold;
        if (shouldIncrease) visitedObject.increaseLevel();
    }
}