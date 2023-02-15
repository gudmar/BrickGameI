import { ScheaduleProps } from '../../types/types'

export class AnimationScheaduler {
    private scheadule;
    private tick;
    private totalTicks;
    constructor(scheadule: ScheaduleProps[]) {

        this.tick = 0;
        this.scheadule = scheadule;
        this.totalTicks = this.getTotalTicks();
        this.addSequencersToScheadule();
    }  

    getNextStateOnTick() {
        const scheadulerIndex = this.getScheadulerIndex(this.tick);
        const newBackground = this.scheadule[scheadulerIndex].scheaduler!.getNextStateOnTick();
        this.tick++;
        return newBackground;
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