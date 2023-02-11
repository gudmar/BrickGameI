import { board } from "../../constants/constants";
import { BrickMap } from "../../types/types";
import { doWithVerticalBar, getDojoBar } from "../AbstractGameLogic";
import { AbstractLayerBuilder } from "./abstractLayer";

const setColumn = (dojo: BrickMap, index:number) => doWithVerticalBar({
    dojo,
    index,
    pixelModificationFunction: () => 1,
})


export class BarRightLayer extends AbstractLayerBuilder {
    
    public applyNextAnimationFrame(brickMap: BrickMap) {
        this.resetLayer();
        const index = (this.tick % board.WIDTH);
        setColumn(this.layer, index);
        this.tick++;
        this.mergeLayer(brickMap);
    }

    protected modifyBrickFunction(currentBrick: number, layerBrick:number){
        return currentBrick || layerBrick;
    }

}