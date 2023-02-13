import { BrickMap } from "../../types/types";
import { getDojoOfSymbols } from "../AbstractGameLogic";

export class AbstractLayerBuilder {
    protected tick;
    protected layer:BrickMap;

    constructor() {
        this.tick = 0;
        this.layer = getDojoOfSymbols(0);
    }

    protected resetLayer() { this.layer = getDojoOfSymbols(0) }

    public reset() {
        this.resetLayer();
        this.tick = 0;
    }

    public accept(brickMapVisitor: any){
        brickMapVisitor.visit(this);
    }

    protected getHight(brickMap:BrickMap) {
        return brickMap.length;
    }

    protected getWidth(brickMap:BrickMap) {
        return brickMap[0].length;
    }

    public applyNextAnimationFrame(brickMap: BrickMap) {
        throw new Error('applyNextAnimationFrame has to be overwritten. It takes a brickMap and applies next layer on top of it')
    }

    protected mergeLayer(brickMap: BrickMap) {
        brickMap.forEach((row, index) => brickMap[index] = this.mergeRow(row, this.layer[index]))
    }

    private mergeRow(brickMapRow:number[], layerRow:number[]) {
        return brickMapRow.map((brick: number, index:number) => {
                return this.modifyBrickFunction(brick, layerRow[index])
            }
        )
    }

    protected modifyBrickFunction(currentBrick: number, layerBrick:number){
        throw new Error('modifyBrickFunction should be implemented')
        return 0;
    }
}
