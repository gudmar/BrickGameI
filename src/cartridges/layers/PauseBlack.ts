import { BrickMap } from "../../types/types";
import { AbstractLayerBuilder } from "./abstractLayer";
import { toggle } from "./toggle/toggleFunction";

export class PauseBlack extends AbstractLayerBuilder {

    public applyNextAnimationFrame(brickMap: BrickMap) {
        // this.setLayerBlack();
        this.resetLayer();
        this.mergeLayer(brickMap);
    }


    protected modifyBrickFunction(currentBrick: number, layerBrick:number){
        // return 1;
        return toggle(currentBrick, layerBrick) === 0 ? 1 : 0
    }

}