import { BrickMap } from "../../types/types";
import { CommandMediator } from "../layers/toggle/RandomPixels"
import { getBoardOf_0, RandomPixelsMock } from "./data/RandomPixelsMock"

const mathMock = {random: () => 1, floor: (val:number) => val};
global.Math.random = () => 1/200; // = { ...Math, ...mathMock };

describe('Testing Mediator for RandomPixels', () => {
    it('Should toggle 5 pixels when applyNextAnimationFrame called once', () => {
        const animator = new RandomPixelsMock(CommandMediator);
        animator.applyNextAnimationFrame(getBoardOf_0());
        const expected:BrickMap = getBoardOf_0();
        expected[0][0] = 1;
        expected[0][1] = 1;
        expect(animator.brickMap).toEqual(expected);
    })
})