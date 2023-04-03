import { FoodLocalisator } from "../FoodLocalisator"

const BG = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const TAIL = [
    {col: 4, row: 5},
    {col: 3, row: 5},
    {col: 2, row: 5},
    {col: 1, row: 5},
]

const HEAD = {col: 5, row: 5}

const snakeInstanceMock = {
    tailHandler: {
        tailCords: TAIL
    }
}

const visitedObjectMock = {
    pawnCords: HEAD,
    background: BG
}

describe('Testing isFoodLocation allowed', () => {
    it('Should return false when random brick is in collision with snake head', () => {
        const randomCords = {col: 5, row: 5};
        const result = FoodLocalisator.isFoodLocationAllowed(snakeInstanceMock, randomCords, visitedObjectMock as any);
        expect(result).toBeFalsy();
    })
    it('Should return false in case random brick is in collision with snake tail', () => {
        const randomCords = {col: 3, row: 5};
        const result = FoodLocalisator.isFoodLocationAllowed(snakeInstanceMock, randomCords, visitedObjectMock as any);
        expect(result).toBeFalsy();
    })
    it('Should return false in case random brick is in collision with background', () => {
        const randomCords = {col: 2, row: 2};
        const result = FoodLocalisator.isFoodLocationAllowed(snakeInstanceMock, randomCords, visitedObjectMock as any);
        expect(result).toBeFalsy();
    })
    it('Should return true in case random brick is not in collision with head, tail or background', () => {
        const randomCords = {col: 6, row: 6};
        const result = FoodLocalisator.isFoodLocationAllowed(snakeInstanceMock, randomCords, visitedObjectMock as any);
        expect(result).toBeTruthy();

    })
})