import { Animations } from "../cartridges/Animations/Animations";
import { LayersApplayer } from "../cartridges/layers/LayersApplayer";
import { MazeMoverDecorator } from "../cartridges/MovingKeys/MazeMover";
import { RaceDecorator } from "../cartridges/Race/Race";
import { SnakeDecorator } from "../cartridges/snake/Snake";
import { TankDecorator } from "../cartridges/Tanks/tanks";
import { TestCartridge } from "../cartridges/test";
import { TetrisDecorator } from "../cartridges/Tetris/Tetris";
// import { cartridges } from "./games";


interface LogicDescriptor {
    logicHandler: any, // GameLogic, !!!!!!!!!!!!!!!!!!!!!!!!!
    description: string,
    // show: boolean
}

export const cartridges = {
    'TEST': "Test display",
    'LAYERS': 'Animate layers',
    'ANIMATIONS': 'Animations',
    'MAZE': 'Maze',
    'TETRIS': 'Tetris',
    'SNAKE': 'Snake',
    'TANKS': 'Tanks',
    'RACE': 'Race',
}

interface Library {
    [name: string] : LogicDescriptor
}

export const CARTRIDGE_ORDER = [
    cartridges.MAZE, cartridges.TETRIS, cartridges.TANKS, cartridges.SNAKE, cartridges.RACE,
]

export const cartridgeLibrary: Library = {
    [cartridges.TEST]: {
        logicHandler: TestCartridge,
        description: cartridges.TEST,
        // show: true,
    },
    [cartridges.LAYERS]: {
        logicHandler: LayersApplayer,
        description: cartridges.LAYERS,
        // show: true,
    },
    [cartridges.ANIMATIONS]: {
        logicHandler: Animations,
        description: cartridges.ANIMATIONS,
        // show: true,
    },
    [cartridges.MAZE]: {
        logicHandler: MazeMoverDecorator,
        description: cartridges.MAZE,
        // show: true,
    },
    [cartridges.TETRIS]: {
        logicHandler: TetrisDecorator,
        description: cartridges.TETRIS,
        // show: true,
    },
    [cartridges.TANKS]: {
        logicHandler: TankDecorator,
        description: cartridges.TANKS,
        // show: true,
    },
    [cartridges.SNAKE]: {
        logicHandler: SnakeDecorator,
        description: cartridges.SNAKE,
        // show: true,
    },
    [cartridges.RACE]: {
        logicHandler: RaceDecorator,
        description: cartridges.RACE,
        // show: true,
    },

}
