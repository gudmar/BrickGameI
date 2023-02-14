import { board } from "../../../constants/constants";
import { BrickMap } from "../../../types/types";
import { getDojoBar } from "../../AbstractGameLogic";
import { BarUpLayer } from "../BarUpLayer";
import { toggle } from "./toggleFunction";

export class BarUpToggleLayer extends BarUpLayer {

    public applyNextAnimationFrame(brickMap: BrickMap) {
        const index = board.HEIGHT - (this.tick % board.HEIGHT) - 1;
        this.layer[index] = getDojoBar(1);
        this.tick++;
        this.mergeLayer(brickMap);
    }

    protected modifyBrickFunction(currentBrick: number, layerBrick:number){
        return toggle(currentBrick, layerBrick)
    }
}