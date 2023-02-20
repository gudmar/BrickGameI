import { useEffect, useState } from "react";
import { Clock } from "../functions/Clock";
import { Speed } from "../types/types";

/**
 * y = ax + b;
 * speed = a * divider + b;
 * 1 = 100a + b
 * 10  10a + b
 * divider = 110 - 10 * speed // where speed is {1, 2, ..., 10}
 * @param time time from clock
 * @param speed game current speed
 */
export const divideTime = (time: number, speed?: Speed) => {
    if (speed !== undefined && speed > 10) throw new Error(`Speed value: ${speed} is grater then 10`);
    if (speed !== undefined && speed < 1) throw new Error(`Speed value: ${speed} is less then 10`);
    if (!speed) return time;
    const divider = 110 - 10 * speed;
    const result = Math.floor(time / divider);
    return result;
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

