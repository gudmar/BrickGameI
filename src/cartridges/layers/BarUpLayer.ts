import { board } from "../../constants/constants";
import { BrickMap } from "../../types/types";
import { getDojoBar } from "../AbstractGameLogic";
import { AbstractLayerBuilder } from "./abstractLayer";

export class BarUpLayer extends AbstractLayerBuilder {

    public applyNextAnimationFrame(brickMap: BrickMap) {
        this.resetLayer();
        const index = board.HEIGHT - (this.tick % board.HEIGHT) - 1;
        this.layer[index] = getDojoBar(1);
        this.tick++;
        this.mergeLayer(brickMap);
    }

    protected modifyBrickFunction(currentBrick: number, layerBrick:number){
        return currentBrick || layerBrick;
    }

}