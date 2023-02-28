import { useEffect, useId } from "react";
import { KeyReader } from "../functions/KeyReader"

export interface useKeyboardProps {
    key: string,
    modifier: string,
    callback: ()=>{},
}

export const keys = KeyReader.keys;

export const useKeyboard = ({key, modifier, callback}:useKeyboardProps) => {
    const keyReader = new KeyReader();
    const id =useId();
    useEffect(() => {
        keyReader.subscribe({
            id,
            eventType:key,
            callback,
            typeModifier:modifier,
        })        
        return () => {
            keyReader.unsubscribe({id, eventType: key, typeModifier: modifier});
        }
    },
    // eslint-disable-next-line
    [key, modifier, callback, id])
}
