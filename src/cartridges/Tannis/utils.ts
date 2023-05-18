import { getEmptyBoard } from "../constants";

export const getMaxColIndex = (background:number[][] = getEmptyBoard()) => background[0].length - 1;
export const getMaxRowIndex = (background:number[][] = getEmptyBoard()) => background.length - 1;
