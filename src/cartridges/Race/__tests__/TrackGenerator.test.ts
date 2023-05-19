import { getRandom } from "../../../functions/getRandom";
import { GameCreator } from "../../GameCreator";
import { CAR_PERIOD } from "../constants";
import { Sites, TrackGenerator } from "../TrackBlueprintGenerator";

jest.mock('../../../functions/getRandom');

describe('Testing TrackBlueprintGenerator', () => {
    describe('Testing generateBlueprint', () => {
        const visitedObject = {level: 0};
        beforeEach(() => {
            visitedObject.level = 0;
            jest.clearAllMocks();
        })
        afterEach(() => jest.clearAllMocks())
        it('Should generate [0 0], [0, 0], [0, 1] when game started and initial site is randomly chosen to RIGHT', () => {
            const generator = new TrackGenerator({testRandomValue: Sites.RIGHT, visitedObject: visitedObject as GameCreator});
            const result = generator.generateBlueprint();
            expect(result).toEqual([[0, 0], [0, 0], [0, 1]])
        });
        it('Should generate [0 0], [0, 0], [1, 0] when game started and initial site is randomly chosen to LEFT', () => {
            const generator = new TrackGenerator({testRandomValue: Sites.LEFT, visitedObject: visitedObject as GameCreator});
            const result = generator.generateBlueprint();
            expect(result).toEqual([[0, 0], [0, 0], [1, 0]])
        })
        it(`Should not generate new entry if PHASE is < ${CAR_PERIOD}`, () => {
            // phase is step of car takeover: car is 4 long, space left must be 5 long
            // Generation is lasy,
            const generator = new TrackGenerator({testRandomValue: Sites.RIGHT, visitedObject: visitedObject as GameCreator});
            generator.gamePhase = 8;
            const result = generator.generateBlueprint();
            expect(result).toEqual([[0, 0], [0, 0], [0, 1]])
        })
        it('Should generate 00 10 10 if left 1 game phase and no change in direction given', () => {
            (getRandom as jest.MockedFunction<typeof getRandom>).mockImplementation(() => 1234)
            const generator = new TrackGenerator({testRandomValue: Sites.RIGHT, visitedObject: visitedObject as GameCreator});
            generator.gamePhase = CAR_PERIOD;      
            const result = generator.generateBlueprint();
            expect(result).toEqual([[0, 0], [0, 1], [0, 1]])
        })
        it('Should generate 00 10 01 if left 1 game phase and change in direction given', () => {
            (getRandom as jest.MockedFunction<typeof getRandom>).mockImplementation(() => 0)
            const generator = new TrackGenerator({testRandomValue: Sites.RIGHT, visitedObject: visitedObject as GameCreator});
            generator.gamePhase = CAR_PERIOD;
            const result = generator.generateBlueprint();
            expect(result).toEqual([[0, 0], [0, 1], [1, 0]])
        })

    });
})