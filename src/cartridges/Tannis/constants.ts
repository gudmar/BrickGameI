import { getEmptyBoard } from "../constants";

export const INITIAL_PLAYER_POSITION = 3;
export const PLAYER_LENGTH = 4;
export const UPPER_PLAYER_ROW = 0;
export const LOWER_PLAYER_ROW = 19;
export const BOARD_WIDTH = getEmptyBoard()[0].length;
export const LAST_ROW = getEmptyBoard().length - 1;
export const LAST_COL = BOARD_WIDTH - 1;
