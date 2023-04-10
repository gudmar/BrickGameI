const PLAYER_TANK = [
    [0, 1, 0],
    [1, 1, 1],
    [1, 1, 1],
]

const ENEMY_TANK = [
    [0, 1, 0],
    [1, 1, 1],
    [1, 0, 1],
]

export enum variants {PLAYER, ENEMY}

export class Tank{
    variant = variants.ENEMY;
    currentTank = this.getInitialTank();
    constructor(variant: variants){
        this.variant = variant;
    }

    getInitialTank(){
        if (this.variant === variants.ENEMY) {
            return ENEMY_TANK;
        }
        return PLAYER_TANK;
    }

    rotateLeft(){
        const cp = [];
        const width = this.currentTank[0].length - 1;
        const height = this.currentTank.length - 1;
        for (let vertical = height; vertical >=0; vertical--){
            
        }
    }
    getRowForRotateLeft() {
        const width = this.currentTank[0].length - 1;
        const height = this.currentTank.length - 1;
        
    }

    rotateRight(){

    }
}
