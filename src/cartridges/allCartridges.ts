import { GameLogic } from "./AbstractGameLogic";
import { TestCartridge } from "./test";

interface AllCartridges {
    [name: string] : typeof GameLogic
}

export const ALL_CARTRIDGES: any = {  
    // any because of a great problem with passing an exteded class as a value
    TestCartridge: TestCartridge
}

export const CARTRIDGES_ARRAY = Object.values(ALL_CARTRIDGES);
