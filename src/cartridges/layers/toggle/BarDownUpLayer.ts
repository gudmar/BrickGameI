import { board } from "../../../constants/constants";
import { BrickMap } from "../../../types/types";
import { getDojoBar } from "../../AbstractGameLogic";
import { AbstractLayerBuilder } from "../abstractLayer";
import { BarDownLayer } from "../BarDownLayer";
import { toggle } from "./toggleFunction";



export class BarDownUpLayer extends AbstractLayerBuilder {

    public applyNextAnimationFrame(brickMap: BrickMap) {
        if (this.tick % (board.HEIGHT * 2) >= board.HEIGHT) {
            this.applyNextAnimationFrameUp(brickMap);
        } else {
            this.applyNextAnimationFrameDown(brickMap);
        }
    }

    public applyNextAnimationFrameDown(brickMap: BrickMap) {
        const index = (this.tick % board.HEIGHT);
        this.layer[index] = getDojoBar(1);
        this.tick++;
        this.mergeLayer(brickMap);
    }

    public applyNextAnimationFrameUp(brickMap: BrickMap) {
        const index = board.HEIGHT - (this.tick % board.HEIGHT) - 1;
        this.layer[index] = getDojoBar(0);
        this.tick++;
        this.mergeLayer(brickMap);
    }

    protected modifyBrickFunction(currentBrick: number, layerBrick:number){
        return toggle(currentBrick, layerBrick)
    }
}