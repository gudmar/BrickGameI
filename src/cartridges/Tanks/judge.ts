export const gameEvents = {
    HIT_TANK: 'Hit tank',
    HIT_BULLET: 'Hit bullet',
    CHEATER_MONEY: 'Cheater money',
    HIT_BRICK: 'Hit brick',
}

export class Judge{
    inform(visitedObject: any, information: string, payload?: any){
        switch(information) {
            case gameEvents.HIT_TANK: visitedObject.score += 100; break;
            case gameEvents.HIT_BULLET: visitedObject.score += 50; break;
            case gameEvents.HIT_BRICK: visitedObject.score += 10; break;
            case gameEvents.CHEATER_MONEY: visitedObject.score += 5000; break;
        }
    }
}
