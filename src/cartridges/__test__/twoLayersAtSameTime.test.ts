import { LayersApplayer } from "../layers/LayersApplayer";

describe('Testing Layers', () => {
    describe('Testing BarDownLayer', () => {

        afterEach(() => LayersApplayer.instance = undefined)

        it('Should apply next layer to given map', () => {
            const expected = [
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
                    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
                    [1, 0, 0, 1, 1, 1, 1, 0, 0, 0],
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
                    [1, 0, 1, 0, 1, 1, 0, 1, 0, 0],
                    [1, 0, 1, 0, 1, 0, 1, 1, 0, 0],
                    [1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                    [1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ]
            const layerGenerator = new LayersApplayer();
            const { brickMap } = layerGenerator.getNextStateOnTick();
            expect(brickMap).toEqual(expected);
        });
        it('Should apply 2 layers second iteration in case getNextStateOnTick is ivked twice', () => {
            const expected = [
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
                [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
                [0, 1, 0, 1, 1, 1, 1, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 1, 0, 0, 1, 0, 0],
                [0, 1, 1, 0, 1, 1, 0, 1, 0, 0],
                [0, 1, 1, 0, 1, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 1, 0, 0, 1, 0, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 1, 0, 0, 1, 1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 1, 0, 0, 1, 1, 1, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            ];
            const layerGenerator = new LayersApplayer();
            layerGenerator.getNextStateOnTick();
            const { brickMap } = layerGenerator.getNextStateOnTick();
            expect(brickMap).toEqual(expected);
        })
    })
})

