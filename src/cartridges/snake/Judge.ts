import { JudgeInterface } from "../../types/JudgeInterface";

export const gameEvents = {
    COLLECT_BRICK: 'Brick collected',
}


export class Judge implements JudgeInterface{
    inform(visitedObject: any, information: string, payload?: any){
        switch(information) {
            case gameEvents.COLLECT_BRICK: visitedObject.score += 100; break;
        }
    }
}
