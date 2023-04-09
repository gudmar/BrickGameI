import { GameCreator } from "../../GameCreator"
import { callFunctionNrOfTimes, GameCreatorMock, NoTailTailHandler, TailHandlerBottomBoard, TailHandlerLeftBoard, TailHandlerLeftThenGoUpBoard, TailHandlerRightBoard, TailHandlerTopBoard } from "./mocks/TailHandlerMocks"

describe('Recalculate tail tests', () => {
    let gameCreatorInstance: GameCreator = new GameCreatorMock() as GameCreator;
    beforeEach(() => {
        gameCreatorInstance = new GameCreatorMock() as GameCreator;
    })
    it('Should return set tail to empty array, if tail was empty', () => {
        const testedObject = new NoTailTailHandler();
        testedObject.recalculateTail(gameCreatorInstance, testedObject.deltaRow, testedObject.deltaCol);
        const result = testedObject.tail;
        expect(result).toEqual([]);
    })

    describe('Moving snake down', () => {
        it('Should return tail moved 1 field closer to bottom boundry and not add extra rows to pawnLayer or backgroundLayer when snakes head is at the boundry, head touches boundry ans deltaRow is 1', () => {
            const testedObject = new TailHandlerBottomBoard();
            gameCreatorInstance.pawnCords = testedObject.getExpectedPawnCords(1)
            testedObject.recalculateTail(gameCreatorInstance, testedObject.deltaRow, testedObject.deltaCol);
            const resultTail = testedObject.tail;
            const resultLength = testedObject.hasExpectedLength();
            const expected = testedObject.getExpectedTail(1);
            expect(resultTail).toEqual(expected);
            expect(resultLength).toBeTruthy();
        })
        it('Should return tail moved 2 fields closer to bottom boundry and not add extra rows to pawnLayer or backgroundLayer when snakes head is at the boundry, head touches boundry ans deltaRow is 2', () => {
            const testedObject = new TailHandlerBottomBoard();
            const makeMove = (index:number) => {
                gameCreatorInstance.pawnCords = testedObject.getExpectedPawnCords(index);
                testedObject.recalculateTail(gameCreatorInstance, testedObject.deltaRow, testedObject.deltaCol);
            }
            callFunctionNrOfTimes( makeMove, 2 );
            const resultTail = testedObject.tail;
            const resultLength = testedObject.hasExpectedLength();
            const expected = testedObject.getExpectedTail(2);
            expect(resultTail).toEqual(expected);
            expect(resultLength).toBeTruthy();
        })
        it('Should return tail moved 5 fields closer to bottom boundry and not add extra rows to pawnLayer or backgroundLayer when snakes head is at the boundry, head touches boundry ans deltaRow is 1', () => {
            const testedObject = new TailHandlerBottomBoard();
            const makeMove = (index:number) => {
                gameCreatorInstance.pawnCords = testedObject.getExpectedPawnCords(index);
                testedObject.recalculateTail(gameCreatorInstance, testedObject.deltaRow, testedObject.deltaCol);
            }
            callFunctionNrOfTimes( makeMove, 5 );
            const resultTail = testedObject.tail;
            const resultLength = testedObject.hasExpectedLength();
            const expected = testedObject.getExpectedTail(5);
            expect(resultTail).toEqual(expected);
            expect(resultLength).toBeTruthy();
        })
    })

    describe('Moving snake up', () => {
        it ('Should return tail moved 1 field closer to the top boundry and not add extra rows to pawnLayer or backgroundLayer when snake head is at the boundry,  head touches boundry and deltaRow is -1', () => {
            const testedObject = new TailHandlerTopBoard();
            gameCreatorInstance.pawnCords = testedObject.getExpectedPawnCords(1)
            testedObject.recalculateTail(gameCreatorInstance, testedObject.deltaRow, testedObject.deltaCol);
            const resultTail = testedObject.tail;
            const resultLength = testedObject.hasExpectedLength();
            const expected = testedObject.getExpectedTail(1);
            expect(resultTail).toEqual(expected);
            expect(resultLength).toBeTruthy();
        });
        it('Should return tail moved 2 fields closer to top boundry and not add extra rows to pawnLayer or backgroundLayer when snakes head is at the boundry, head touches boundry ans deltaRow is 2', () => {
            const testedObject = new TailHandlerTopBoard();
            const makeMove = (index:number) => {
                gameCreatorInstance.pawnCords = testedObject.getExpectedPawnCords(index);
                testedObject.recalculateTail(gameCreatorInstance, testedObject.deltaRow, testedObject.deltaCol);
            }
            callFunctionNrOfTimes( makeMove, 2 );
            const resultTail = testedObject.tail;
            const resultLength = testedObject.hasExpectedLength();
            const expected = testedObject.getExpectedTail(2);
            expect(resultTail).toEqual(expected);
            expect(resultLength).toBeTruthy();
        });
        it('Should return tail moved 5 fields closer to bottom boundry and not add extra rows to pawnLayer or backgroundLayer when snakes head is at the boundry, head touches boundry ans deltaRow is 1', () => {
            const testedObject = new TailHandlerTopBoard();
            const makeMove = (index:number) => {
                gameCreatorInstance.pawnCords = testedObject.getExpectedPawnCords(index);
                testedObject.recalculateTail(gameCreatorInstance, testedObject.deltaRow, testedObject.deltaCol);
            }
            callFunctionNrOfTimes( makeMove, 5 );
            const resultTail = testedObject.tail;
            const resultLength = testedObject.hasExpectedLength();
            const expected = testedObject.getExpectedTail(5);
            expect(resultTail).toEqual(expected);
            expect(resultLength).toBeTruthy();
        })
    });
    describe('Moving to the right', () => {
        it ('Should return tail moved 1 field closer to the top boundry and not add extra rows to pawnLayer or backgroundLayer when snake head is at the boundry,  head touches boundry and deltaRow is -1', () => {
            const testedObject = new TailHandlerRightBoard();
            gameCreatorInstance.pawnCords = testedObject.getExpectedPawnCords(1)
            testedObject.recalculateTail(gameCreatorInstance, testedObject.deltaRow, testedObject.deltaCol);
            const resultTail = testedObject.tail;
            const resultLength = testedObject.hasExpectedLength();
            const expected = testedObject.getExpectedTail(1);
            expect(resultTail).toEqual(expected);
            expect(resultLength).toBeTruthy();
        });
        it('Should return tail moved 2 fields closer to top boundry and not add extra rows to pawnLayer or backgroundLayer when snakes head is at the boundry, head touches boundry ans deltaRow is 2', () => {
            const testedObject = new TailHandlerRightBoard();
            const makeMove = (index:number) => {
                gameCreatorInstance.pawnCords = testedObject.getExpectedPawnCords(index);
                testedObject.recalculateTail(gameCreatorInstance, testedObject.deltaRow, testedObject.deltaCol);
            }
            callFunctionNrOfTimes( makeMove, 2 );
            const resultTail = testedObject.tail;
            const resultLength = testedObject.hasExpectedLength();
            const expected = testedObject.getExpectedTail(2);
            expect(resultTail).toEqual(expected);
            expect(resultLength).toBeTruthy();
        });
        it('Should return tail moved 5 fields closer to bottom boundry and not add extra rows to pawnLayer or backgroundLayer when snakes head is at the boundry, head touches boundry ans deltaRow is 1', () => {
            const testedObject = new TailHandlerRightBoard();
            const makeMove = (index:number) => {
                gameCreatorInstance.pawnCords = testedObject.getExpectedPawnCords(index);
                testedObject.recalculateTail(gameCreatorInstance, testedObject.deltaRow, testedObject.deltaCol);
            }
            callFunctionNrOfTimes( makeMove, 5 );
            const resultTail = testedObject.tail;
            const resultLength = testedObject.hasExpectedLength();
            const expected = testedObject.getExpectedTail(5);
            expect(resultTail).toEqual(expected);
            expect(resultLength).toBeTruthy();
        })
    })
    describe('Testing move left', () => {
        it ('Should return tail moved 1 field closer to the top boundry and not add extra rows to pawnLayer or backgroundLayer when snake head is at the boundry,  head touches boundry and deltaRow is -1', () => {
            const testedObject = new TailHandlerLeftBoard();
            gameCreatorInstance.pawnCords = testedObject.getExpectedPawnCords(1)
            testedObject.recalculateTail(gameCreatorInstance, testedObject.deltaRow, testedObject.deltaCol);
            const resultTail = testedObject.tail;
            const resultLength = testedObject.hasExpectedLength();
            const expected = testedObject.getExpectedTail(1);
            expect(resultTail).toEqual(expected);
            expect(resultLength).toBeTruthy();
        });
        it('Should return tail moved 2 fields closer to top boundry and not add extra rows to pawnLayer or backgroundLayer when snakes head is at the boundry, head touches boundry ans deltaRow is 2', () => {
            const testedObject = new TailHandlerLeftBoard();
            const makeMove = (index:number) => {
                gameCreatorInstance.pawnCords = testedObject.getExpectedPawnCords(index);
                testedObject.recalculateTail(gameCreatorInstance, testedObject.deltaRow, testedObject.deltaCol);
            }
            callFunctionNrOfTimes( makeMove, 2 );
            const resultTail = testedObject.tail;
            const resultLength = testedObject.hasExpectedLength();
            const expected = testedObject.getExpectedTail(2);
            expect(resultTail).toEqual(expected);
            expect(resultLength).toBeTruthy();
        });
        it('Should return tail moved 5 fields closer to bottom boundry and not add extra rows to pawnLayer or backgroundLayer when snakes head is at the boundry, head touches boundry ans deltaRow is 1', () => {
            const testedObject = new TailHandlerLeftBoard();
            const makeMove = (index:number) => {
                gameCreatorInstance.pawnCords = testedObject.getExpectedPawnCords(index);
                testedObject.recalculateTail(gameCreatorInstance, testedObject.deltaRow, testedObject.deltaCol);
            }
            callFunctionNrOfTimes( makeMove, 5 );
            const resultTail = testedObject.tail;
            const resultLength = testedObject.hasExpectedLength();
            const expected = testedObject.getExpectedTail(5);
            expect(resultTail).toEqual(expected);
            expect(resultLength).toBeTruthy();
        })
    })
    describe('Testing move left then go up', () => {
        it ('Should return tail moved 1 field closer to the top boundry and not add extra rows to pawnLayer or backgroundLayer when snake head is at the boundry,  head touches boundry and deltaRow is -1', () => {
            const testedObject = new TailHandlerLeftThenGoUpBoard();
            gameCreatorInstance.pawnCords = testedObject.getExpectedPawnCords(1)
            testedObject.recalculateTail(gameCreatorInstance, testedObject.deltaRow, testedObject.deltaCol);
            const resultTail = testedObject.tail;
            const resultLength = testedObject.hasExpectedLength();
            const expected = testedObject.getExpectedTail(1);
            expect(resultTail).toEqual(expected);
            expect(resultLength).toBeTruthy();
        });
    })
})