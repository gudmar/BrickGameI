const KEYDOWN = 'keydown';

interface Subscribtion {
    id: string, eventType: string, callback: (() => {}),
}

interface Unsubscribtion {
    id: string, eventType: string,
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

export class KeyReader {
    static instance: any;
    static keys = keyCodes;
    holdReadingInputs = false;
    private _subscribtions: any = {};
    constructor() {
        if (KeyReader.instance) return KeyReader.instance;
        KeyReader.instance = this;
        window.addEventListener(KEYDOWN, this.onKeyDown)
    }

    private createPath(eventType: string, id: string):void{
        if (!this._subscribtions[eventType]) this._subscribtions[eventType] = {};
        if (!this._subscribtions[eventType][id]) this._subscribtions[eventType][id] = null;
    }

    subscribe({ id, eventType, callback }: Subscribtion) {
        this.createPath(eventType, id);
        this._subscribtions[eventType][id] = callback;
    }

    unsubscribe({ id, eventType }: Unsubscribtion) {
        delete this._subscribtions[eventType][id];
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