import { Speed } from "../types/types";

export const shouldGenerateNextMove = (speed : Speed, clockValue : number) => {
    const divider = 10 - speed;
    return clockValue % divider === 0;
};
