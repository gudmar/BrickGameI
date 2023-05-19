import { board } from "../../../constants/constants";
import { BrickMap } from "../../../types/types";
import { getDojoBar } from "../../AbstractGameLogic";
import { BarDownLayer } from "../BarDownLayer";
import { toggle } from "./toggleFunction";

export class BarDownToggleLayer extends BarDownLayer {

    public applyNextAnimationFrame(brickMap: BrickMap) {
        // this.resetLayer();
        const index = (this.tick % board.HEIGHT);
        this.layer[index] = getDojoBar(1);
        this.tick++;
        this.mergeLayer(brickMap);
    }

    protected modifyBrickFunction(currentBrick: number, layerBrick:number){
        return toggle(currentBrick, layerBrick)
    }
}