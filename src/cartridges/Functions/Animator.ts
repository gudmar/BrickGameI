import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { GameCreator } from "../GameCreator";

export enum AnimationTypes {curtain, fire}

export class Animator {
    context: NextStateCalculator;
    visitedObject: GameCreator;
    animationProvider?: any;

    constructor(context: NextStateCalculator, visitedObject: GameCreator){
        this.context = context;
        this.visitedObject = visitedObject;
        

    }

    tick(AnimationProvider: any, callback: () => void) {
        if (!this.animationProvider) {
            this.animationProvider = new AnimationProvider(this.visitedObject.background);
        }        
        this.visitedObject.background = this.animationProvider.getBackground() as number[][];
        if (this.animationProvider!.done) {
            this.context.isAnimating = false;
            callback();            
            this.animationProvider = undefined;
        }
    }
}
