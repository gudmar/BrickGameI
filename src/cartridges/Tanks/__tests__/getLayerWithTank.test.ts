import { getEmptyBoard } from "../../constants";
import { EXPECTED_COLISION, EXPECTED_EMPTY_LAYER, EXPECTED_LAYER_OBATACLE, getLayerWithColistion, getLayerWithObstacle, TANK } from "../mocks/getLayerWithTankMock";
import { getLayerWithTank } from "../tankUtils";



describe('Testing getLayerWithTank', () => {
    it('Should add tank to the middle of an empty layer', () => {

        const layer = getEmptyBoard();
        const tankCords = {row: 5, col: 5};
        const tankMap = TANK;
        const expeced = EXPECTED_EMPTY_LAYER;
        const reslt = getLayerWithTank(layer, tankCords, tankMap);
        expect(reslt).toEqual(expeced);

    });
    it('Should add tank to a layer containing obstacles', () => {
        const layer = getLayerWithObstacle();
        const tankCords = {row: 5, col: 5};
        const tankMap = TANK;
        const expeced = EXPECTED_LAYER_OBATACLE;
        const reslt = getLayerWithTank(layer, tankCords, tankMap);
        expect(reslt).toEqual(expeced);
    })
    it('Should  inform about colision in case tank is placed on an obstacle, and mergeFunction is swapped for as signal function', () => {
        let isColision = 0;
        const detectColisionOr = (brickA: number, brickB: number) => {
            if (brickA === 1 && brickB === 1) isColision = 1;
            return brickA || brickB ? 1 : 0;
        }
        const layer = getLayerWithColistion();
        const tankCords = {row: 5, col: 5};
        const tankMap = TANK;
        const expeced = EXPECTED_COLISION;
        const reslt = getLayerWithTank(layer, tankCords, tankMap, detectColisionOr);
        expect(reslt).toEqual(expeced);
        expect(isColision).toBeTruthy();
    })
})