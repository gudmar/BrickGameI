import { GameCreator } from "../GameCreator";

export const gameEvents = {
    TAKE_OVER: 'Take over',
    CHEATER_MONEY: 'Cheater money',
}

export class Judge {
    inform(visitedObject: GameCreator, information: string) {
        if(information === gameEvents.TAKE_OVER) {
            visitedObject.score += 100;
            return;
        }
        if (information === gameEvents.CHEATER_MONEY) {
            visitedObject.score += 5000;
        }
    }
}
