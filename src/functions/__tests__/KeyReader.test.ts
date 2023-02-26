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

        })
        it('Should subscribe 4 recepants to different not ctrl, not alt, not shift key events', () => {

        })
        it('Should subscribe to a CTRL-A event', () => {

        })
        it('Shoud subscribe to a CTRL-A event 2 recepiants', () => {

        })
        it('Should throw a NOT_SUPPORTED_EVENT error in case some recepiant wants to subscribe to not possible event type. Check CTRL and siple event types', () => {

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