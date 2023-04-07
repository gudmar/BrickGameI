import { getEmptyBoard } from "../../constants";
import { PawnCords } from "../../GameCreator"
import { FoodLocalisator } from "../FoodLocalisator"

const BACKGROUND = [
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
];
const TAIL = [
    {col: 4, row: 5},
    {col: 3, row: 5},
    {col: 2, row: 5},
    {col: 1, row: 5},
]

class VisitedObjectMock {
    background = BACKGROUND;
    pawnLayer = getEmptyBoard();
    pawnCords = {col: 5, row: 5};

}

class SnakeSpy {
    foodCords: PawnCords = {col: -1, row: -1};
    tailHandler = { tailCords: TAIL }
}

class FakeGetRandom {
    nrOfInvocaton = -1;
    lastReturnedValue: number[] = []
    cords = [
        {col: 4, row: 5},
        {col: 1, row: 1},
        {col: 5, row: 5},
        {col: 6, row: 5},
        {col: 8, row: 8},
    ]
    values = this.cords.flatMap((cord) => Object.values(cord).reverse())
    getFinalCords(){
        return {
            row: this.values[this.nrOfInvocaton - 1],
            col: this.values[this.nrOfInvocaton],
        }
    }
    getRandom() {
        this.nrOfInvocaton++;
        this.lastReturnedValue.push(this.values[this.nrOfInvocaton]);
        if (this.nrOfInvocaton > this.values.length) throw new Error('Index out of range');
        return this.values[this.nrOfInvocaton];
    }
}

const mockGetRandomFaker = new FakeGetRandom();

jest.mock('../../../functions/getRandom', () => {
    return {
        getRandom: () => mockGetRandomFaker.getRandom()
    }
});

const snake = new SnakeSpy();
const visitedObject = new VisitedObjectMock();



describe('Testing randomlyPlaceFood', () => {
    jest.mock('../../../functions/getRandom', () => { return mockGetRandomFaker.getRandom() } );
    it('Should place food outside head when given random cords firstly inside tail, then inside some background then inside head and lastly in not occupied area', () => {
        FoodLocalisator.randomlyPlaceFood(snake, visitedObject as any);
        const finalCords = mockGetRandomFaker.getFinalCords();
        expect(finalCords).toEqual({col: 6, row: 5})
    })
})
