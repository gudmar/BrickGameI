import { BrickMap } from '../../types/types';
import { AbstractLayerBuilder } from "./abstractLayer";
import { xor } from "./toggle/toggleFunction";

enum Direction { DOWN, RIGHT, UP, LEFT }
interface Cord { x: number, y: number }

const emptyArr = (length: number) => Array(length).fill( {} );
const getDojoOfSymbols = (nr: number, width: number = 10, height: number = 20) => {
    const arr = []
    for(let i = 0; i < height; i++){
        const emptyArray = emptyArr(width).map(_ => nr)
        arr.push(emptyArray)
    }
    return arr;
}

export class DisplayControllerForAnimations extends AbstractLayerBuilder {
    direction: Direction = Direction.DOWN;
    startPosition: Cord = { x: 0, y: 0 };
    brickMap: BrickMap = getDojoOfSymbols(0);
    MAX_ITERATIONS: number = this.getMaxIterations();
    iterations: number = 0;
    commands: any[] = [];
    isUndoMode: boolean = false;
    moveMediator:any;

    constructor(moveMediator: any) {
        super();
        this.moveMediator = moveMediator;
    }

    public applyNextAnimationFrame(brickMap: BrickMap): void {
        this.brickMap = brickMap;
        this.markPosition();
        this.move();
        this.mergeLayer();
        this.terminate();
    }

    addCommand(command:any) { this.commands.push(command) }
    popCommand() { return this.commands.pop(); }

    public getLayer() { return this.layer }

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
    protected mergeSingleLayerBrick(brickMapBrick:number, layerBrick:number) {
        if (layerBrick === 0) return brickMapBrick;
        return this.toggleBrick(brickMapBrick);
    }

    private toggleBrick(brick: number) { return brick === 1 ? 0 : 1}

    private getMaxIterations() {
        return this.brickMap.length * this.brickMap[0].length;
    }

    protected move() {
        const moveMediator = new this.moveMediator(this);
        moveMediator.move();
        this.iterations = this.isUndoMode ? this.iterations - 1 : this.iterations + 1;
    }

    protected markPosition() {
        this.layer[this.y][this.x] = this.isUndoMode ? 0 : 1;
        return 0
    }

    protected terminate() {
        if (this.MAX_ITERATIONS <= this.iterations) {
            this.isUndoMode = true;
        };
        if (this.iterations <= 0) {
            this.isUndoMode = false;
        }
    }
    public reset(): void {
        this.terminate()
    }


    private get xLength() { return this.brickMap[0].length; }
    private get yLength() { return this.brickMap.length; }
    private get x() { return this.startPosition.x }
    private get y() { return this.startPosition.y }

    protected modifyBrickFunction(currentBrick: number, layerBrick:number){
        return xor(currentBrick, layerBrick)
    }
}
