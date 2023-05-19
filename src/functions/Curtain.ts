enum Stage {up, down}

export class CurtainClearAnimation {
    background: number[][];
    stage: Stage = Stage.up;
    count: number;
    done = false;
    maxRow: number;
    constructor(background: number[][]){
        this.background = background;
        this.maxRow = background.length - 1; 
        this.count = this.maxRow;
    }
    getBackground(){
        if (this.stage === Stage.up) this.fill()
        if (this.stage === Stage.down) this.clear()
        this.changeCount();
        return this.background
    }
    changeCount(){
        if (this.done) return;
        if (this.stage === Stage.up && this.count >0) {
            this.count--;
            return;
        }
        if (this.stage === Stage.up && this.count <= 0){
            this.stage = Stage.down;
            return
        }
        if (this.stage === Stage.down) this.count++;
        if (this.stage === Stage.down && this.count >= this.maxRow){
            this.done = true;
        }
    }

    fillRowWith(item:number){
        const newRow = this.background[this.count].map(_ => item);
        this.background[this.count] = newRow;
    }
    fill() {this.fillRowWith(1)}
    clear() {this.fillRowWith(0)}
}