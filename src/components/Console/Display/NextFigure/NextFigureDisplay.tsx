import { range } from "../../../../functions/range";
import { NextFigure } from "../../../../types/types"
import BrickLine from "../Dojo/BrickLine/BrickLine"

const NEXT_FIGURE_SIZE = 4;

const getEmptyRow = () => range(NEXT_FIGURE_SIZE).map( _ => 0)

const extedNextFigure = ( nextFigure : NextFigure ) => {
    const emptyTemplate = getEmptyRow();
    const result = emptyTemplate.map((_ , index) => nextFigure[index] ? extendRow(nextFigure[index]) : getEmptyRow())
    return result;

}

const extendRow = (row: number[]) => {
    if (row.length > NEXT_FIGURE_SIZE) throw new Error('Preview constnet cannot be greater then array 4 x 4');
    const empty = getEmptyRow();
    const result = empty.map((_ , index) => row[index] ? 1 : 0)
    return result;
}

export const NextFigureDisplay = ({ nextFigure }: {nextFigure:NextFigure}) => {

return (
    <>
        {
            extedNextFigure(nextFigure).map((row, index) => 
            {
                    return <BrickLine key={index} lineMap={row} />
                 }
            )
        }
    </>
    
)
}
