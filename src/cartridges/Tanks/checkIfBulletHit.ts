import { directions } from "../../types/types";
import { Bullet } from "./bullet"

export const checkIfBulletHit = (bulletA: Bullet, bulletB: Bullet) => {
    const {
        variant: variantA,
        cords: cordsA,
        direction: directionA,
    } = bulletA;
    const {
        variant: variantB,
        cords: cordsB,
        direction: directionB,
    } = bulletB;
    const {row: rowA, col: colA} = cordsA
    const {row: rowB, col: colB} = cordsB
    if (variantA === variantB) return false;
    const isTheSameField = (rowA === rowB && colA === colB);
    const isARightBLeftCase = (
        directionA === directions.RIGHT &&
        directionB === directions.LEFT &&
        rowA === rowB &&
        colA === colB + 1
    )
    const isALeftBRightCase = (
        directionA === directions.LEFT &&
        directionB === directions.RIGHT &&
        rowA === rowB &&
        colB === colA + 1
    )
    const isADownCase = (
        directionA === directions.DOWN &&
        directionB === directions.UP &&
        colA === colB &&
        rowB + 1 === rowA
    )
    const isAUpCase = (
        directionA === directions.UP &&
        directionB === directions.DOWN &&
        colA === colB &&
        rowA + 1 === rowB
    )    


    return (
        isTheSameField ||
        isALeftBRightCase ||
        isARightBLeftCase ||
        isADownCase ||
        isAUpCase
    );
}
