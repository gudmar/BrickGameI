import { DisplayControllerForAnimations } from "../DisplayControllerForAnimations";

enum Direction { DOWN, RIGHT, UP, LEFT }

export class RandomPixels extends DisplayControllerForAnimations {
    constructor() {
        super(CommandMediator);
    }
    markPosition() {return 0}
    move() {
        const moveMediator = new this.moveMediator(this);
        moveMediator.move();
        console.log(this.iterations)
    }
}

interface BrickCord { row: number, col: number }

export class CommandMediator {
    mediatedObject: any;
    bricksCords: BrickCord[]|[];
    NR_OF_BRICKS_IN_ONE_MOVE = 1;

    constructor(mediatedObject: any) {
        this.mediatedObject = mediatedObject;
        this.bricksCords = this.getBricksCords();

        this.mediatedObject.getMaxIterations = () => {
            const boardSize = this.mediatedObject.brickMap.length * this.mediatedObject.brickMap.length;
            const maxIterations = boardSize / this.NR_OF_BRICKS_IN_ONE_MOVE;
            return maxIterations;
        }
    
    }

    // getBricksCords() {
    //     const nrOfRows = this.mediatedObject.brickMap.length;
    //     const nrOfCols = this.mediatedObject.brickMap[0].length;
    //     if ( (nrOfCols * nrOfRows) % this.NR_OF_BRICKS_IN_ONE_MOVE ) {
    //         throw new Error('RandomPixeslsMediator: brick array size modulo nr of pixels in move error')
    //     }
    //     let cords:BrickCord[]|[] = [];
    //     for(let i = 0; i < nrOfRows; i++) {
    //         const row = this.getBrickRowCords(i, nrOfCols);
    //         cords = [...cords, ...row]
    //     }
    //     return cords;
    // }

    getBricksCords() {
        const result = this.mediatedObject.layer.flatMap((row: number[], index:number) => {
            return this.getRowCords(row, index);
        }, [])
        return result;
    }

    getRowCords(row:number[], rowIndex:number) {
        const result = row.reduce((acc:BrickCord[], item:number, index:number) => {
            if (item === 0) acc.push({row: rowIndex, col: index});
            return acc;
        }, [])
        return result;
    }

    getBrickRowCords(rowIndex: number, nrOfCols: number) {
        const row = [];
        for(let i = 0; i < nrOfCols; i++) {
            row.push({row: rowIndex, col: i})
        }
        return row;
    }

    private getRandomCords() {
        const cords:BrickCord[] = [];
        this.bricksCords = this.getBricksCords()
        for(let i = 0; i < this.NR_OF_BRICKS_IN_ONE_MOVE; i++) {
            const index = this.random(this.bricksCords.length);
            cords.push(this.bricksCords[index]);
            this.bricksCords.splice(index, 1);
            // console.log(index, this.bricksCords)
        }
        return cords;
    }

    random(highBoundry:number) {
        return Math.floor(Math.random() * highBoundry);
    }

    move() {
        // console.log(this.mediatedObject.isUndoMode, this.mediatedObject.iterations)
        this.mediatedObject.iterations = this.mediatedObject.isUndoMode ? 
            this.mediatedObject.iterations - this.NR_OF_BRICKS_IN_ONE_MOVE : 
            this.mediatedObject.iterations + this.NR_OF_BRICKS_IN_ONE_MOVE;
        if (this.mediatedObject.isUndoMode) {
            this.undo();
        } else {
            this.moveForward();
        }
    }

    undo() {
        const command = this.mediatedObject.popCommand();
        command.undo();
    }

    moveForward() {
        const cordsInThisRound = this.getRandomCords()
        const moveCommand = new ToggleRandomBricksCommand(this.mediatedObject, cordsInThisRound);
        moveCommand.execute();
        this.mediatedObject.addCommand(moveCommand);
    }
}

class ToggleRandomBricksCommand {
    private animatedObject: any;
    private cordsToModify: BrickCord[];
    constructor(animatedObject:any, cordsToModify: BrickCord[]) {
        this.animatedObject = animatedObject;
        this.cordsToModify = cordsToModify;
    }

    public execute() {
        // console.log(this.cordsToModify)
        this.cordsToModify.forEach(cord => {
            this.animatedObject.layer[cord.row][cord.col] += 1;
        })
    }
    public undo() {
        // console.log(this.cordsToModify)
        this.cordsToModify.forEach(cord => {
            this.animatedObject.layer[cord.row][cord.col] -= 1;
        })
    }
}
