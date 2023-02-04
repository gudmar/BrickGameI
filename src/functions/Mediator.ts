export type MediatorCallback = ((payload: any) => void)

interface Subscribers {
    [id:string]: MediatorCallback | null,
}

interface Subscribtions {
    [eventType: string]: Subscribers,
}

interface Subscribtion {
    id: string, eventType: string, callback: MediatorCallback,
}

interface Unsubscribtion {
    id: string, eventType: string,
}

interface Emitter {
    eventType: string, payload: any
}

export class Mediator {
    static instance?: any;
    public subscribtions: any;
    constructor(){
        console.log('INSTANCE ', Mediator.instance)
        if (Mediator.instance !== undefined) return Mediator.instance;
        this.subscribtions = {};
        Mediator.instance = this;
    }

    private createPath(eventType: string, id: string):void{
        if (!this.subscribtions[eventType]) this.subscribtions[eventType] = {};
        if (!this.subscribtions[eventType][id]) this.subscribtions[eventType][id] = null;
    }

    subscribe({ id, eventType, callback }: Subscribtion) {
        this.createPath(eventType, id);
        this.subscribtions[eventType][id] = callback;
        console.log(this.subscribtions)
    }

    unsubscribe({ id, eventType }: Unsubscribtion) {
        console.log('UNSUBSCRIBE', id)
        delete this.subscribtions[eventType][id];
    }

    private emptyEvents = () => {
        const events = Object.keys(this.subscribtions)
        console.log(events)
        const emptyEventKeys = events.filter(event => Object.keys(this.subscribtions[event]).length === 0);
        console.log(emptyEventKeys)
        emptyEventKeys.forEach(key => { delete this.subscribtions[key] })
    }

    unsubscribeSubscriber(id: string){
        const events: Subscribers[] = Object.values(this.subscribtions);
        events.forEach((event) => delete event[id])
        this.emptyEvents();
        console.log('Unsubscribing subscriber', id)
    }

    emit({ eventType, payload }: Emitter) {
        console.log(this.subscribtions)
        const eventHandlers: (MediatorCallback|null)[] = Object.values(this.subscribtions[eventType]);
        if (!eventHandlers) return null;
        if (eventHandlers) eventHandlers.forEach(
            handler => {
                if (handler !== null) {
                    handler(payload)
                }    
            }
        )
    }

}