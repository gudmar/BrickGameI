import { forEachChild } from 'typescript';
import { Clock } from '../Clock'

class TestableClock extends Clock {
    getCallbacks() { return this.callbacks}
}
jest.useFakeTimers();
describe('Testing Clock', () => {

    beforeEach(() => { delete Clock.instance; })

    it('Should be a singleton', () => {
        const clockA = new Clock();
        const clockB = new Clock();
        expect(clockA === clockB).toBeTruthy();
    })

    it('Should subscribe 2 functions if 2 event listeners are added, should reurn unsubscribe functions, shoudl unsubscribe if unsubscribe functions are called', () => {
        const clock = new TestableClock();
        const unsubscribe1 = clock.addEventListener(() => {});
        const unsubscribe2 = clock.addEventListener(() => {});
        let callbacks = clock.getCallbacks();
        let callbacksLength = Object.keys(callbacks).length;
        expect(callbacksLength).toBe(2);
        unsubscribe1();
        callbacks = clock.getCallbacks();
        callbacksLength = Object.keys(callbacks).length;
        expect(callbacksLength).toBe(1);
        unsubscribe2();
        callbacks = clock.getCallbacks();
        callbacksLength = Object.keys(callbacks).length;
        expect(callbacksLength).toBe(0);

    })

    it('Should start clock', () => {
        const clock = new TestableClock();
        const mockCallback = jest.fn();
        clock.addEventListener(mockCallback);
        jest.runOnlyPendingTimers();
        expect(mockCallback).toBeCalled();
    })

    it('Should run all callbacks', () => {
        const clock = new TestableClock();
        const arrOfCallbacks = new Array(5).fill(null).map(_=>jest.fn());
        arrOfCallbacks.forEach((fn) => clock.addEventListener(fn));
        jest.runOnlyPendingTimers();
        arrOfCallbacks.forEach((fn) => expect(fn).toBeCalled());
    })


})