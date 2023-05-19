import { addToLayer, addToLayerCutIfNotFit } from "../../functions/AddToLayer";
import { range } from "../../functions/range";
import { getEmptyBoard } from "../constants";
import { PawnCords } from "../GameCreator";
import { CAR, CAR_PERIOD, getTrackEmptyBit, TRACK_EMPTY_BIT } from "./constants";
import { Sites } from "./TrackBlueprintGenerator";

const INITIAL_OFFSET_LFET = 2;
const INITIAL_OFFSET_RIGHT = 0;
const LAST_COLUMN_INDEX = 9;
const FIRST_COLUMN_INDEX = 0;
const LINE_LENGTH = 3;
const BIT_LENGTH = CAR_PERIOD / 2;
const TRACK_PREDICTION_LENGTH = 3;
const TRACK_BIT_LENGTH = LAST_COLUMN_INDEX + 1;
const BOARD_HEIGHT = 20;
const getOffset = (gamePhase: number, site: Sites) => {
    const initialOffset = site === Sites.RIGHT ? INITIAL_OFFSET_RIGHT : INITIAL_OFFSET_LFET;
    const offset = initialOffset + Math.floor(gamePhase / 1) % (CAR_PERIOD / 2);
    // const offset = initialOffset + Math.floor(gamePhase / 2) % (CAR_PERIOD / 2);
    return offset;
}

export const ROAD_BLOCK_ERROR = 'Road block not allowed'
export const WRONG_PREDICTION_SIZE_ERROR = 'Prediction for track should be exectly 3 track bits long'

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

export const renderTrackBit = (trackBit: number[], gamePhase: number) => {
    const emptyTrackHalfBit = getTrackEmptyBit();
    const emptyTrack = [...emptyTrackHalfBit, ...emptyTrackHalfBit];
    const [left, right] = trackBit;
    if (left && right) throw new Error(ROAD_BLOCK_ERROR)
    if (left) return addToLayer(emptyTrack, CAR, {row: 6, col: 2})
    if (right) return addToLayer(emptyTrack, CAR, {row: 6, col: 5})
    return emptyTrack;
}

export const renderTrack = (trackBits: number[][], gamePhase: number, trackMoveTick: number) => {
    if(!Array.isArray(trackBits) || trackBits.length !== TRACK_PREDICTION_LENGTH) throw new Error(WRONG_PREDICTION_SIZE_ERROR);
    const nrOfRowsShouldShift = gamePhase % TRACK_BIT_LENGTH;
    const trackWithLines = [...renderEmptyTrack(trackMoveTick),...renderEmptyTrack(trackMoveTick),...renderEmptyTrack(trackMoveTick),...renderEmptyTrack(trackMoveTick)];
    const [trackBit1, trackBit2, trackBit3] = trackBits.map((trackBit) => renderTrackBit(trackBit, gamePhase));
    const track = [...trackBit3, ...trackBit2, ...trackBit1];
    const trackSlice = addToLayerCutIfNotFit(trackWithLines, track, {col: 0, row: nrOfRowsShouldShift - TRACK_BIT_LENGTH})
    return trackSlice;
}
