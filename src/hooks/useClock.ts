import { useEffect, useState } from "react";
import { Clock } from "../functions/Clock";
import { Speed } from "../types/types";

export const DIV_POINTS = {
    _10: 10,
    _9: 12,
    _8: 14,
    _7: 16,
    _6: 18,
    _5: 20,
    _4: 23,
    _3: 26,
    _2: 28,
    _1: 30,
}

export const divideTime = (time, speed) => {

}

export const useTimer = (speed?:Speed) => {
    const clock = new Clock();
    const [time, setTime] = useState(clock.currentTime);
    useEffect(()=>{
        const removeEventListener = clock.addEventListener(setTime);
        clock.addEventListener(setTime);
        return removeEventListener();
    }, [])
    return time;    
}

