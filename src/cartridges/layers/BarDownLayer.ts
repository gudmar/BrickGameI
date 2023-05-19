import { board } from "../../constants/constants";
import { BrickMap } from "../../types/types";
import { getDojoBar } from "../AbstractGameLogic";
import { AbstractLayerBuilder } from "./abstractLayer";

export class BarDownLayer extends AbstractLayerBuilder {

    public applyNextAnimationFrame(brickMap: BrickMap) {
        this.resetLayer();
        const index = (this.tick % board.HEIGHT);
        this.layer[index] = getDojoBar(1);
        this.tick++;
        this.mergeLayer(brickMap);
    }

    protected modifyBrickFunction(currentBrick: number, layerBrick:number){
        return currentBrick || layerBrick;
    }

}