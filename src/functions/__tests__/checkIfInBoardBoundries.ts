import { getEmptyBoard } from "../../cartridges/constants";
import { PawnCords } from "../../cartridges/GameCreator";
import { getArrayOfArraysSize } from "./getArrayOfArraysSize";

export const checkIfInBoardBoundreis = (cords: PawnCords, board: number[][] = getEmptyBoard()) => {
    const {width, height} = getArrayOfArraysSize(board);
    const {col, row} = cords;
    const result = (width > col && col >= 0 && height > row && row >= 0);
    return result;
}