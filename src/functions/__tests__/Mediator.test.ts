import { Mediator } from '../Mediator'

describe('Testing Mediator', () => {
    afterEach(() => { delete Mediator.instance })
    it('Should be a singleton', () => {
        const m1 = new Mediator();
        const m2 = new Mediator();
        expect(m1 === m2).toBeTruthy();
    })
    it('Should add a subscription to subscriptoins when subscribe called', () => {
        const m = new Mediator();
        m.subscribe({ id: 'id1', eventType: 'event1', callback: () => {}})
        m.subscribe({ id: 'id2', eventType: 'event1', callback: () => {}})
        m.subscribe({ id: 'id3', eventType: 'event2', callback: () => {}})
        expect(m.subscribtions?.['event1']?.['id1']).toBeDefined();
        expect(m.subscribtions?.['event1']?.['id2']).toBeDefined();
        expect(m.subscribtions?.['event2']?.['id3']).toBeDefined();
    })
    it('Should remove Mediator after every test', () => {
        expect(Mediator.instance).toBeUndefined();
    })
    it('Should unsubscribe if unsubscribe called', () => {
        const m = new Mediator();
        m.subscribe({ id: 'id1', eventType: 'event1', callback: () => {}})
        m.subscribe({ id: 'id2', eventType: 'event1', callback: () => {}})
        m.subscribe({ id: 'id3', eventType: 'event2', callback: () => {}})
        expect(m.subscribtions?.['event1']?.['id1']).toBeDefined();
        expect(m.subscribtions?.['event1']?.['id2']).toBeDefined();
        expect(m.subscribtions?.['event2']?.['id3']).toBeDefined();
        m.unsubscribe({id: 'id2', eventType: 'event1'});
        expect(m.subscribtions?.['event1']?.['id1']).toBeDefined();
        expect(m.subscribtions?.['event1']?.['id2']).toBeUndefined();
        expect(m.subscribtions?.['event2']?.['id3']).toBeDefined();
    })
    it('Should run all callbacks related to some event', () => {
        const m = new Mediator();
        let state = Array(5).fill(null).map( _ => 0 );
        const setter = (index:number) => (payload:number[]) => { payload[index] = 1 };
        const events = [
            {eventType: 'e1', id: 'id1', callback: setter(0)},
            {eventType: 'e1', id: 'id2', callback: setter(1)},
            {eventType: 'e1', id: 'id3', callback: setter(2)},
            {eventType: 'e2', id: 'id1', callback: setter(3)},
            {eventType: 'e3', id: 'id4', callback: setter(4)},
        ];
        events.forEach( event => m.subscribe(event));
        m.emit({eventType: 'e1', payload: state})
        const expecetd = [1, 1, 1, 0, 0];
        expect(state).toEqual(expecetd);
        m.emit({eventType: 'e2', payload: state})
        expect(state).toEqual([1, 1, 1, 1, 0]);
    })
    it('Should clear all subscribtions owned by a user', () => {
        const m = new Mediator();
        const getId = (nr: number) => ({id: `id${nr}`});
        const getEvent = (e: string) => ({eventType: e});
        const cb = () => {};
        const cbObject = {callback: cb};
        const subscribtions = [
            { ...getId(0),  ...getEvent('e1'), ...cbObject},
            { ...getId(0),  ...getEvent('e2'), ...cbObject},
            { ...getId(0),  ...getEvent('e3'), ...cbObject},
            { ...getId(0),  ...getEvent('e4'), ...cbObject},
            { ...getId(1),  ...getEvent('e1'), ...cbObject},
            { ...getId(1),  ...getEvent('e2'), ...cbObject},
            { ...getId(1),  ...getEvent('e3'), ...cbObject},
            { ...getId(2),  ...getEvent('e1'), ...cbObject},
            { ...getId(2),  ...getEvent('e2'), ...cbObject},
        ];
        const expectedBefore = {
            e1: {
                id0: cb,
                id1: cb,
                id2: cb,
            },
            e2: {
                id2: cb,
                id1: cb,
                id0: cb,
            },
            e3: {
                id1: cb,
                id0: cb,
            },
            e4: {
                id0: cb,
            }
        }

        const expectedAfter = {
            e1: {
                id1: cb,
                id2: cb,
            },
            e2: {
                id2: cb,
                id1: cb,
            },
            e3: {
                id1: cb,
            }
        }
        subscribtions.forEach((subscribtion) => {
            m.subscribe(subscribtion);
        })
        expect(m.subscribtions).toEqual(expectedBefore);
        m.unsubscribeSubscriber('id0');
        expect(m.subscribtions).toEqual(expectedAfter);
    })
})
