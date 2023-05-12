import { AbstractJudge } from "../AbstractJudge";
import { GameCreator } from "../GameCreator";

const $_FOR_TAKE_OVER = 100;
const SWITCH_LEVEL_THRESHOLD = 10000;
export const gameEvents = {
    TAKE_OVER: 'Take over',
    CHEATER_MONEY: 'Cheater money',
}

export class Judge extends AbstractJudge {
    inform(visitedObject: GameCreator, information: string) {
        if(information === gameEvents.TAKE_OVER) {
            visitedObject.score += $_FOR_TAKE_OVER;
            this.increaseLevelIfShould({
                visitedObject, pointsThreshold: SWITCH_LEVEL_THRESHOLD, lastPointGain: $_FOR_TAKE_OVER,
            })
            return;
        }
        if (information === gameEvents.CHEATER_MONEY) {
            visitedObject.score += 5000;
        }
    }
}
