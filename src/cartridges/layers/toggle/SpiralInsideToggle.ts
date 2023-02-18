import { BrickMap } from "../../../types/types";
import { AbstractLayerBuilder } from "../abstractLayer";
import { xor } from "./toggleFunction";

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

export class SpiralInsideToggle extends AbstractLayerBuilder {
    direction: Direction = Direction.DOWN;
    startPosition: Cord = { x: 0, y: 0 };
    brickMap: BrickMap = getDojoOfSymbols(0);
    MAX_ITERATIONS: number = this.getMaxIterations();
    iterations: number = 0;

    public applyNextAnimationFrame(brickMap: BrickMap): void {
        this.brickMap = brickMap;
        this.MAX_ITERATIONS = this.getMaxIterations();
        this.markPosition();
        this.move();
        this.changeDirectionIfNeeded();
        this.terminate();
        this.mergeLayer();
        this.terminate();
    }

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

    private move() {
        switch(this.direction) {
            case Direction.DOWN: this.startPosition.y += 1; break;
            case Direction.RIGHT: this.startPosition.x += 1; break;
            case Direction.UP: this.startPosition.y -= 1; break;
            case Direction.LEFT: this.startPosition.x -= 1; break;
        }
        this.iterations++;
    }

    private markPosition() {
        this.layer[this.y][this.x] = 1;
        return 0
    }

    private changeDirectionIfNeeded() {
        if (this.shouldChangeDirectionToRight()) {
            this.direction = Direction.RIGHT;
            return;
        }
        if (this.shouldChangeDirectionToUp()) {
            this.direction = Direction.UP;
            return;
        }
        if (this.shouldChangeDirectionToLeft()) {
            this.direction = Direction.LEFT;
            return;
        }
        if (this.shouldChangeDirectionToDown()) {
            this.direction = Direction.DOWN;
        }
    }

    private shouldChangeDirectionToRight() {
        return (
            this.direction === Direction.DOWN && 
            (this.y + 1 >= this.yLength || this.layer[this.y + 1][this.x] === 1)
        )
    }
    private shouldChangeDirectionToUp() {
        return (
            this.direction === Direction.RIGHT && 
            (this.x + 1 >= this.xLength || this.layer[this.y][this.x + 1] === 1)
        )
    }
    private shouldChangeDirectionToLeft() {
        return (
            this.direction === Direction.UP && 
            (this.y <= 0 || this.layer[this.y - 1][this.x] === 1)
        )
    }
    private shouldChangeDirectionToDown() {
        return (
            this.direction === Direction.LEFT && 
            (this.x <= 0 || this.layer[this.y][this.x - 1] === 1)
        )
    }
    private terminate() {
        if (this.MAX_ITERATIONS <= this.iterations) {
            this.startPosition = { x: 0, y: 0 }
            this.direction = Direction.DOWN;
            this.iterations = 0;
            this.resetLayer();
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