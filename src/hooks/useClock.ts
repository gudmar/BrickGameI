import { useEffect, useState } from "react";
import { Clock } from "../functions/Clock";

export const useTimer = () => {
    const clock = new Clock();
    const [time, setTime] = useState(clock.currentTime);
    useEffect(()=>{
        const removeEventListener = clock.addEventListener(setTime);
        clock.addEventListener(setTime);
        return removeEventListener();
    }, [])
    return time;    
}

