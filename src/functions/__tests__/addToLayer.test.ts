import { addToLayer, addToLayerCutIfNotFit, OVERFLOW_ERROR } from "../AddToLayer";

export const MOTHER_LAYER = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
];

export const EMPTY_LAYER = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
];

export const LAYER_TO_ADD = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
]

const LEFT_UPPER_EDGE_EXPECTED = [
    [1, 1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
]

const RIGHT_LOWER_EDGE_EXPECTED = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1],
    [0, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 1],
]

const BOTH_EDGES_EXPECTED = [
    [1, 1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1],
    [0, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 1],
]

const CUT_OFF_UPPER_LEFT = [
    [0, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
]

const CUT_OFF_LOWER_RIGHT = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 0],
]

describe('Testing addToLayerCutIfNotFit', () => {
    it('Should cut when index of col and row below 0', () => {
        const result = addToLayerCutIfNotFit(MOTHER_LAYER, LAYER_TO_ADD, {row: -1, col: -1})
        expect(result).toEqual(CUT_OFF_UPPER_LEFT);
    })
    it('Should cut when added figure is outside upper boundries', () => {
        const result = addToLayerCutIfNotFit(MOTHER_LAYER, LAYER_TO_ADD, {row: 4, col: 4})
        expect(result).toEqual(CUT_OFF_LOWER_RIGHT);
    })

})


describe('Testing addToLayer function', () => {
    it('Should throw add to layer overflow in case column exceeds mother array cords', () => {
        const throwingFunction = () => addToLayer(MOTHER_LAYER, LAYER_TO_ADD, {row: 1, col: 4})
        expect(throwingFunction).toThrow(OVERFLOW_ERROR)
    })
    it('Should thorw add to layer overflow in case row exceeds motehr array cords', () => {
        const throwingFunction = () => addToLayer(MOTHER_LAYER, LAYER_TO_ADD, {row: 4, col: 1})
        expect(throwingFunction).toThrow(OVERFLOW_ERROR)
    })
    it('Should throw add to layer overflow in case row is smaller then 0', () => {
        const throwingFunction = () => addToLayer(MOTHER_LAYER, LAYER_TO_ADD, {row: -1, col: 1})
        expect(throwingFunction).toThrow(OVERFLOW_ERROR)
    })
    it('Should throw add to layer overflow in case col is smaller then 0', () => {
        const throwingFunction = () => addToLayer(MOTHER_LAYER, LAYER_TO_ADD, {row: 1, col: -4})
        expect(throwingFunction).toThrow(OVERFLOW_ERROR)
    })
    it('Should return a copy of layer, not mutating original one', () => {
        const result = addToLayer(MOTHER_LAYER, LAYER_TO_ADD, {row: 0, col: 0})
        expect(result).toEqual(LEFT_UPPER_EDGE_EXPECTED);
        expect(MOTHER_LAYER).toEqual(EMPTY_LAYER);
    })
    it('Should return properly added layer in case new array is added in left upper corner', () => {
        const result = addToLayer(MOTHER_LAYER, LAYER_TO_ADD, {row: 0, col: 0})
        expect(result).toEqual(LEFT_UPPER_EDGE_EXPECTED)
    })
    it('Should return properly constructed layer in case new array is added in right lower corner', () => {
        const result = addToLayer(MOTHER_LAYER, LAYER_TO_ADD, {row: 3, col: 3})
        expect(result).toEqual(RIGHT_LOWER_EDGE_EXPECTED)
    })
    it('Should return properly constructed layer in case new array is added in two corners one after another', () => {
        const firstStage = addToLayer(MOTHER_LAYER, LAYER_TO_ADD, {row: 0, col: 0})
        const result = addToLayer(firstStage, LAYER_TO_ADD, {row: 3, col: 3})
        expect(result).toEqual(BOTH_EDGES_EXPECTED)
    })
})
