import {KeyReader} from '../KeyReader.ts'

describe('Testing KeyReader', () => {
    it('Should create only a single instance of this object', () => {

    });
    it('Should not create more than one event listerner on the window objet', () => {

    });
    it('Should remove event listener when removeKeyListener called', () => {

    })
    describe('Subscribtions', () => {
        it('Should subscribe to an event on "A" key', () => {

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
        it('Should not trigger any event when A pressed, there are A subscribers but hold set to true')
    })
})