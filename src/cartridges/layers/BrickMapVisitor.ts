import { BrickMap } from "../../types/types";

export class BrickMapVisitor{
    private brickMapTemplate;
    private brickMap;
    constructor(brickMap: BrickMap) {
        this.brickMapTemplate = brickMap;
        this.brickMap = brickMap;
    }

    public reset() { this.brickMap = this.copyTemplate();}

    public visit(brickMapModifier: any ) {
        brickMapModifier.applyNextAnimationFrame(this.brickMap);
    }

    private copyTemplate() {
        return this.brickMapTemplate.map(row => this.copyTemplateRow(row));
    }

    private copyTemplateRow(row:number[]) {
        return row.map(_=>_);
    }

    public clone() {
        const newInstance = new BrickMapVisitor(this.copyTemplate());
        return newInstance;
    }

    public get bricks() { return this.brickMap }
}
