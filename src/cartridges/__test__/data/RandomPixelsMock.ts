import { BrickMap } from "../../../types/types";

export const getBoardOf_0 = () => (
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //2
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //3
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //4
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //5
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //6
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //7
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //8
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //10
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //11
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //12
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //13
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //14   
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //15
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //16
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //17
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //18
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //19
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //20
    ]
)

enum Direction { DOWN, RIGHT, UP, LEFT }
interface Cord { x: number, y: number }

export class RandomPixelsMock {
    protected layer = getBoardOf_0();
    public brickMap = getBoardOf_0();
    startPosition: Cord = { x: 0, y: 0 };
    MAX_ITERATIONS: number = 400;
    iterations: number = 0;
    commands: any[] = [];
    isUndoMode: boolean = false;
    moveMediator:any;

    constructor(moveMediator: any) {
        this.moveMediator = moveMediator;
    }

    public addCommand(command:any) {
        this.commands.push(command);
    }

    public applyNextAnimationFrame(brickMap: BrickMap): void {
        this.brickMap = brickMap;
        this.markPosition();
        this.move();
        this.mergeLayer();
    }

    private move() {
        const moveMediator = new this.moveMediator(this);
        moveMediator.move();
        this.iterations = this.isUndoMode ? this.iterations - 1 : this.iterations + 1;
    } 

    protected mergeLayer(): void {
        this.brickMap.forEach((row, index) => {
            this._mergeRow(row, index);
        })
    }
    private _mergeRow(row: number[], index: number) {
        row.forEach((brick, i) => {
            row[i] = this.mergeSingleLayerBrick(brick, this.layer[index][i])
         })
    }

    private get x() { return this.startPosition.x }
    private get y() { return this.startPosition.y }

    private markPosition() {
        this.layer[this.y][this.x] = this.isUndoMode ? 0 : 1;
        return 0
    }
    protected mergeSingleLayerBrick(brickMapBrick:number, layerBrick:number) {
        if (layerBrick === 0) return brickMapBrick;
        return this.toggleBrick(brickMapBrick);
    }

    private toggleBrick(brick: number) { return brick === 1 ? 0 : 1}

}
