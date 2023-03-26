export const gameEvents = {
    NO_DEMOLITION: 'Dont demolish',
    DEMOLISH_SINGLE: 'Single score', // 11500 - 10800 = 700
    DEMOLISH_DOUBLE: 'Double score',
    DEMOLISH_TRIPLE: 'Triple score',
    DEMOLISH_QUATRO: 'Quatro score',
    CHEATER_MONEY: 'Cheater money',
}

export class Judge {
    inform(visitedObject: any, information: string, pyload?:any){
        switch(information){
            case gameEvents.DEMOLISH_SINGLE: visitedObject.score += 100; break;
            case gameEvents.DEMOLISH_DOUBLE: visitedObject.score += 300; break;
            case gameEvents.DEMOLISH_TRIPLE: visitedObject.score += 700; break;
            case gameEvents.DEMOLISH_QUATRO: visitedObject.score += 1100; break;
            case gameEvents.CHEATER_MONEY: visitedObject.score += 5000; break;
        }
    }
}