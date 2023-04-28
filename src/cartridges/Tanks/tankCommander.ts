import { directions, Variants } from "../../types/types";
import { GameCreator, PawnCords } from "../GameCreator";
import { Tank } from "./tank";
import { getRandom } from "../../functions/getRandom";

const getRandomArrayElement = (array:any[]) => {
    const randomIndex = array.length === 0 ? 0 : getRandom(0, array.length);
    const [randomElement] = array.splice(randomIndex, 1);
    return randomElement
}

export class TankPlacePositionProvider {
    static nrOfTankPlacedSinceGameStart = 0;
    static possibleCords = [
        {col: 1, row: 1},
        {col: 8, row: 1},
        {col: 1, row: 18},
        {col: 8, row: 18},
        {col: 8, row: 8},
        {col: 1, row: 8},
    ]
    static shuffledPossibleCords:any[] = [];
    static shufflePossibleCords() {
        const newArray: any[] = [];
        const shuffle = (arr: any[]) => {
            if (!arr.length) return;
            const nextElement = getRandomArrayElement(arr);
            newArray.push(nextElement);
            shuffle(arr);
        }
        shuffle([...TankPlacePositionProvider.possibleCords]);
        TankPlacePositionProvider.shuffledPossibleCords = newArray;
    }
    static getNextCord() {
        let result: PawnCords;
        if (!TankPlacePositionProvider.shuffledPossibleCords.length) TankPlacePositionProvider.shufflePossibleCords()
        if (TankPlacePositionProvider.nrOfTankPlacedSinceGameStart < TankPlacePositionProvider.possibleCords.length) {
            result = TankPlacePositionProvider.possibleCords[TankPlacePositionProvider.nrOfTankPlacedSinceGameStart]
        } else {
            result = TankPlacePositionProvider.shuffledPossibleCords[TankPlacePositionProvider.nrOfTankPlacedSinceGameStart % TankPlacePositionProvider.possibleCords.length];
        }
        TankPlacePositionProvider.nrOfTankPlacedSinceGameStart++;
        return result
    }
    
}

function* TankPlaceCords() {
    yield {col: 1, row: 1};
    yield {col: 8, row: 1};
    yield {col: 1, row: 18};
    yield {col: 8, row: 18};
    yield {col: 8, row: 8};
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
        this.controlledTank.correctCanBePlaced();
        if (this.controlledTank.isPlacedOnBoard || !this.controlledTank.canBePlaced) return;
        for (let cord of TankPlacePositionProvider.possibleCords) {
            this.controlledTank.cords = TankPlacePositionProvider.getNextCord();
            this.controlledTank.tryPlacing();
            if (this.controlledTank.isPlacedOnBoard) return;
        }
        // for (let cord of possibleCords) {
        //     this.controlledTank.cords = cord;
        //     this.controlledTank.tryPlacing();
        //     if (this.controlledTank.isPlacedOnBoard) return;
        // }
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



    shot() {
        this.controlledTank.shot(this.visitedObject)
    }
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
