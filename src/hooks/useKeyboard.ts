import { useEffect, useId, useState } from "react";
import { keyCodes, KeyReader } from "../functions/KeyReader"

export interface useKeyboardProps {
    key: string,
    modifier?: string,
    callback: ()=>{},
}

export const keys = KeyReader.keys;

export const useKeyboard = ({key, modifier, callback}:useKeyboardProps) => {
    const keyReader = new KeyReader([keyCodes.F12, keyCodes.F5]);
    const [locked, setLocked] = useState(false);
    const lock = () => {console.log('LOCK'); setLocked(true)};
    const unlock = () => {console.log('UNLOCK'); setLocked(false)};
    const id =useId();
    const unsubscribe = () => keyReader.unsubscribe({id, eventType: key, typeModifier:modifier})
    useEffect(() => {
        if (locked) {
            keyReader.unsubscribe({id, eventType: key, typeModifier: modifier});
        } else {
            keyReader.subscribe({
                id,
                eventType:key,
                callback,
                typeModifier:modifier,
            })            
        }
        return () => {
            keyReader.unsubscribe({id, eventType: key, typeModifier: modifier});
        }
    },

    // eslint-disable-next-line
    [key, modifier, callback, id, locked])


    return { lock, unlock, unsubscribe }
}
