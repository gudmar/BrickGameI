import { Tank, variant } from "../tank";

const getRotation = (rotationNumber:number) => {
    const rotations  = [
        [
            [0, 1, 0],
            [1, 1, 1],
            [1, 0, 1],
        ],
        [
            [1, 1, 0],
            [0, 1, 1],
            [1, 1, 0]
        ],
        [
            [1, 0, 1],        
            [1, 1, 1],
            [0, 1, 0],
        ],
        [
            [0, 1, 1],
            [1, 1, 0],
            [0, 1, 1]
        ],
    ];
    return rotations[rotationNumber]
};

describe('Testing tanks rotations', () => {
    let testTank = new Tank(variant.ENEMY);
    beforeEach(() => {
        testTank  = new Tank(variant.ENEMY);
    })
    it('Should rotate tank left when rotateLeft method is invoked', () => {
        const expected = getRotation(1);
        testTank.rotateLeft();
        const result = testTank.currentTank;
        expect(result).toEqual(expected);
    });
    it('Should rotate tank right when rotateRight method is invoked', () => {

    });
    it('Should rotate tank left twice if rotateLeft method is called twice', () => {

    })
    it('Should rotate tank right twice if rotateRight method is called twice', () => {

    })
})
