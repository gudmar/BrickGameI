import { FigureHandlePoint, NextFigure } from "../../types/types";

type Variant = 0 | 1 | 2 | 3;

export class Block {
    basicFigure: NextFigure;
    figureHandlePoints: FigureHandlePoint[];
    currentVariant: Variant = 0;
    variants: NextFigure[] = [];
    constructor(
        basicFigure: NextFigure,
        figureHandlePoints: FigureHandlePoint[] ,
    ) {
        this.basicFigure = basicFigure;
        this.figureHandlePoints = figureHandlePoints;
        this.prepareVariants();
    }
    prepareVariants(){
        for (let i = 0; i<4; i++) {
            this.variants.push(this.prepareVariant(i as Variant))
        }
    }

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

