import { DisplayControllerForAnimations } from "../DisplayControllerForAnimations";

enum Direction { DOWN, RIGHT, UP, LEFT }

export class SpiralInsideToggle extends DisplayControllerForAnimations {
    constructor() {
        super(CommandMediator);
    }
}

// export class SpiralInsideToggle extends AbstractLayerBuilder {
//     direction: Direction = Direction.DOWN;
//     startPosition: Cord = { x: 0, y: 0 };
//     brickMap: BrickMap = getDojoOfSymbols(0);
//     MAX_ITERATIONS: number = this.getMaxIterations();
//     iterations: number = 0;
//     commands: any[] = [];
//     isUndoMode: boolean = false;

//     public applyNextAnimationFrame(brickMap: BrickMap): void {
//         this.brickMap = brickMap;
//         this.MAX_ITERATIONS = this.getMaxIterations();
//         this.markPosition();
//         this.move();
//         this.mergeLayer();
//         this.terminate();
//     }

//     addCommand(command:any) { this.commands.push(command) }
//     popCommand() { return this.commands.pop(); }

//     public getLayer() { return this.layer }

//     protected mergeLayer(): void {
//         this.brickMap.forEach((row, index) => {
//             this._mergeRow(row, index);
//         })
//     }
//     private _mergeRow(row: number[], index: number) {
//         row.forEach((brick, i) => {
//             row[i] = this.mergeSingleLayerBrick(brick, this.layer[index][i])
//          })
//     }
//     protected mergeSingleLayerBrick(brickMapBrick:number, layerBrick:number) {
//         if (layerBrick === 0) return brickMapBrick;
//         return this.toggleBrick(brickMapBrick);
//     }

//     private toggleBrick(brick: number) { return brick === 1 ? 0 : 1}

//     private getMaxIterations() {
//         return this.brickMap.length * this.brickMap[0].length;
//     }

//     private move() {
//         const moveMediator = new CommandMediator(this);
//         moveMediator.move();
//         this.iterations = this.isUndoMode ? this.iterations - 1 : this.iterations + 1;
//     }

//     private markPosition() {
//         this.layer[this.y][this.x] = this.isUndoMode ? 0 : 1;
//         return 0
//     }

//     private terminate() {
//         if (this.MAX_ITERATIONS <= this.iterations) {
//             this.isUndoMode = true;
//         };
//         if (this.iterations <= 0) {
//             this.isUndoMode = false;
//         }
//     }
//     public reset(): void {
//         this.terminate()
//     }


//     private get xLength() { return this.brickMap[0].length; }
//     private get yLength() { return this.brickMap.length; }
//     private get x() { return this.startPosition.x }
//     private get y() { return this.startPosition.y }

//     protected modifyBrickFunction(currentBrick: number, layerBrick:number){
//         return xor(currentBrick, layerBrick)
//     }
// }

class CommandMediator {
    moveCommands: any[];
    turnCommands: any[];
    mediatedObject: any;

    constructor(mediatedObject: any) {
        this.mediatedObject = mediatedObject;
        const moveDownCommand = new MoveDownCommand(mediatedObject);
        const moveUpCommand = new MoveUpCommand(mediatedObject);
        const moveLeftCommand = new MoveLeftCommand(mediatedObject);
        const moveRightCommand = new MoveRightCommand(mediatedObject);
        const turnRightCommand = new TurnRightCommand(mediatedObject);
        const turnUpCommand = new TurnUpCommand(mediatedObject);
        const turnLeftCommand = new TurnLeftCommand(mediatedObject);
        const turnDownCommand = new TurnDownCommand(mediatedObject);
        this.moveCommands = [
            moveDownCommand, 
            moveUpCommand,
            moveLeftCommand,
            moveRightCommand,
        ];
        this.turnCommands = [
            turnRightCommand,
            turnUpCommand,
            turnLeftCommand,
            turnDownCommand,
        ]
    }

    move() {
        if (this.mediatedObject.isUndoMode) {
            this.undo();
        } else {
            
            this.moveForward();
            this.turn();
        }
    }

    isTurnCommand(command:any) {
        const TURN_CLASSES = [
            TurnDownCommand, TurnLeftCommand, TurnRightCommand, TurnUpCommand
        ]
        return TURN_CLASSES.some((turnCommand) => (command instanceof turnCommand))
    }

    undo() {
        const command = this.mediatedObject.popCommand();
        command.undo();
        if (this.isTurnCommand(command)) { this.undo() }
    }

