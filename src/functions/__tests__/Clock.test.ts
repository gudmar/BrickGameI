import { Clock } from '../Clock'

class TestableClock extends Clock {
    getCallbacks() { return this.callbacks}
}

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

    })

    it('Should run all callbacks', () => {
        
    })


})