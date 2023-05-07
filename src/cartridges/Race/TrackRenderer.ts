import { range } from "../../functions/range";
import { CAR_PERIOD, getTrackEmptyBit, TRACK_EMPTY_BIT } from "./constants";
import { Sites } from "./TrackBlueprintGenerator";

const INITIAL_OFFSET_LFET = 2;
const INITIAL_OFFSET_RIGHT = 0;
const LAST_COLUMN_INDEX = 9;
const FIRST_COLUMN_INDEX = 0;
const LINE_LENGTH = 3;
const BIT_LENGTH = CAR_PERIOD / 2;
const getOffset = (gamePhase: number, site: Sites) => {
    const initialOffset = site === Sites.RIGHT ? INITIAL_OFFSET_RIGHT : INITIAL_OFFSET_LFET;
    const offset = initialOffset + Math.floor(gamePhase / 2) % (CAR_PERIOD / 2);
    return offset;
}


const drawLineOnTrack = (gamePhase:number, track:number[][], site: Sites) => {
    const line = range(LINE_LENGTH);
    const column = site === Sites.LEFT ? FIRST_COLUMN_INDEX : LAST_COLUMN_INDEX;
    const normalizedPhase = gamePhase % CAR_PERIOD;
    const rowOffset = getOffset(normalizedPhase, site);
    line.forEach((bit, index) => { 
        const totalRowIndex = rowOffset + index;
        const nextRowIndex = totalRowIndex >= BIT_LENGTH ? totalRowIndex - BIT_LENGTH : totalRowIndex;
        track[nextRowIndex][column] = 1
    });
}

export const renderEmptyTrack = (gamePhase: number) => {
    const EMPTY = getTrackEmptyBit();
    drawLineOnTrack(gamePhase, EMPTY, Sites.LEFT);
    drawLineOnTrack(gamePhase, EMPTY, Sites.RIGHT);
    return EMPTY;
}

