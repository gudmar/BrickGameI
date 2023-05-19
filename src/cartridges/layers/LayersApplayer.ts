import { KeyPress } from "../../types/KeyPress";
import { BrickMap, GameLogicArgs } from "../../types/types";
import { GameLogic, getDojoOfSymbols, getNextFigureOfSymbols } from "../AbstractGameLogic";
import { EMPTY_NEXT_FIGURE, TWO_IN_ONE } from "../constants";
import { BarDownLayer } from "./BarDownLayer";
import { BarRightLayer } from "./BarRightLayer";
import { BrickMapVisitor } from "./BrickMapVisitor";

const getEmptyGameLogic = (): GameLogicArgs => (
    {
        score: 0,
        level: 1,
        speed: 1,
        nextFigure : getNextFigureOfSymbols(0),
        brickMap: getDojoOfSymbols(0),//<BrickMap>getDojoOfSymbols(0),
        isPaused: false,
        isAnimating: false,
    }
)

export class LayersApplayer extends GameLogic {
    static instance: any;
    public NAME = "Layer applier";
    private layerGenerators = [
        BarRightLayer,
        BarDownLayer,
    ]
    private visitor;

    private generatorInstances;

    constructor() {
        if(LayersApplayer.instance) return LayersApplayer.instance;
        super();
        this.visitor = new BrickMapVisitor(TWO_IN_ONE);
        this.generatorInstances = this.layerGenerators.map((generator) => {
            const g = new generator();
            return g;
        })
        
        LayersApplayer.instance = this;
        return this;
    }

    public getNextStateOnTick(): GameLogicArgs {
        const visitor = this.visitor?.clone();
        this.generatorInstances!.forEach(layerGenerator => {
            layerGenerator.accept(visitor);
        });
        const result = getEmptyGameLogic()
        result.brickMap = visitor!.bricks;
        return result
    }

    public getNextStateOnKeyPress(keyPresses: KeyPress): GameLogicArgs {
        return this.getEmptyGameLogicArgs();
    }

    getTwoInOne(): GameLogicArgs {
        return {
            score: 0,
            level: 1,
            speed: 1,
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
}