import { board } from "../../../constants/constants";
import { BrickMap } from "../../../types/types";
import { doWithVerticalBar } from "../../AbstractGameLogic";
import { AbstractLayerBuilder } from "../abstractLayer";
import { toggle } from "./toggleFunction";

const setColumn1 = (dojo: BrickMap, index:number) => doWithVerticalBar({
    dojo,
    index,
    pixelModificationFunction: (px:number) => 1
})

const setColumn2 = (dojo: BrickMap, index:number) => doWithVerticalBar({
    dojo,
    index,
    pixelModificationFunction: (px:number) => 0
})

export class BarLeftRightLayer extends AbstractLayerBuilder {

    public applyNextAnimationFrame(brickMap: BrickMap): void {
        if (this.tick % (board.WIDTH * 2) >= board.WIDTH) {
            this.applyNextAnimationFrameLeft(brickMap);
        } else {
            this.applyNextAnimationFrameRight(brickMap);
        }
    }

    private applyNextAnimationFrameLeft(brickMap: BrickMap) {
        const index = board.WIDTH - (this.tick % board.WIDTH) - 1;
        setColumn2(this.layer, index);
        this.tick++;
        this.mergeLayer(brickMap);
    }
    
    private applyNextAnimationFrameRight(brickMap: BrickMap) {
        const index = (this.tick % board.WIDTH);
        setColumn1(this.layer, index);
        this.tick++;
        this.mergeLayer(brickMap);
    }

    protected modifyBrickFunction(currentBrick: number, layerBrick:number){
        return toggle(currentBrick, layerBrick)
    }
}