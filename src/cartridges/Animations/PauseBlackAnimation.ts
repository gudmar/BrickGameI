import { AnimatorSequencersApplier } from "../AnimationSequencer/AnimationSequencer";
import { TWO_IN_ONE } from "../constants";
import { PauseBlack } from "../layers/PauseBlack";
import { AnimationTemplate } from "./AnimationTemplate";

const sequencerConfigurations = [
    [
        {
            animators: [PauseBlack],
            repetitions: 5,
        },
    ],
]

export class PauseBlackAnimation extends AnimationTemplate {
    public NAME = "Pause white";
    constructor() {
        super();
        this.animationSequencer = new AnimatorSequencersApplier({
            background: TWO_IN_ONE,
            sequencerConfigurations,
        })
    }
}

// export class PauseBlackAnimation extends GameLogic {
//     static instance: any;
//     public NAME = "Pause white";
//     private animationSequencer;

//     constructor() {
//         if(PauseBlackAnimation.instance) return PauseBlackAnimation.instance;
//         super();
//         this.animationSequencer = new AnimatorSequencersApplier({
//             background: TWO_IN_ONE,
//             sequencerConfigurations,
//         })
//         PauseBlackAnimation.instance = this;
//         return this;
//     }

//     public getNextStateOnTick(): GameLogicArgs {
//         const background = this.animationSequencer?.getNextStateOnTick();
//         return { ...this.getTwoInOne(), brickMap: <BrickMap>background }
//     }

//     public getNextStateOnKeyPress(keyPresses: KeyPress): GameLogicArgs {
//         return this.getEmptyGameLogicArgs();
//     }

//     getTwoInOne(): GameLogicArgs {
//         return {
//             score: 0,
//             level: 0,
//             speed: 0,
//             nextFigure: EMPTY_NEXT_FIGURE,
//             brickMap: TWO_IN_ONE,
//             isPaused: false,
//             isAnimating: false,
//         }
//     }

//     protected getEmptyGameLogicArgs():GameLogicArgs {
//         return {
//             score:this.score, 
//             level: this.level, 
//             speed: this.speed, 
//             nextFigure : this.EMPTY_FIELD_CONTENT,
//             brickMap: this.EMPRY_BRICK_COORDINANTES,
//             isPaused: false,
//             isAnimating: false,
//         }
//     }
// }