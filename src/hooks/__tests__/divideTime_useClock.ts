import { divideTime, DIV_POINTS } from "../useClock";

// speed = -0.1 divider + 11
// -speed * 10 = divider - 110;
// divider = [110 - 10 * speed] // where speed is {1, 2 ... 10}

const BIG_TIME_TEST_CASES = [
    {speed: 2, time: 22000, expected: 244, divider: 90},
    {speed: 3, time: 22000, expected: 275, divider: 80},
    {speed: 4, time: 22000, expected: 314, divider: 70},
    {speed: 5, time: 220000, expected: 3666, divider: 60},
    {speed: 6, time: 220000, expected: 4400, divider: 50},
    {speed: 7, time: 220000, expected: 5500, divider: 40},
    {speed: 8, time: 220000, expected: 7333, divider: 30},
    {speed: 9, time: 220000, expected: 11000, divider: 20},
    {speed: 10, time: 220000, expected: 22000, divider: 10},
]

describe('Testing divideTime', () => {
    it('Should return not divided value if speed is not defined', () => {
        const time = 987;
        const speed = undefined;
        const expected = 987;
        const result  = divideTime(time, speed);
        expect(result).toBe(expected);
    });
    it('Should thorw in case speed is < 1', () => {
        const throwingFunction = () => divideTime(299, 0);
        expect(throwingFunction).toThrow();
    })
    it('Should throw in case speed is > 10', () => {
        const throwingFunction = () => divideTime(322, 11);
        expect(throwingFunction).toThrow();
    })
    // In case of floating point speed there is not a big problem, as they will be 
    // calculated normally, no strange results will occure,
    // Moreover floating pont spped is not likely to occure
    // The problem would be with speeds smaller that 1 and bigger then 10, as results
    // wold cause error and user would notice this
    describe('Testing speed 10', () => {
        it(`Should return 0 if speed 10 and time 99`, () => {
            const time = 99; 
            const speed = 10;
            const expected = 0;
            const result  = divideTime(time, speed);
            expect(result).toBe(expected);
        });
        it(`Should return 0 if speed 10 and time 0`, () => {
            const time = 0; 
            const speed = 10;
            const expected = 0;
            const result  = divideTime(time, speed);
            expect(result).toBe(expected);
        });
        it(`Should return 1 if speed 10 and time 100`, () => {
            const time = 100; 
            const speed = 10;
            const expected = 1;
            const result  = divideTime(time, speed);
            expect(result).toBe(expected);
        });
        it(`Should return 1 if speed 10 and time 109`, () => {
            const time = 109; 
            const speed = 10;
            const expected = 1;
            const result  = divideTime(time, speed);
            expect(result).toBe(expected);

        })
        it(`Should return 9 if speed 10 and time 901`, () => {
            const time = 901; 
            const speed = 10;
            const expected = 9;
            const result  = divideTime(time, speed);
            expect(result).toBe(expected);
        })
    });
    describe('Testing speed 1', () => {
        it('Should return 0 in case speed is 1 and time is 1', () => {
            const time = 1; 
            const speed = 1;
            const expected = 0;
            const result  = divideTime(time, speed);
            expect(result).toBe(expected);
        })
        it('Should return 0 in case speed is 1 and time is 999', () => {
            const time = 999; 
            const speed = 1;
            const expected = 0;
            const result  = divideTime(time, speed);
            expect(result).toBe(expected);
        })
        it('Should return 1 in case speed is 1 and time is 1000', () => {
            const time = 1000; 
            const speed = 1;
            const expected = 1;
            const result  = divideTime(time, speed);
            expect(result).toBe(expected);
        });
        it('Should return 1 in case speed is 1 and time is 1999', () => {
            const time = 1999; 
            const speed = 1;
            const expected = 1;
            const result  = divideTime(time, speed);
            expect(result).toBe(expected);
        })
        it('Should return 10 in case speed is 1 and time is 10000', () => {
            const time = 10000; 
            const speed = 1;
            const expected = 10;
            const result  = divideTime(time, speed);
            expect(result).toBe(expected);
        })
    });
    describe('Testing speed 5 (divide by 60)', () => {
        it('Should return 0 in case speed is 5 and time is 59', () => {
            const time = 59; 
            const speed = 5;
            const expected = 0;
            const result  = divideTime(time, speed);
            expect(result).toBe(expected);
        })
        it('Should return 1 in case speed is 5 and time is 60', () => {
            const time = 60; 
            const speed = 5;
            const expected = 1;
            const result  = divideTime(time, speed);
            expect(result).toBe(expected);
        })
        it('Should return 100 in case speed is 5 and time is 6000', () => {
            const time = 6000; 
            const speed = 5;
            const expected = 100;
            const result  = divideTime(time, speed);
            expect(result).toBe(expected);
        })
    });
    describe('Testing speed 7 (divide by 40', () => {
        it('Should return 0 in case time is 39 and speed is 7', () => {
            const time = 39; 
            const speed = 7;
            const expected = 0;
            const result  = divideTime(time, speed);
            expect(result).toBe(expected);
        })
        it('Should 1 in case time is 40 and speed is 7', () => {
            const time = 40; 
            const speed = 7;
            const expected = 1;
            const result  = divideTime(time, speed);
            expect(result).toBe(expected);
        })
    })
})