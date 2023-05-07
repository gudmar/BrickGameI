import { PawnCords } from "../cartridges/GameCreator";
import { or } from "./brickMapLogicFunctions";

export const OVERFLOW_ERROR = 'addToLayer index overflow'

export const throwIfCannotAddToLayer = (bitMapToAdd: number[][], layer: number[][], cord: PawnCords) => {
    const {row, col} = cord;
    if (row < 0 || col < 0) throw new Error(OVERFLOW_ERROR)
    const maxColIndex = layer[0].length - 1;
    const maxRowIndex = layer.length - 1;
    const bitMapMaxColIndex = bitMapToAdd[0].length - 1;
    const bitMapMaxRowIndex = bitMapToAdd.length - 1;
    if (row + bitMapMaxRowIndex > maxRowIndex || col + bitMapMaxColIndex > maxColIndex) throw new Error(OVERFLOW_ERROR)
}

export const copyBrickMap = (brickMap: number[][]) => brickMap.map((row:number[]) => ([...row]));

export const addToLayer = (layer: number[][], bitMapToAdd: number[][], cord: PawnCords, addFunction = or) => {
    throwIfCannotAddToLayer(bitMapToAdd, layer, cord)
    const layerCP = copyBrickMap(layer)
    const {row, col} = cord;
    bitMapToAdd.forEach(
        (brickRow: number[], rowIndex: number) => {
            brickRow.forEach((brick:number, brickIndex:number) => {
                layerCP[rowIndex + row][brickIndex + col] = (addFunction(brick, layerCP[rowIndex + row][brickIndex + col]))
            })
            return layerCP;
        }
    )
    return layerCP;
}
