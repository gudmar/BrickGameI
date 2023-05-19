import { gameEvents, Judge } from './Judge';

export class Juggernaut {
    private ANIMATION_DELAY_DIVIDER = 5;
    private nrOfTicksSinceStartedAnimation: number = 0;
    private demolitionsQueue: any[] = [];
    private controlledObject: any;
    constructor(controlledObject:any){
        this.controlledObject = controlledObject;
    }

    tick(){
        if (this.controlledObject.isAnimating) this.nrOfTicksSinceStartedAnimation++;
        this.runQueue();
    }

    runQueue() {
        if (this.demolitionsQueue.length !== 0) {
            this.tickTask();
        } else {
            this.controlledObject.isAnimating = false;
            this.nrOfTicksSinceStartedAnimation = 0;
        }
    }

    tickTask() {
        const result = this.demolitionsQueue[0]();
        if (result) this.demolitionsQueue.shift();
    }

    tryDemolition() {
        if (this.controlledObject.isAnimating) {this.tick(); return;}
        const indexesForDemolition = this.findRowIndexesForDemolition(this.controlledObject);
        this.informJudge(indexesForDemolition);
        if (indexesForDemolition.length > 0) {
            this.queueAllDevastations(indexesForDemolition)
        }
    }

    queueAllDevastations(indexesForDemolition:number[]){
        this.controlledObject.isAnimating = true;
        const orderedDevastations = indexesForDemolition.map((indexForDemolition) => {
            const devastationProces = this.getDevastationProces(indexForDemolition);
            return devastationProces;
        });
        this.demolitionsQueue = orderedDevastations;
        console.log(indexesForDemolition, this.demolitionsQueue)
    }

    getCopy(obj:any) { return JSON.parse(JSON.stringify(obj))}

    getDevastationProces(indexForDemolition:number) {
        let ticks = 1;
        const devastateTick = () => {
            if (ticks === 1) {
                this.controlledObject.pawnLayer[indexForDemolition] = this.controlledObject.getEmptyRow();
            }
            if (ticks % this.ANIMATION_DELAY_DIVIDER === 0 && ticks % (2 * this.ANIMATION_DELAY_DIVIDER) !== 0){
                this.controlledObject.background[indexForDemolition] = this.controlledObject.getEmptyRow();
            }
            if (ticks % (2 * this.ANIMATION_DELAY_DIVIDER) === 0) {
                this.controlledObject.background.splice(indexForDemolition, 1);
                this.controlledObject.background.unshift(this.controlledObject.getEmptyRow());
                return true;
            }
            ticks++;
            return false;
        }
        return devastateTick.bind(this);
    }


    informJudge(indexesForDemolition:number[]){
        const judge = new Judge();
        const  { length: nrOfDemolitions } = indexesForDemolition;
        const eventsList = [gameEvents.NO_DEMOLITION, gameEvents.DEMOLISH_SINGLE, gameEvents.DEMOLISH_DOUBLE, gameEvents.DEMOLISH_TRIPLE, gameEvents.DEMOLISH_QUATRO];
        const properEvent = eventsList[nrOfDemolitions];
        judge.inform(this.controlledObject, properEvent)
        // return properEvent;
    }

    findRowIndexesForDemolition(visitedObject:any){
        const { background } = visitedObject;
        const indexesForDemolition = background.reduce((indexes:number[], row:number[], index:number) => {
            if (this.isRowForDemolition(row)) { indexes.push(index)}
            return indexes;
        }, [])
        return indexesForDemolition;
    }
    isRowForDemolition(row: number[]){
        return row.every(item => item > 0);
    }

}
