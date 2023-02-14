import { board } from "../../../constants/constants";
import { BrickMap } from "../../../types/types";
import { doWithVerticalBar } from "../../AbstractGameLogic";
import { BarLeftLayer } from "../BarLeftLayer";
import { toggle } from "./toggleFunction";

const setColumn = (dojo: BrickMap, index:number) => doWithVerticalBar({
    dojo,
    index,
    pixelModificationFunction: () => 1,
})

export class BarLeftToggleLayer extends BarLeftLayer {

    public applyNextAnimationFrame(brickMap: BrickMap) {
        const index = board.WIDTH - (this.tick % board.WIDTH) - 1;
        setColumn(this.layer, index);
        this.tick++;
        this.mergeLayer(brickMap);
    }
    
    protected modifyBrickFunction(currentBrick: number, layerBrick:number){
        return toggle(currentBrick, layerBrick)
    }
}