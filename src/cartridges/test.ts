import { GameLogic } from './AbstractGameLogic';
import { KeyPress, GameLogicArgs } from '../types/types';
import { EMPTY_NEXT_FIGURE, TWO_IN_ONE } from './constants';
import { BarUp } from './test/BarUp';
import { BarRight } from './test/BarRight';
import { BarLeft } from './test/BarLeft';

export class TestCartridge extends GameLogic {
    static instance: any;
    public NAME = "Test cartridge";
    private animationClassInstance = new BarLeft();
    constructor() {
        if(TestCartridge.instance) return TestCartridge.instance;
        super();
        TestCartridge.instance = this;
        return this;
    }

    public getNextStateOnTick(clockValue: number): GameLogicArgs {
        return this.animationClassInstance.nextTick(clockValue);
        // return this.getTwoInOne();
    }

    public getNextStateOnKeyPress(keyPresses: KeyPress): GameLogicArgs {
        return this.getEmptyGameLogicArgs();
    }

    getTwoInOne(): GameLogicArgs {
        return {
            score: 0,
            level: 0,
            speed: 0,
            nextFigure: EMPTY_NEXT_FIGURE,
            brickMap: TWO_IN_ONE,
            isPaused: false,
            isAnimating: false,
        }
    }
    protected getEmptyGameLogicArgs():GameLogicArgs {
        return {
            score:this.score, 
            level: this.level, 
            speed: this.speed, 
            nextFigure : this.EMPTY_FIELD_CONTENT,
            brickMap: this.EMPRY_BRICK_COORDINANTES,
            isPaused: false,
            isAnimating: false,
        }
    }


    protected getAllFilled() { this.getDojoOfSymbols(1) };
    protected getAllEmpty() { this.getDojoOfSymbols(0) };

}