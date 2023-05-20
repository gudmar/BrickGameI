import { AbstractJudge } from "../AbstractJudge";
import { GameCreator } from "../GameCreator";

export const gameEvents = {
    HIT_1: 'Hit single brick',
    HIT_2: 'Hit two bricks at the same time',
    HIT_3: 'Hit 3 bricks at the same time',
    HIT_MANY_CHEAT: 'Hit many bricks at the same time cheat',
    CHEATER_MONEY: 'Cheater money',
}

export class Judge extends AbstractJudge {
    
    inform(visitedObject: GameCreator, information: string) {
        switch(information){
            case gameEvents.HIT_1: visitedObject.score += 50; return;
            case gameEvents.HIT_2: visitedObject.score += 150; return;
            case gameEvents.HIT_3: visitedObject.score += 500; return;
            case gameEvents.HIT_MANY_CHEAT: visitedObject.score += 50; return;
            case gameEvents.CHEATER_MONEY: visitedObject.score += 5000; return;
        }
    }
}
