import { getUUID } from './UUIDGenerator'

type OnTick = (n: number) => any;

export class Clock {
    static instance: any; // [!!!] Type should be corrected
    private time!: number;
    private counter!: NodeJS.Timeout;
    private INTERVAL: number = 100;
    protected callbacks!: {[key: string]: OnTick }
    constructor() {
        if (Clock.instance) return Clock.instance;
        this.time = 0;
        Clock.instance = this;
        this.callbacks = {};
        this.start();
        return this;
    }

    start() {
        this.counter = setInterval(() => {
            this.time! += 1;
            this.runCallbacks();
        }, this.INTERVAL)
    }

    runCallbacks() {
        Object.values(this.callbacks).forEach(cb => cb(this.time))
    }

    addEventListener(onTick: OnTick){
        const id = getUUID();
        this.callbacks[id] = onTick;
        return this.getRemoveEventListener(id);
    }

    getRemoveEventListener(uuid:string) {
        return (() => {delete this.callbacks[uuid]}).bind(this)
    }
}