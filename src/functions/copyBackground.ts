import { BrickMap } from "../types/types";

export const copyBackground = (background: BrickMap) => {
    return background.map((row) => copyBackgroundRow(row));
}

const copyBackgroundRow = (row: number[]) => {
    return [...row];
}
