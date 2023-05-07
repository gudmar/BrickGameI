import { CAR_PERIOD } from "../constants"
import { renderEmptyTrack, renderTrack, renderTrackBit, ROAD_BLOCK_ERROR, WRONG_PREDICTION_SIZE_ERROR } from "../TrackRenderer"
import { BOARD_RIGHT_GAME_PHASE_10, BOARD_RIGHT_GAME_PHASE_9, EMPTY_TRACK_DOUBLE_BIT, INITIAL_BOARD_GAME_PHASE_0, INITIAL_BOARD_GAME_PHASE_1_RIGHT, INITIAL_BOARD_GAME_PHASE_2_RIGHT, OPONENT_LEFT_DOUBLE_BIT, OPONENT_RIGHT_DOUBLE_BIT, OPONENT_RIGHT_DOUBLE_BIT_GAME_PHASE_2, RENDERED_00, RENDERED_01, RENDERED_10, TRACK_BIT_PHASE_0, TRACK_BIT_PHASE_1, TRACK_BIT_PHASE_10, TRACK_BIT_PHASE_13, TRACK_BIT_PHASE_2, TRACK_BIT_PHASE_3, TRACK_BIT_PHASE_4, TRACK_BIT_PHASE_5, TRACK_BIT_PHASE_6, TRACK_BIT_PHASE_8 } from "./mocks/trackMocks"

/* eslint testing-library/render-result-naming-convention: 0 */

describe('Testing track renderer', () => {
    describe('Rendering empty board correctly', () => {
        it('Should render 00 game phase 0 empty track bit correctly', () => {
            const expected = TRACK_BIT_PHASE_0;
            const view = renderEmptyTrack(0);
            expect(view).toEqual(expected);
        })
        it('Should render 00 game phase 1 empty track bit correctly', () => {
            const expected = TRACK_BIT_PHASE_1;
            const view = renderEmptyTrack(1);
            expect(view).toEqual(expected);
        })
        it('Should render 00 game phase 2 empty track bit correctly', () => {
            const expected = TRACK_BIT_PHASE_2;
            const view = renderEmptyTrack(2);
            expect(view).toEqual(expected);
        })
        it('Should render 00 game phase 3 empty track bit correctly', () => {
            const expected = TRACK_BIT_PHASE_3;
            const view = renderEmptyTrack(3);
            expect(view).toEqual(expected);
        })
        it('Should render 00 game phase 4 empty track bit correctly', () => {
            const expected = TRACK_BIT_PHASE_4;
            const view = renderEmptyTrack(4);
            expect(view).toEqual(expected);
        })
        it('Should render 00 game phase 5 empty track bit correctly', () => {
            const expected = TRACK_BIT_PHASE_5;
            const view = renderEmptyTrack(5);
            expect(view).toEqual(expected);
        })
        it('Should render 00 game phase 6 empty track bit correctly', () => {
            const expected = TRACK_BIT_PHASE_6;
            const view = renderEmptyTrack(6);
            expect(view).toEqual(expected);
        })
        it('Should render 00 game phase 8 empty track bit correctly', () => {
            const expected = TRACK_BIT_PHASE_8;
            const view = renderEmptyTrack(8);
            expect(view).toEqual(expected);
        })
        it('Should render 00 game phase 10 empty track bit correctly', () => {
            const expected = TRACK_BIT_PHASE_10;
            const view = renderEmptyTrack(10);
            expect(view).toEqual(expected);
        })
        it('Should render 00 game phase 13 empty track bit correctly', () => {
            const expected = TRACK_BIT_PHASE_13;
            const view = renderEmptyTrack(13);
            expect(view).toEqual(expected);
        })

    })
    describe('Rendering bits', () => {
        it('Should render 00 correctly', () => {
            const expected = RENDERED_00;
            const result = renderTrackBit([0, 0], 1);
            expect(result).toEqual(expected);
        })
        it('Should throw road block error in case of 11', () => {
            const throwingFunction = () => renderTrackBit([1, 1], 1);
            expect(throwingFunction).toThrow(ROAD_BLOCK_ERROR);
        })
        it('Should render 01 correctly', () => {
            const expected = RENDERED_01;
            const result = renderTrackBit([0, 1], 1);
            expect(result).toEqual(expected);
        })
        it('Should render 10 correctly', () => {
            const expected = RENDERED_10;
            const result = renderTrackBit([1, 0], 1);
            expect(result).toEqual(expected);
        })
        it('Should render 10 correctly if game phase is 2', () => {
            const expected = OPONENT_RIGHT_DOUBLE_BIT_GAME_PHASE_2
            const result = renderTrackBit([0, 1], 2);
            expect(result).toEqual(expected);
        })
    })
    describe('Rendering board NOTE: sides of track move slower, once per 2 ticks', () => {
        it('Sould throw WRONG_PREDICTION_SIZE_ERROR error in case tarckBits.lenght is not 3', () => {
            const throwingFunction = () => renderTrack([[0, 1]], 0);
            expect(throwingFunction).toThrow(WRONG_PREDICTION_SIZE_ERROR)
        })
        it('Should render initial board 00 00 01 with phase 0 correctly', () => {
            const expected = INITIAL_BOARD_GAME_PHASE_0;
            const result = renderTrack([[0, 0], [0, 0], [0, 1]], 0)
            expect(result).toEqual(expected);
        })
        it('Should render initial board 00 00 10 with phase 1 correctly', () => {
            const expected = INITIAL_BOARD_GAME_PHASE_1_RIGHT;
            const result = renderTrack([[0, 0], [0, 0], [1, 0]], 1)
            expect(result).toEqual(expected);
        })
        it('Should render initial board 00 00 10 with phase 2 correctly', () => {
            const expected = INITIAL_BOARD_GAME_PHASE_2_RIGHT;
            const result = renderTrack([[0, 0], [0, 0], [1, 0]], 2)
            expect(result).toEqual(expected);            
        })
        it(`Should  render initial board 00 00 10 with pahse ${CAR_PERIOD} correctly`, () => {
            const expected = BOARD_RIGHT_GAME_PHASE_10;
            const result = renderTrack([[0, 0], [0, 0], [1, 0]], CAR_PERIOD)
            expect(result).toEqual(expected);            
        })
        it(`Should render board 00 01 10 with phase ${CAR_PERIOD - 1} correctly (switch start index back to 0)`, () => {
            const expected = BOARD_RIGHT_GAME_PHASE_9;
            const result = renderTrack([[0, 0], [0, 0], [1, 0]], CAR_PERIOD - 1)
            expect(result).toEqual(expected);            
        })
    })
})