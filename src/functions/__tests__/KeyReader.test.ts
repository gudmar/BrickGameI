import {KeyReader} from '../KeyReader.ts'

describe('Testing KeyReader', () => {
    afterEach(() => { delete KeyReader.instance })
    it('Should create only a single instance of this object', () => {
        const keyReader_1 = new KeyReader();
        const keyReader_2 = new KeyReader();
        expect(keyReader_1 === keyReader_2).toBeTruthy();
        delete KeyReader.instance
        const keyReader_3 = new KeyReader();
        expect(keyReader_1 === keyReader_3).toBeFalsy();
    });
    it('Should not create more than one event listerner on the window objet', () => {
        // Call new KeyReader twice
        // Subscribe a subscirber
        // Create a mock function with counter
        // Trigger key event
        // See how many times function was invoked
    });
    it('Should remove event listener when removeKeyListener called', () => {
        // Call newKeyReader
        // Subscribe to an keyEvent
        // emulate key event,
        // check if cb function was invoked,
        // removeKeyListener
        // emulate kye event again
        // subscribe function should not be invoked
        // subscribe one more time
        // emulate key event one more time
        // cb should be invoked
    })
    describe('Subscribtions', () => {
        it('Should subscribe to an event on "A" key', () => {
            const keyReader = new KeyReader();
            const cb = jest.fn();
            const ID = 'ID';
            keyReader.subscribe({
                id:ID,
                eventType: KeyReader.keys.A,
                callback: cb,
            });
            const expected = {
                [KeyReader.keys.A]: {
                    [ID]: cb,
                }
            }
            expect(keyReader.subscribtions).toEqual(expected);
        });
        it('Should subscribe 2 recepants to an "A" event', () => {
            const keyReader = new KeyReader();
            const cb_1 = jest.fn();
            const cb_2 = jest.fn();
            const ID_1 = 'ID_1';
            const ID_2 = 'ID_2'
            keyReader.subscribe({
                id:ID_1,
                eventType: KeyReader.keys.A,
                callback: cb_1,
            });
            keyReader.subscribe({
                id:ID_2,
                eventType: KeyReader.keys.A,
                callback: cb_2,
            });
            const expected = {
                [KeyReader.keys.A]: {
                    [ID_1]: cb_1,
                    [ID_2]: cb_2
                }
            }
            expect(keyReader.subscribtions).toEqual(expected);
        })
        it('Should subscribe 4 recepants to different not ctrl, not alt, not shift key events', () => {
            const keyReader = new KeyReader();
            const cb_1 = jest.fn();
            const cb_2 = jest.fn();
            const cb_3 = jest.fn();
            const cb_4 = jest.fn();
            const ID_1 = 'ID_1';
            const ID_2 = 'ID_2';
            const ID_3 = 'ID_3';
            const ID_4 = 'ID_4';
            keyReader.subscribe({
                id:ID_1,
                eventType: KeyReader.keys.DOWN,
                callback: cb_1,
            });
            keyReader.subscribe({
                id:ID_2,
                eventType: KeyReader.keys.LEFT,
                callback: cb_2,
            });
            keyReader.subscribe({
                id:ID_3,
                eventType: KeyReader.keys.RIGHT,
                callback: cb_3,
            });
            keyReader.subscribe({
                id:ID_4,
                eventType: KeyReader.keys.UP,
                callback: cb_4,
            });

            const expected = {
                [KeyReader.keys.DOWN]: {
                    [ID_1]: cb_1,
                },
                [KeyReader.keys.LEFT]: {
                    [ID_2]: cb_2,
                },
                [KeyReader.keys.RIGHT]: {
                    [ID_3]: cb_3,
                },
                [KeyReader.keys.UP]: {
                    [ID_4]: cb_4,
                },

            }
            expect(keyReader.subscribtions).toEqual(expected);
        })
        it('Should subscribe to a CTRL-A event', () => {
            const keyReader = new KeyReader();
            const cb = jest.fn();
            const ID = 'ID';
            keyReader.subscribe({
                id:ID,
                eventType: KeyReader.keys.A,
                typeModifier: KeyReader.keys.CTRL,
                callback: cb,
            });
            const expected = {
                [KeyReader.keys.A]: {
                    [ID]: cb,
                }
            }
            expect(keyReader.subscribtionsCTRL).toEqual(expected);
        })
        it('Shoud subscribe to a CTRL-A event 2 recepiants', () => {
            const keyReader = new KeyReader();
            const cb_1 = jest.fn();
            const cb_2 = jest.fn();
            const ID_1 = 'ID_1';
            const ID_2 = 'ID_2';
            keyReader.subscribe({
                id:ID_1,
                eventType: KeyReader.keys.A,
                typeModifier: KeyReader.keys.CTRL,
                callback: cb_1,
            });
            keyReader.subscribe({
                id:ID_2,
                eventType: KeyReader.keys.A,
                typeModifier: KeyReader.keys.CTRL,
                callback: cb_2,
            });
            const expected = {
                [KeyReader.keys.A]: {
                    [ID_1]: cb_1,
                    [ID_2]: cb_2,
                },
            }
            expect(keyReader.subscribtionsCTRL).toEqual(expected);
        })
        it('Should throw a NOT_SUPPORTED_EVENT error in case some recepiant wants to subscribe to not possible event type. Check CTRL and siple event types', () => {
            const keyReader = new KeyReader();
            const cb = jest.fn();
            const ID = 'ID';
            const throwFunctionNoModifier = () => keyReader.subscribe({
                id:ID,
                eventType: 'NOT_SUPPORTED_EVENT',
                typeModifier: undefined,
                callback: cb,
            });
            const throwFunctionModifier = () => keyReader.subscribe({
                id:ID,
                eventType: 'NOT_SUPPORTED_EVENT',
                typeModifier: KeyReader.keys.CTRL,
                callback: cb,
            })
            expect(throwFunctionNoModifier).toThrow(KeyReader.errors.WRONG_TYPE);
            expect(throwFunctionModifier).toThrow(KeyReader.errors.WRONG_TYPE);
        })
        it('Should throw a WRONG MODIFIER TYPE error in case some recepiant wants to subscribe to an event with type modifier other than CTRL, ALT or Shift', () => {
            const keyReader = new KeyReader();
            const cb = jest.fn();
            const ID = 'ID';
            const throwFunctionModifier = () => keyReader.subscribe({
                id:ID,
                eventType: KeyReader.keys.A,
                typeModifier: KeyReader.keys.G,
                callback: cb,
            })
            expect(throwFunctionModifier).toThrow(KeyReader.errors.WRONG_MODIFIER);
        })

    })
    describe('Unsubscribtions', () => {
        it('Should unsubscribe from an A event in case mulple events and multiple users', () => {

        });
        it('Should unsubscribe from an A-ctrl event', () => {

        })
        it('Should throw a NO_SUCH_EVENT exception in case recepiant wants to unsubscribe from a not exisitng event', () => {

        }) 
    })
    describe('Firing events', () => {
        it('Should trigger all functions related to an A event, not touching functions related to B event, not touching functions related to CTRL-A event', () => {

        })
    })
    describe('Hold feature', () => {
        it('Should not trigger any event when A pressed, there are A subscribers but hold set to true', () => {

        })
    })
})