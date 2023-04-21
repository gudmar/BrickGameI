import { Variants } from "../../../types/types"
import { Tank } from "../tank"

describe('Testing Tank -> getCordsTakenByTank', () => {
    it('Should return properly claculated cords', () => {
        const tank = new Tank(Variants.ENEMY, {col: 5, row: 5})
        const expected = [
            {col: 5, row: 4},
            {col: 4, row: 5},
            {col: 5, row: 5},
            {col: 6, row: 5},
            {col: 4, row: 6},
            {col: 6, row: 6},
        ]
        const result = tank.getCordsTakenByTank()
        expect(result).toEqual(expected);
    })
})