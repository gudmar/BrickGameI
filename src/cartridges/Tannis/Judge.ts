import { AbstractJudge } from "../AbstractJudge";
import { GameCreator } from "../GameCreator";

export const gameEvents = {
    HIT_ONE: 'Hit single brick',
    HIT_MANY: 'Hit many bricks at the same time, no cheat',
    HIT_MANY_CHEAT: 'Hit many bricks at the same time cheat',
    CHEATER_MONEY: 'Cheater money',
}

export class Judge extends AbstractJudge {
    inform(visitedObject: GameCreator, information: string) {
        switch(information){
            case gameEvents.HIT_ONE: visitedObject.score += 50; return;
            case gameEvents.HIT_MANY: visitedObject.score += 200; return;
            case gameEvents.HIT_MANY_CHEAT: visitedObject.score += 50; return;
            case gameEvents.CHEATER_MONEY: visitedObject.score += 5000; return;
        }
    }
}
