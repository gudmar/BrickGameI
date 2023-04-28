import { GameCreator } from "../../GameCreator";
import { TANKS_COLISION_EMPTY, TANKS_COLISION_OBSTACLE, TANKS_NO_COLISION_EMPTY, TANKS_NO_COLISION_OBSTACLES, TANKS_NO_COLISION_WITH_NOT_PLACED, TANKS_OUTSIDE_BOARD_EMPTY, VISITED_EMPTY, VISITED_OBSTACLES } from "../mocks/detectColisionMock";
import { ENEMY_TANK, Tank } from "../tank";
import { checkIsColision } from "../tankUtils";

describe('Testing detectColision', () => {
    const createTanksReturnOne = (data: any[]) => {
        let instance;
        data.forEach((tankData) => {
            instance = new Tank(tankData.variant, tankData.cords);
            instance.currentTank = ENEMY_TANK;
            instance.isPlacedOnBoard = tankData.isPlaced;
        })
        return instance;
    }
    const move = {col: 1, row: 0}
    afterEach(() => {Tank.instances = []})
    it('Should detect colision when one of tanks is outside game board', () => {
        const tank = createTanksReturnOne(TANKS_OUTSIDE_BOARD_EMPTY);
        const visitedObject = VISITED_EMPTY as GameCreator;
        const result = checkIsColision(tank!, visitedObject, move);
        expect(result).toBeTruthy();
    })
    it('Shold detect no colision when given empty board with no coliding objects', () => {
        const tank = createTanksReturnOne(TANKS_NO_COLISION_EMPTY);
        const visitedObject = VISITED_EMPTY as GameCreator;
        const result = checkIsColision(tank!, visitedObject, move);
        expect(result).toBeFalsy();
    })
    it('Should detect colision when 2 of tanks have common points', () => {
        const tank = createTanksReturnOne(TANKS_COLISION_EMPTY);
        const visitedObject = VISITED_EMPTY as GameCreator;
        const result = checkIsColision(tank!, visitedObject, move);
        expect(result).toBeTruthy();
    })
    it('Should detect a cloision when one of tanks interferes with background', () => {
        const tank = createTanksReturnOne(TANKS_COLISION_OBSTACLE);
        const visitedObject = VISITED_OBSTACLES as GameCreator;
        const result = checkIsColision(tank!, visitedObject, move);
        expect(result).toBeTruthy();
    })
    it('Should detect no colision with obstacles, when given background does not interfere with tanks', () => {
        const tank = createTanksReturnOne(TANKS_NO_COLISION_OBSTACLES);
        const visitedObject = VISITED_OBSTACLES as GameCreator;
        const result = checkIsColision(tank!, visitedObject, move);
        expect(result).toBeFalsy();
    })
    it('Should not colide with a not placed tank', () => {
        const tank = createTanksReturnOne(TANKS_NO_COLISION_WITH_NOT_PLACED);
        const visitedObject = VISITED_EMPTY as GameCreator;
        const result = checkIsColision(tank!, visitedObject, move);
        expect(result).toBeFalsy();
    })
})