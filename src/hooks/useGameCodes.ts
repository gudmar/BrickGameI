import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { EVERY_KEY, keyCodes, KeyReader } from "../functions/KeyReader";
import { StringPatternMatcher } from "../functions/StringPatternsMatcher";

export const useGameCodes = (listOfCodes:string[]) => {
    const keyReader = new KeyReader([keyCodes.F12, keyCodes.F5]);
    const matcher = useMemo(() => new StringPatternMatcher(listOfCodes), [listOfCodes]);
    const [ matchedCode, setMatchedCode ] = useState<string>('');

    const id =useId();

    const keyStrokeCallback = (key?: string) => {
        const matchedCode = matcher.feedWithCheck(key!);
        setMatchedCode(matchedCode);
    }
    
    useEffect(() => {
            keyReader.subscribe({
                id,
                eventType: EVERY_KEY,
                callback: keyStrokeCallback,
            })            
        return () => {
            keyReader.unsubscribe({id, eventType: EVERY_KEY});
        }
    },
    // eslint-disable-next-line
    [])

    useEffect(() => {
        console.log(matchedCode)
        if (matchedCode !== '') {
            matcher.clearBufor();
        }
    }, [matchedCode, matcher])

    return matchedCode;
}