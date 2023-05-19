import { BrickMap } from "../../types/types";
import { AbstractLayerBuilder } from "./abstractLayer";

export class PauseWhite extends AbstractLayerBuilder {

    public applyNextAnimationFrame(brickMap: BrickMap) {
        this.resetLayer();
    }

    // protected modifyBrickFunction(currentBrick: number, layerBrick:number){
    //     return currentBrick || layerBrick;
    // }

}