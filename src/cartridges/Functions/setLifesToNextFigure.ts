import { getEmptyNextFigure } from "../constants";
import { GameCreator } from "../GameCreator";

export const setLifesToNextFigure = (thisContext:any, visitedObject: GameCreator) => {
    const CLOUMN_TO_DISPLAY_LIFES = 0;
    if (thisContext.lifes > 4) thisContext.lifes = 4;
    if (thisContext.lifes < 0) thisContext.lifes = 0;
    const nextFigure = getEmptyNextFigure();
    for(let rowIndex = 3; rowIndex >= (4 - thisContext.lifes); rowIndex--) {
        nextFigure[rowIndex][CLOUMN_TO_DISPLAY_LIFES] = 1;
    }
    visitedObject.nextFigure = nextFigure;
}