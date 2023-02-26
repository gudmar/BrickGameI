import { findAllByAltText } from "@testing-library/react";

const KEYDOWN = 'keydown';

interface Subscribtion {
    id: string, eventType: string, callback: (() => {}), typeModifier?: string,
}

interface Unsubscribtion {
    id: string, eventType: string, typeModifier?: string
}

const keyCodes = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    SPACE: ' ',
    ENTER: 'Enter',
    SHIFT: 'Shift',
    TAB: 'Tab',
    CTRL: 'Control',
    ALT: 'Alt',
    CAPS: 'Capslock',
    NUMLOCK: 'Numlock',
    F1: 'F1',
    F2: 'F2',
    F3: 'F3',
    F4: 'F4',
    F5: 'F5',
    F6: 'F6',
    F7: 'F7',
    F8: 'F8',
    F9: 'F9',
    F10: 'F10',
    F11: 'F11',
    F12: 'F12',
    COLN: ':',
    SEMICOLN: ';',
    META: 'Meta', // Windows key
    DOT: '.',
    A: 'a',
    _A: 'A',
    B: 'b',
    _B:'B',
    C:'c',
    D: 'd',
    E: 'e',
    F: 'f',
    G: 'g',
    H: 'h',
    I: 'i',
    J: 'j',
    K: 'k',
    L: 'l',
    M: 'm',
    N: 'n',
    O: 'o',
    P: 'p',
    R: 'r',
    S: 's',
    T: 't',
    U: 'u',
    W: 'w',
    X: 'x',
    Y: 'y',
    Z: 'z',
    Q: 'q',
    _C:'C',
    _D: 'D',
    _E: 'E',
    _F: 'F',
    _G: 'G',
    _H: 'H',
    _I: 'I',
    _J: 'J',
    _K: 'K',
    _L: 'L',
    _M: 'M',
    _N: 'N',
    _O: 'O',
    _P: 'P',
    _R: 'R',
    _S: 'S',
    _T: 'T',
    _U: 'U',
    _W: 'W',
    _X: 'X',
    _Y: 'Y',
    _Z: 'Z',
    _Q: 'Q',
    // Can add more if needed
}

export const errors = {
    WRONG_MODIFIER: 'Given modification key not supported. Use one of: ctrl, Shift or alt',
    WRONG_TYPE: 'Given type is not supported. Use one of KeyReader.keys'
}

interface PathCreationable {
    eventType: string, id: string, root: any,
}

export class KeyReader {
    static instance: any;
    static keys = keyCodes;
    private static errors = errors;
    holdReadingInputs = false;
    private _subscribtions: any = {};
    private _subscribtionsCTRL: any = {};
    constructor() {
        if (KeyReader.instance) return KeyReader.instance;
        KeyReader.instance = this;
        window.addEventListener(KEYDOWN, this.onKeyDown)
    }

    public get subscribtions() { return this._subscribtions }
    public get subscribtionsCTRL() { return this._subscribtionsCTRL }

    private createPath({eventType, id, root}: PathCreationable):void{
        if (!root[eventType]) root[eventType] = {};
        if (!root[eventType][id]) root[eventType][id] = null;
    }

    subscribe({ id, eventType, callback, typeModifier }: Subscribtion) {
        this.throwIfTypeNotAllowed(eventType);
        switch( typeModifier ){
            case undefined: {
                this.subscribeNoModifier({id, eventType, callback});
                break;
            }
            case KeyReader.keys.CTRL: {
                this.subscribeCTRL({id, eventType, callback});
                break;
            }
            default: throw new Error(KeyReader.errors.WRONG_MODIFIER)
        }
    }

    private throwIfTypeNotAllowed = (type:string) => {
        const allowedTypes = Object.values(KeyReader.keys);
        if (!allowedTypes.find(t => t === type)) {
            throw new Error(KeyReader.errors.WRONG_TYPE)
        }
    }

    private subscribeNoModifier({id, eventType, callback}: Subscribtion) {
        this.createPath({ eventType, id, root: this._subscribtions });
        this._subscribtions[eventType][id] = callback;
    }

    private subscribeCTRL({id, eventType, callback}: Subscribtion) {
        this.createPath({ eventType, id, root: this._subscribtionsCTRL });
        this._subscribtionsCTRL[eventType][id] = callback;
    }

    unsubscribe({ id, eventType, typeModifier }: Unsubscribtion) {
        this.throwIfTypeNotAllowed(eventType);
        switch(typeModifier){
            case undefined: {
                delete this._subscribtions[eventType][id];
                break;
            }
            case KeyReader.keys.CTRL: {
                delete this._subscribtionsCTRL[eventType][id];
                break;
            }
            default: throw new Error(KeyReader.errors.WRONG_MODIFIER)
        }
        
    }

    hold() { this.holdReadingInputs = true; }
    resume() { this.holdReadingInputs = false; }

    onKeyDown(event:any) {
        const {
            altKey, ctrlKey, key, repeat, shiftKey, type
        } = event;
        event.preventDefault();
        console.log(`[${event.key}]`);
        if(event.key === ' ') console.log('SPACE')
        // console.log('CTRL', event.ctrlKey)
        console.log('CTRL', event)
    };

    removeKeyListener() {
        window.removeEventListener(KEYDOWN, this.onKeyDown);
    }
}