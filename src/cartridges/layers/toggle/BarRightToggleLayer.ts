import { board } from "../../../constants/constants";
import { BrickMap } from "../../../types/types";
import { doWithVerticalBar } from "../../AbstractGameLogic";
import { BarRightLayer } from "../BarRightLayer";
import { toggle } from "./toggleFunction";

const setColumn = (dojo: BrickMap, index:number) => doWithVerticalBar({
    dojo,
    index,
    pixelModificationFunction: () => 1,
})

export class BarRightToggleLayer extends BarRightLayer {
    
    public applyNextAnimationFrame(brickMap: BrickMap) {
        const index = (this.tick % board.WIDTH);
        setColumn(this.layer, index);
        this.tick++;
        this.mergeLayer(brickMap);
    }

    protected modifyBrickFunction(currentBrick: number, layerBrick:number){
        return toggle(currentBrick, layerBrick)
    }
}