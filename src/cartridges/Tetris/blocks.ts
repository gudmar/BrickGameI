import { FigureHandlePoint, NextFigure } from "../../types/types";

type Variant = 0 | 1 | 2 | 3;

enum BlockClasses {
    LongBlock, TBlock, SBlock, ZBlock, LeftLBlock, RightLBlock, SquareBlock
}

export interface BlockData {
    figure: NextFigure,
    handlePoint: FigureHandlePoint,
}

export class Blocks {
    private listOfBlocks: any[] = [
         LongBlock, TBlock, SBlock, ZBlock, LeftLBlock, RightLBlock, SquareBlock,
    ]
    private instances: any = this.listOfBlocks.map(b => {
       const block = new b();
       return block;
    })
    // private _currentBlock = this.instances[0];
    private _currentBlock = this.getBlock(0);
    private _nextBlock = this.getRandomBloc();
    reset() {this.instances.forEach((instance:any) => {instance.reset();})}

    getBlock(index: BlockClasses) { 
        return this.instances[index]; 
    }

    getRandomBloc() {
        const index = Math.floor(Math.random() * this.instances.length);
        return this.instances[index];
    }

    setNewBlock() {
        const index = Math.floor(Math.random() * this.instances.length);
        this._currentBlock = this._nextBlock;
        this._nextBlock = this.instances[index];
        this._nextBlock.getNewRandomVariant();
    }

    get currentBlock() { return this._currentBlock; }
    get nextBlock() { return this._nextBlock; }
}

export class Block {
    basicFigure: NextFigure;
    figureHandlePoints: FigureHandlePoint[];
    _currentVariant: Variant = 0;
    public currentFigure: NextFigure;
    public currentHandlePoint: {col:number, row:number};
    variants: NextFigure[] = [];
    constructor(
        basicFigure: NextFigure,
        figureHandlePoints: FigureHandlePoint[], // rotation points array for different variants
    ) {
        this.basicFigure = basicFigure;
        this.currentFigure=basicFigure;
        this.currentHandlePoint = figureHandlePoints[0];
        this.figureHandlePoints = figureHandlePoints;
        this.prepareVariants();
    }
    reset() {this._currentVariant = 0;}
    prepareVariants(){
        for (let i = 0; i<4; i++) {
            this.variants.push(this.prepareVariant(i as Variant))
        }
    }
    public getNewRandomVariant() {
        const index: Variant = Math.floor(Math.random() * this.variants.length) as Variant;
        this._currentVariant = index;
        this.currentHandlePoint = this.figureHandlePoints[index];
        this.currentFigure = this.variants[index];
        return {
            figure: this.variants[index],
            handlePoint: this.figureHandlePoints[index],
        }
    }

    get blockDescriptor() {
        return {
            figure: this.variants[this._currentVariant],
            handlePoint: this.figureHandlePoints[this._currentVariant],
        }
    }

    rotate(){
        this._currentVariant >= 3 ? this._currentVariant = 0 : this._currentVariant++;
        this.currentFigure = this.variants[this._currentVariant]
        this.currentHandlePoint = this.figureHandlePoints[this._currentVariant]
    }

    foretellFigureAfterRotation(){
        const nextIndex = this._currentVariant >= 3 ? 0 : this._currentVariant + 1;
        return {
            figure: this.variants[nextIndex],
            handlePoint: this.figureHandlePoints[nextIndex]
        }
    }

    setCurrentVariant(nr:Variant) {
        this._currentVariant = nr;
    }

    get currentVariant() {return this.variants[this._currentVariant]}

    prepareVariant(variantNr: Variant) {
        switch(variantNr){
            case 1: return this.rotateOnce();
            case 2: return this.rotateTwice();
            case 3: return this.rotateThreeTimes();
            default: return this.basicFigure;
        }
    }
    rotateOnce() {
        const nrOfColumns = this.basicFigure[0].length;
        const rotated = [];
        for (let colNr = 0; colNr < nrOfColumns; colNr++) {
            rotated.push(this.getColumn(this.basicFigure, colNr).reverse())
        }
        return rotated;
    }
    cp(arr: any[]) {
        return arr.map(_ => _)
    }
    rotateTwice() {
        const figureCp:NextFigure = [];
        this.basicFigure.forEach((row) => {
            figureCp.push(this.cp(row).reverse());
        })

        return figureCp.reverse();
    }
    rotateThreeTimes() {
        const nrOfColumns = this.basicFigure[0].length;
        const rotated = [];
        for (let colNr = 0; colNr < nrOfColumns; colNr++) {
            rotated.push(this.getColumn(this.basicFigure, colNr))
        }
        return rotated.reverse();
    }

    getColumn(arr: NextFigure, colNr: number) {
        if (colNr > arr[0].length - 1) throw new Error('Not enough columns in array');
        const column = arr.map((row) => row[colNr]);
        return column;
    }
}

export class LongBlock extends Block {
    constructor() {
        super(
            BLOCK_LONG,
            [
                {row: 0, col: -2},
                {row: -2, col: 0},
                {row: 0, col: -2},
                {row: -2, col: 0},
            ]
        )
    }
}

export class TBlock extends Block {
    constructor() {
        super(
                BLOCK_T,
                [
                    {row: 0, col: 0},
                    {row: -1, col: 0},
                    {row: 0, col: 0},
                    {row: -1, col: 0},
                ]
        )
    }
}

export class LeftLBlock extends Block {
    constructor() {
        super(
                BLOCK_L_LEFT,
            [
                {row: 0, col: 0},
                {row: -1, col: 0},
                {row: 0, col: 0},
                {row: -1, col: 0},
            ]
        )
    }
}

export class RightLBlock extends Block {
    constructor() {
        super(
                BLOCK_L_RIGHT,
                [
                    {row: 0, col: 0},
                    {row: -1, col: 0},
                    {row: 0, col: 0},
                    {row: -1, col: 0},
                ]
        )
    }
}

export class SBlock extends Block {
    constructor() {
        super(
                BLOCK_S,
                [
                    {row: 0, col: 0},
                    {row: -1, col: 0},
                    {row: 0, col: 0},
                    {row: -1, col: 0},
                ]
        )
    }
}

export class ZBlock extends Block {
    constructor() {
        super(
                BLOCK_Z,
                [
                    {row: 0, col: 0},
                    {row: -1, col: 0},
                    {row: 0, col: 0},
                    {row: -1, col: 0},
                ]
        )
    }
}

export class SquareBlock extends Block {
    constructor() {
        super(
                BLOCK_SQUARE,
            [
                {row: 0, col: 0},
                {row: 0, col: 0},
                {row: 0, col: 0},
                {row: 0, col: 0},
            ]
        )
    }
}



export const BLOCK_LONG: NextFigure = [
        [1, 1, 1, 1]
    ];
export const BLOCK_T: NextFigure = [
        [1, 1, 1],
        [0, 1, 0]
    ];
export const BLOCK_L_LEFT: NextFigure = [
        [1, 1, 1],
        [1, 0, 0],
    ];
export const BLOCK_L_RIGHT: NextFigure = [
        [1, 1, 1],
        [0, 0, 1],
    ];
export const BLOCK_S: NextFigure = [
        [0, 1, 1],
        [1, 1, 0],
    ];
export const BLOCK_Z: NextFigure = [
        [1, 1, 0],
        [0, 1, 1],
    ];

export const BLOCK_SQUARE: NextFigure = [
    [1, 1],
    [1, 1],
];