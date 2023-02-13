import { board } from "../../constants/constants";
import { BrickMap } from "../../types/types";
import { doWithVerticalBar } from "../AbstractGameLogic";
import { AbstractLayerBuilder } from "./abstractLayer";

const setColumn = (dojo: BrickMap, index:number) => doWithVerticalBar({
    dojo,
    index,
    pixelModificationFunction: () => 1,
})


export class BarLeftLayer extends AbstractLayerBuilder {
    
    public applyNextAnimationFrame(brickMap: BrickMap) {
        this.resetLayer();
        const index = board.WIDTH - (this.tick % board.WIDTH) - 1;
        setColumn(this.layer, index);
        this.tick++;
        this.mergeLayer(brickMap);
    }

    protected modifyBrickFunction(currentBrick: number, layerBrick:number){
        return currentBrick || layerBrick;
    }

}