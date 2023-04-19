import { directions, Variants } from "../../types/types";
import { GameCreator } from "../GameCreator";
import { Tank } from "./tank";
import { getRandom } from "../../functions/getRandom";

function* TankPlaceCords() {
    yield {col: 1, row: 1};
    yield {col: 8, row: 1};
    yield {col: 1, row: 18};
    yield {col: 9, row: 8};
    return {col: 1, row: 8};
}

const ROTATE_LEFT = 'ROTATE_LEFT';
const ROTATE_RIGHT = 'ROTATE_RIGHT';
const SHOT = 'SHOT';
const FORWARD = 'FORWARD';

interface TankCommands {
    ROTATE_LEFT: number,
    ROTATE_RIGHT: number,
    SHOT: number,
    FORWARD: number,
}

interface MoveProbabilities {
    LOW: number,
    MEDIUM: number,
    HIGH: number,
}

const probabilities:MoveProbabilities = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 4,
}

const TANK_COMMANDS: TankCommands = {
    ROTATE_LEFT: probabilities.MEDIUM,
    ROTATE_RIGHT: probabilities.MEDIUM,
    SHOT: probabilities.HIGH,
    FORWARD: probabilities.LOW,
}

const getRandomCommand = () => {
    const entries: [key: string, val: number][] = Object.entries(TANK_COMMANDS);
    const possibilities:string[] = [];
    entries.forEach(([key, val]) => {
        for(let i = 0; i < val; i++) {
            possibilities.push(key);
        }
    })
    const randomIndex = getRandom(0, possibilities.length);
    return possibilities[randomIndex];
}

export class TankCommander {
    controlledTank = new Tank(Variants.ENEMY, {col: 1, row: 1});
    visitedObject: GameCreator;
    static instances: TankCommander[] = [];
    static createCommanders(visitedObject:GameCreator, maxNrOfControllers:number) {
        if (TankCommander.instances.length === 0) {
            for(let i = 0; i < maxNrOfControllers; i++) {
                const tankCommander = new TankCommander(visitedObject);
                TankCommander.instances.push(tankCommander);
            }
            console.log(TankCommander.instances)
            // return TankCommander.instances;
        } else {
            console.error('Attempt to create TankControllers, when they are already created')
        }
        return TankCommander.instances;
    }

    constructor(visitedObject: GameCreator) {
        this.visitedObject = visitedObject;
    }

    static deleteCommanders() {
        TankCommander.instances.forEach(TankCommander => TankCommander.delete())
        TankCommander.instances = [];
    }

    delete() {
        this.controlledTank.delete();
    }
    
    tryPlacing(){
        if (this.controlledTank.isPlacedOnBoard) return;
        const possibleCords = TankPlaceCords();
        for (let cord of possibleCords) {
            this.controlledTank.cords = cord;
            this.controlledTank.tryPlacing();
            if (this.controlledTank.isPlacedOnBoard) return;
        }
    }
    makeMove() {
        if (!this.controlledTank.isPlacedOnBoard) {
            this.tryPlacing();
        } else {
            const command = getRandomCommand();
            switch(command) {
                case ROTATE_LEFT: this.rotateLeft();break;
                case ROTATE_RIGHT: this.rotateRight(); break;
                case FORWARD: this.forward(); break;
                default: this.shot(); //SHOT
            }
        }
    };
    rotateLeft() {
        const {direction} = this.controlledTank;
        switch(direction) {
            case directions.LEFT: this.controlledTank.move(this.visitedObject, directions.DOWN); break;
            case directions.RIGHT: this.controlledTank.move(this.visitedObject, directions.UP); break;
            case directions.UP: this.controlledTank.move(this.visitedObject, directions.LEFT); break;
            case directions.DOWN: this.controlledTank.move(this.visitedObject, directions.RIGHT); break;
        }
    };
    rotateRight() {
        const {direction} = this.controlledTank;
        switch(direction) {
            case directions.LEFT: this.controlledTank.move(this.visitedObject, directions.UP); break;
            case directions.RIGHT: this.controlledTank.move(this.visitedObject, directions.DOWN); break;
            case directions.UP: this.controlledTank.move(this.visitedObject, directions.RIGHT); break;
            case directions.DOWN: this.controlledTank.move(this.visitedObject, directions.LEFT); break;
        }
    }



    shot() {}
    forward(){
        const {direction} = this.controlledTank;
        switch(direction){
            case directions.DOWN: this.controlledTank.move(this.visitedObject, directions.DOWN);break;
            case directions.UP: this.controlledTank.move(this.visitedObject, directions.UP);break;
            case directions.LEFT: this.controlledTank.move(this.visitedObject, directions.LEFT);break;
            case directions.RIGHT: this.controlledTank.move(this.visitedObject, directions.RIGHT);break;
        }
    }
}
