import { TailHandler } from "../TailHandler";

describe('Testing TailHandler', () => {
    describe('Testing doesCrashIntoTail', () => {
        let tailHandlerInstance = new TailHandler();
        let visitedObjectMock = {pawnCords: {col:5, row:5}};
        beforeEach(() => {
            tailHandlerInstance = new TailHandler();
            visitedObjectMock = {pawnCords: {col:5, row:5}};
        })
        it('Should return false if given cords that are not incuded in tail or head', () => {
            const deltaRow = 1;
            const deltaCol = 0;
            const result = tailHandlerInstance.doesMoveCrashIntoTail(visitedObjectMock as any, deltaRow, deltaCol)
            expect(result).toBeFalsy();
        });
        it('Should return false if given cords that are not included in tail but are head cords', () => {
            const deltaRow = 0;
            const deltaCol = 0;
            const result = tailHandlerInstance.doesMoveCrashIntoTail(visitedObjectMock as any, deltaRow, deltaCol)
            expect(result).toBeFalsy();
        })
        it('Should return false if given cords of brick joining tail with head (last tail element): change direction case', () => {
            const deltaRow = 0;
            const deltaCol = -1;
            const result = tailHandlerInstance.doesMoveCrashIntoTail(visitedObjectMock as any, deltaRow, deltaCol)
            expect(result).toBeFalsy();
        })
        it('Should return false if given tail is empty', () => {
            tailHandlerInstance.tail = [];
            const deltaRow = 0;
            const deltaCol = -1;
            const result = tailHandlerInstance.doesMoveCrashIntoTail(visitedObjectMock as any, deltaRow, deltaCol)
            expect(result).toBeFalsy();
        })
        it('Should return true if given cors are not the last tail element, but belong to tail', () => {
            tailHandlerInstance.tail = [
                {col: 3, row: 1},
                {col: 4, row: 1},
                {col: 5, row: 1},
                {col: 6, row: 1},
                {col: 6, row: 2},
                {col: 6, row: 3},
                {col: 5, row: 3},
                {col: 4, row: 3},
                {col: 3, row: 3},
                // {col: 3, row: 2}, // head
            ];
            visitedObjectMock.pawnCords = {col: 3, row: 2};
            const deltaRow = -1;
            const deltaCol = 0;
            const result = tailHandlerInstance.doesMoveCrashIntoTail(visitedObjectMock as any, deltaRow, deltaCol)
            expect(result).toBeTruthy();
        })
    })
})