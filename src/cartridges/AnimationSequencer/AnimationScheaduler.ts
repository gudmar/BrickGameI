import { ScheaduleProps } from '../../types/types'
import { EMPTY_BOARD } from '../constants';

export class AnimationScheaduler {
    private scheadule;
    private tick;
    private totalTicks;
    private tickDivider = 1;
    private timerDivisionCounter = 0;
    private brickMap = EMPTY_BOARD;
    constructor(scheadule: ScheaduleProps[]) {

        this.tick = 0;
        this.scheadule = scheadule;
        this.totalTicks = this.getTotalTicks();
        this.addSequencersToScheadule();
    }  

    getNextStateOnTick() {
        const scheadulerIndex = this.getScheadulerIndex(this.tick);
        this.tickDivider = this.getDivider(this.scheadule[scheadulerIndex]);
        if (this.timerDivisionCounter === 0 || this.timerDivisionCounter % this.tickDivider === 0) {
            this.brickMap = this.scheadule[scheadulerIndex].scheaduler!.getNextStateOnTick();
            this.tick++;    
        }
        this.timerDivisionCounter++;
        return this.brickMap;
    }

    private getDivider (animationDescriptor : any) {
        const {tickDivider} = animationDescriptor;
        if (!tickDivider || tickDivider <= 0) return 1;
        return tickDivider
    }    

    getScheadulerIndex(tick:number){
        const normalizeTick = this.normalizeTick(tick);
        let acc = 0;
        const index = this.scheadule.findIndex((position) => {
            acc += position.repetitions;
            if (acc >= normalizeTick) return true;
            return false;
        })
        return index;
    }

    normalizeTick (tick:number) {
        return tick % this.totalTicks;
    }
    
    getTotalTicks() {
        return this.scheadule.reduce((acc, position) => {
            const result = acc + position.repetitions;
            return result;
        }, 0)
    }

    addSequencersToScheadule() {
        this.scheadule.forEach((position: ScheaduleProps) => {
            const scheaduler = new position.animationSequencer();
            position.scheaduler = scheaduler;
        })
    }
}