    moveForward() {
        const properMoveCommand = this.getProperMoveCommand();
        properMoveCommand.execute();
        this.mediatedObject.addCommand(properMoveCommand);
    }

    turn() {
        const properTurnCommand = this.getProperTurnCommand();
        if(properTurnCommand){
            properTurnCommand.execute();
            this.mediatedObject.addCommand(properTurnCommand);    
        }
    }


    getProperMoveCommand() {
        return this.moveCommands.find((command) => command.shouldExecute(this.mediatedObject));
    }

    getProperTurnCommand() {
        return this.turnCommands.find((command) => command.shouldExecute(this.mediatedObject))
    }

}

class MoveDownCommand {
    private animatedObject: any;
    constructor(animatedObject:any) {
        this.animatedObject = animatedObject;
    }

    public shouldExecute() {
        return this.animatedObject.direction === Direction.DOWN
    }

    public execute() {
        this.animatedObject.startPosition.y += 1;
    }
    public undo() {
        this.animatedObject.startPosition.y -= 1;
    }
}

class MoveRightCommand {
    private animatedObject: any;
    constructor(animatedObject:any) {
        this.animatedObject = animatedObject;
    }

    public shouldExecute() {
        return this.animatedObject.direction === Direction.RIGHT;
    }

    public execute() {
        this.animatedObject.startPosition.x += 1;
    }
    public undo() {
        this.animatedObject.startPosition.x -= 1;
    }
}

class MoveUpCommand {
    private animatedObject: any;
    constructor(animatedObject:any) {
        this.animatedObject = animatedObject;
    }

    public shouldExecute() {
        return this.animatedObject.direction === Direction.UP
    }

    public execute() {
        this.animatedObject.startPosition.y -= 1;
    }
    public undo() {
        this.animatedObject.startPosition.y += 1;
    }
}

class MoveLeftCommand {
    private animatedObject: any;
    constructor(animatedObject:any) {
        this.animatedObject = animatedObject;
    }

    public shouldExecute() {
        return this.animatedObject.direction === Direction.LEFT
    }

    public execute() {
        this.animatedObject.startPosition.x -= 1;
    }
    public undo() {
        this.animatedObject.startPosition.x += 1;
    }
}

class TurnRightCommand {
    private animatedObject: any;
    constructor(animatedObject:any) {
        this.animatedObject = animatedObject;
    }

    public shouldExecute() {
        const result = (
            this.animatedObject.direction === Direction.DOWN &&
            (
                this.animatedObject.y + 1 >= this.animatedObject.yLength
                    ||
                this.animatedObject.layer[this.animatedObject.y + 1][this.animatedObject.x] === 1
            )
        )
        return result;
    }

    public execute() {
        this.animatedObject.direction = Direction.RIGHT
    }
    public undo() {
        this.animatedObject.direction = Direction.DOWN
    }
}

class TurnUpCommand {
    private animatedObject: any;
    constructor(animatedObject:any) {
        this.animatedObject = animatedObject;
    }

    public shouldExecute() {
        const result = (
            this.animatedObject.direction === Direction.RIGHT &&
            (
                this.animatedObject.x + 1 >= this.animatedObject.xLength
                    ||
                this.animatedObject.layer[this.animatedObject.y][this.animatedObject.x + 1] === 1
            )
        )
        return result;
    }

    public execute() {
        this.animatedObject.direction = Direction.UP
    }
    public undo() {
        this.animatedObject.direction = Direction.RIGHT
    }
}

class TurnLeftCommand {
    private animatedObject: any;
    constructor(animatedObject:any) {
        this.animatedObject = animatedObject;
    }

    public shouldExecute() {
        const result = (
            this.animatedObject.direction === Direction.UP &&
            (
                this.animatedObject.y <= 0
                    ||
                this.animatedObject.layer[this.animatedObject.y - 1][this.animatedObject.x] === 1
            )
        )
        return result;
    }

    public execute() {
        this.animatedObject.direction = Direction.LEFT
    }
    public undo() {
        this.animatedObject.direction = Direction.UP
    }
}

class TurnDownCommand {
    private animatedObject: any;
    constructor(animatedObject:any) {
        this.animatedObject = animatedObject;
    }

    public shouldExecute() {
        const result = (
            this.animatedObject.direction === Direction.LEFT &&
            (
                this.animatedObject.x <= 0
                    ||
                this.animatedObject.layer[this.animatedObject.y][this.animatedObject.x - 1] === 1
            )
        )
        return result;
    }

    public execute() {
        this.animatedObject.direction = Direction.DOWN
    }
    public undo() {
        this.animatedObject.direction = Direction.LEFT
    }
}
