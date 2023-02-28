import { KeyReader, errors } from '../KeyReader'

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
        const addListener = jest.fn();
        global.window.addEventListener = addListener;
        const keyReader1 = new KeyReader();
        const keyReader2 = new KeyReader();
        expect(addListener).toHaveBeenCalledTimes(1);
    });
    it('Should remove event listener when removeKeyListener called', () => {
        const removeListener = jest.fn();
        global.window.removeEventListener = removeListener;
        const keyReader = new KeyReader();
        keyReader.removeKeyListener();
        expect(removeListener).toHaveBeenCalled();
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
            expect(throwFunctionNoModifier).toThrow(errors.WRONG_TYPE);
            expect(throwFunctionModifier).toThrow(errors.WRONG_TYPE);
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
            expect(throwFunctionModifier).toThrow(errors.WRONG_MODIFIER);
        })

    })
    describe('Unsubscribtions', () => {
        it('Should unsubscribe from an A event in case mulple events and multiple users', () => {
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
                eventType: KeyReader.keys.A,
                callback: cb_1,
            });
            keyReader.subscribe({
                id:ID_2,
                eventType: KeyReader.keys.A,
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
                [KeyReader.keys.A]: {
                    [ID_1]: cb_1,
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
            const expectedAfterRemove = {
                [KeyReader.keys.A]: {
                    [ID_2]: cb_2,
                },
                [KeyReader.keys.RIGHT]: {
                    [ID_3]: cb_3,
                },
                [KeyReader.keys.UP]: {
                    [ID_4]: cb_4,
                },
            }
            keyReader.unsubscribe({id:ID_1, eventType: KeyReader.keys.A})
            expect(keyReader.subscribtions).toEqual(expectedAfterRemove);
        });
        it('Should unsubscribe from an A-ctrl event', () => {
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
            keyReader.subscribe({
                id:ID_3,
                eventType: KeyReader.keys.RIGHT,
                typeModifier: KeyReader.keys.CTRL,
                callback: cb_3,
            });
            keyReader.subscribe({
                id:ID_4,
                eventType: KeyReader.keys.UP,
                typeModifier: KeyReader.keys.CTRL,
                callback: cb_4,
            });

            const expected = {
                [KeyReader.keys.A]: {
                    [ID_1]: cb_1,
                    [ID_2]: cb_2,
                },
                [KeyReader.keys.RIGHT]: {
                    [ID_3]: cb_3,
                },
                [KeyReader.keys.UP]: {
                    [ID_4]: cb_4,
                },
            }
            expect(keyReader.subscribtionsCTRL).toEqual(expected);
            const expectedAfterRemove = {
                [KeyReader.keys.A]: {
                    [ID_2]: cb_2,
                },
                [KeyReader.keys.RIGHT]: {
                    [ID_3]: cb_3,
                },
                [KeyReader.keys.UP]: {
                    [ID_4]: cb_4,
                },
            }
            keyReader.unsubscribe({id:ID_1, eventType: KeyReader.keys.A, typeModifier: KeyReader.keys.CTRL})
            expect(keyReader.subscribtionsCTRL).toEqual(expectedAfterRemove);
        })
        it('Should throw a WRONG EVENT TYPE exception in case recepiant wants to unsubscribe from a not exisitng event type', () => {
            const keyReader = new KeyReader();
            const cb_1 = jest.fn();
            const ID_1 = 'ID_1';
            keyReader.subscribe({
                id:ID_1,
                eventType: KeyReader.keys.A,
                typeModifier: KeyReader.keys.CTRL,
                callback: cb_1,
            });
            const throwingFunction = () => keyReader.unsubscribe({
                eventType: 'NOT EXISTIONG TYPE',
                id: ID_1,
                typeModifier: KeyReader.keys.CTRL
            })
            keyReader.unsubscribe({id:ID_1, eventType: KeyReader.keys.A, typeModifier: KeyReader.keys.CTRL})
            expect(throwingFunction).toThrow(errors.WRONG_TYPE);
        });
        it('Shoudl throw WRONG_MODIFIER_TYPE in case of unsubscribtion from not existing type modifier', () => {
            const keyReader = new KeyReader();
            const cb_1 = jest.fn();
            const ID_1 = 'ID_1';
            keyReader.subscribe({
                id:ID_1,
                eventType: KeyReader.keys.A,
                typeModifier: KeyReader.keys.CTRL,
                callback: cb_1,
            });
            const throwingFunction = () => keyReader.unsubscribe({
                eventType: KeyReader.keys.A,
                id: ID_1,
                typeModifier: 'Not existing modifier'
            })
            keyReader.unsubscribe({id:ID_1, eventType: KeyReader.keys.A, typeModifier: KeyReader.keys.CTRL})
            expect(throwingFunction).toThrow(errors.WRONG_MODIFIER);
        })
    })
    describe('Firing events', () => {
        it('Should trigger all functions related to an A event, not touching functions related to B event, not touching functions related to CTRL-A event', () => {
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
                eventType: KeyReader.keys.A,
                callback: cb_1,
            });
            keyReader.subscribe({
                id:ID_2,
                eventType: KeyReader.keys.B,
                callback: cb_2,
            });
            keyReader.subscribe({
                id:ID_3,
                eventType: KeyReader.keys.A,
                callback: cb_3,
            });
            keyReader.subscribe({
                id:ID_4,
                eventType: KeyReader.keys.D,
                callback: cb_4,
            });
            keyReader.onKeyDown({
                altKey: false,
                ctrlKey: false,
                key: KeyReader.keys.A,
                repeat: false,
                shiftKey: false,
                preventDefault: () => {},
            });
            expect(cb_1).toHaveBeenCalled();
            expect(cb_3).toHaveBeenCalled();
        })
        it('Should not call CTRL modified callbacks in case CTRL is not pressed', () => {
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
                eventType: KeyReader.keys.A,
                callback: cb_1,
                typeModifier: KeyReader.keys.CTRL,
            });
            keyReader.subscribe({
                id:ID_2,
                eventType: KeyReader.keys.B,
                callback: cb_2,
                typeModifier: KeyReader.keys.CTRL,
            });
            keyReader.subscribe({
                id:ID_3,
                eventType: KeyReader.keys.A,
                callback: cb_3,
            });
            keyReader.subscribe({
                id:ID_4,
                eventType: KeyReader.keys.D,
                callback: cb_4,
            });
            keyReader.onKeyDown({
                altKey: false,
                ctrlKey: false,
                key: KeyReader.keys.A,
                repeat: false,
                shiftKey: false,
                preventDefault: () => {},
            });
            expect(cb_1).not.toHaveBeenCalled();
            expect(cb_2).not.toHaveBeenCalled();
            expect(cb_3).toHaveBeenCalled();
        })
        it('Should call only CTRL modified callbacks in case CTRL is pressed', () => {
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
                eventType: KeyReader.keys.A,
                callback: cb_1,
                typeModifier: KeyReader.keys.CTRL,
            });
            keyReader.subscribe({
                id:ID_2,
                eventType: KeyReader.keys.B,
                callback: cb_2,
                typeModifier: KeyReader.keys.CTRL,
            });
            keyReader.subscribe({
                id:ID_3,
                eventType: KeyReader.keys.A,
                callback: cb_3,
            });
            keyReader.subscribe({
                id:ID_4,
                eventType: KeyReader.keys.D,
                callback: cb_4,
            });
            keyReader.onKeyDown({
                altKey: false,
                ctrlKey: true,
                key: KeyReader.keys.A,
                repeat: false,
                shiftKey: false,
                preventDefault: () => {},
            });
            expect(cb_1).toHaveBeenCalled();
            expect(cb_2).not.toHaveBeenCalled();
            expect(cb_3).not.toHaveBeenCalled();
            expect(cb_4).not.toHaveBeenCalled();
        })
    })
    describe('Hold feature', () => {
        it('Should not trigger any event when A pressed, there are A subscribers but hold set to true', () => {
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
                eventType: KeyReader.keys.A,
                callback: cb_1,
                typeModifier: KeyReader.keys.CTRL,
            });
            keyReader.subscribe({
                id:ID_2,
                eventType: KeyReader.keys.B,
                callback: cb_2,
                typeModifier: KeyReader.keys.CTRL,
            });
            keyReader.subscribe({
                id:ID_3,
                eventType: KeyReader.keys.A,
                callback: cb_3,
            });
            keyReader.subscribe({
                id:ID_4,
                eventType: KeyReader.keys.D,
                callback: cb_4,
            });
            keyReader.onKeyDown({
                altKey: false,
                ctrlKey: false,
                key: KeyReader.keys.A,
                repeat: false,
                shiftKey: false,
                preventDefault: () => {},
            });
            expect(cb_1).not.toHaveBeenCalled();
            expect(cb_2).not.toHaveBeenCalled();
            expect(cb_3).toHaveBeenCalled();
            expect(cb_4).not.toHaveBeenCalled();
            jest.clearAllMocks();
            keyReader.hold();
            keyReader.onKeyDown({
                altKey: false,
                ctrlKey: false,
                key: KeyReader.keys.A,
                repeat: false,
                shiftKey: false,
                preventDefault: () => {},
            });
            expect(cb_1).not.toHaveBeenCalled();
            expect(cb_2).not.toHaveBeenCalled();
            expect(cb_3).not.toHaveBeenCalled();
            expect(cb_4).not.toHaveBeenCalled();

            keyReader.resume();
            keyReader.onKeyDown({
                altKey: false,
                ctrlKey: false,
                key: KeyReader.keys.A,
                repeat: false,
                shiftKey: false,
                preventDefault: () => {},
            });
            expect(cb_1).not.toHaveBeenCalled();
            expect(cb_2).not.toHaveBeenCalled();
            expect(cb_3).toHaveBeenCalled();
            expect(cb_4).not.toHaveBeenCalled();

        })
    })
})
// });
