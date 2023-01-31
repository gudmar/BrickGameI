import { GameLogic } from './AbstractGameLogic';
import { KeyPress, GameLogicArgs } from '../types/types';
import { EMPTY_NEXT_FIGURE, TWO_IN_ONE } from './constants';

export class TestCartridge extends GameLogic {
    static instance: any;
    public NAME = "Test cartridge";
    constructor() {
        if(TestCartridge.instance) return TestCartridge.instance;
        super();
        TestCartridge.instance = this;
        return this;
    }

    getNextStateOnTick(clockValue: number): GameLogicArgs {
        return this.getTwoInOne();
    }

    getNextStateOnKeyPress(keyPresses: KeyPress): GameLogicArgs {
        return this.getEmptyGameLogicArgs();
    }

    getTwoInOne(): GameLogicArgs {
        return {
            score: 0,
            level: 0,
            speed: 0,
            nextFigureFieldContent: EMPTY_NEXT_FIGURE,
            brickCoordinantes: TWO_IN_ONE,
        }
    }
    protected getEmptyGameLogicArgs():GameLogicArgs {
        return {
            score:this.score, 
            level: this.level, 
            speed: this.speed, 
            nextFigureFieldContent : this.EMPTY_FIELD_CONTENT,
            brickCoordinantes: this.EMPRY_BRICK_COORDINANTES,
        }
    }


    protected getAllFilled() { this.getDojoOfSymbols(1) };
    protected getAllEmpty() { this.getDojoOfSymbols(0) };

}