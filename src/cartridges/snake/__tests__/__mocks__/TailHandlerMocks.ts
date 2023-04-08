import { getEmptyBoard } from "../../../constants";
import { TailHandler } from "../../TailHandler";

export class GameCreatorMock {
    background = getEmptyBoard();
    pawnLayer = getEmptyBoard();
    pawnCords = {row: 5, col: 5}
}

export class NoTailTailHandler extends TailHandler {
    getInitialTail() {return []}
}

const hasEveryRowExpectedLength = (arr: number[][], expectedLength = 20) => {
    return arr.every((row) => row.length === expectedLength)
}

class TailHandlerExrtaPack extends TailHandler {
    visitedObjectInstance = new GameCreatorMock();
    WRONG_NR_CALLS_ERROR = `Not designed to handle more moves`;
    hasExpectedLength(){
        const boardResult = hasEveryRowExpectedLength(this.visitedObjectInstance.background, 20);
        const layerResult = hasEveryRowExpectedLength(this.visitedObjectInstance.pawnLayer, 20);
        return boardResult && layerResult;
    };
}

export class TailHandlerBottomBoard extends TailHandlerExrtaPack {
    deltaRow = 0;
    deltaCol = 1;
    
    getExpectedPawnCords(nrOfMove:number){
        if (nrOfMove === 0 || nrOfMove > 5) throw new Error(this.WRONG_NR_CALLS_ERROR);
        return {col: 5, row: nrOfMove};
    }

    constructor() {
        super();
        this.visitedObjectInstance.pawnCords = {row: 19, col: 5}
    }

    getInitialTail() {
        return [
            {col: 5, row: 15},
            {col: 5, row: 16},
            {col: 5, row: 17},
            {col: 5, row: 18},
        ]
    }
    getExpectedTail(nrOfMove:number) {
        switch (nrOfMove) {
            case 1: return [
                {col: 5, row: 16},
                {col: 5, row: 17},
                {col: 5, row: 18},
                {col: 5, row: 19},
            ];
            case 2: return [
                {col: 5, row: 17},
                {col: 5, row: 18},
                {col: 5, row: 19},
                {col: 5, row: 0},
            ];
            case 3: return [
                {col: 5, row: 18},
                {col: 5, row: 19},
                {col: 5, row: 0},
                {col: 5, row: 1},
            ];
            case 4: return [
                {col: 5, row: 19},
                {col: 5, row: 0},
                {col: 5, row: 1},
                {col: 5, row: 2},
            ];
            case 5: return [
                {col: 5, row: 0},
                {col: 5, row: 1},
                {col: 5, row: 2},
                {col: 5, row: 3},
            ]
            default: throw new Error(this.WRONG_NR_CALLS_ERROR)
        }
    }
}


export class TailHandlerTopBoard extends TailHandlerExrtaPack {
    deltaRow = -1;
    deltaCol = 0;
    getExpectedPawnCords(nrOfMove:number){
        if (nrOfMove === 0 || nrOfMove > 5) throw new Error(this.WRONG_NR_CALLS_ERROR);
        return {col: 5, row: 20 - nrOfMove};
    }

    constructor() {
        super();
        this.visitedObjectInstance.pawnCords = {row: 0, col: 5}
    }
    getInitialTail() {
        return [
            {col: 5, row: 4},
            {col: 5, row: 3},
            {col: 5, row: 2},
            {col: 5, row: 1},
        ]
    }
    getExpectedTail(nrOfMove:number) {
        switch (nrOfMove) {
            case 1: return [
                {col: 5, row: 3},
                {col: 5, row: 2},
                {col: 5, row: 1},
                {col: 5, row: 0},
            ];
            case 2: return [
                {col: 5, row: 2},
                {col: 5, row: 1},
                {col: 5, row: 0},
                {col: 5, row: 19},
            ];
            case 3: return [
                {col: 5, row: 1},
                {col: 5, row: 0},
                {col: 5, row: 19},
                {col: 5, row: 18},
            ];
            case 4: return [
                {col: 5, row: 0},
                {col: 5, row: 19},
                {col: 5, row: 18},
                {col: 5, row: 17},
            ];
            case 5: return [
                {col: 5, row: 19},
                {col: 5, row: 18},
                {col: 5, row: 17},
                {col: 5, row: 16},
            ]
            default: throw new Error(this.WRONG_NR_CALLS_ERROR)
        }
    }
}

export class TailHandlerRightBoard extends TailHandlerExrtaPack {
    deltaRow = 0;
    deltaCol = 1;
    getExpectedPawnCords(nrOfMove:number){
        if (nrOfMove === 0 || nrOfMove > 5) throw new Error(this.WRONG_NR_CALLS_ERROR);
        return {col: nrOfMove, row: 5};
    }

    constructor() {
        super();
        this.visitedObjectInstance.pawnCords = {row: 5, col: 9}
    }
    getInitialTail() {
        return [
            {col: 5, row: 5},
            {col: 6, row: 5},
            {col: 7, row: 5},
            {col: 8, row: 5},
        ]
    }
    getExpectedTail(nrOfMove:number) {
        switch (nrOfMove) {
            case 1: return [
                {col: 6, row: 5},
                {col: 7, row: 5},
                {col: 8, row: 5},
                {col: 9, row: 5},
            ];
            case 2: return [
                {col: 7, row: 5},
                {col: 8, row: 5},
                {col: 9, row: 5},
                {col: 0, row: 5},
            ];
            case 3: return [
                {col: 8, row: 5},
                {col: 9, row: 5},
                {col: 0, row: 5},
                {col: 1, row: 5},
            ];
            case 4: return [
                {col: 9, row: 5},
                {col: 0, row: 5},
                {col: 1, row: 5},
                {col: 2, row: 5},
            ];
            case 5: return [
                {col: 0, row: 5},
                {col: 1, row: 5},
                {col: 2, row: 5},
                {col: 3, row: 5},
            ]
            default: throw new Error(this.WRONG_NR_CALLS_ERROR)
        }
    }
}

export class TailHandlerLeftBoard extends TailHandlerExrtaPack {
    deltaRow = 0;
    deltaCol = -1;
    getExpectedPawnCords(nrOfMove:number){
        if (nrOfMove === 0 || nrOfMove > 5) throw new Error(this.WRONG_NR_CALLS_ERROR);
        return {col: 10 - nrOfMove, row: 5};
    }

    constructor() {
        super();
        this.visitedObjectInstance.pawnCords = {row: 5, col: 0}
    }
    getInitialTail() {
        return [
            {col: 0, row: 9},
            {col: 0, row: 8},
            {col: 0, row: 7},
            {col: 0, row: 6},
        ]
    }
    getExpectedTail(nrOfMove:number) {
        switch (nrOfMove) {
            case 1: return [
                {col: 0, row: 8},
                {col: 0, row: 7},
                {col: 0, row: 6},
                {col: 0, row: 5},
            ];
            case 2: return [
                {col: 0, row: 7},
                {col: 0, row: 6},
                {col: 0, row: 5},
                {col: 9, row: 5},
            ];
            case 3: return [
                {col: 0, row: 6},
                {col: 0, row: 5},
                {col: 9, row: 5},
                {col: 8, row: 5},
            ];
            case 4: return [
                {col: 0, row: 5},
                {col: 9, row: 5},
                {col: 8, row: 5},
                {col: 7, row: 5},
            ];
            case 5: return [
                {col: 9, row: 5},
                {col: 8, row: 5},
                {col: 7, row: 5},
                {col: 6, row: 5},
            ]
            default: throw new Error(this.WRONG_NR_CALLS_ERROR)
        }
    }
}

