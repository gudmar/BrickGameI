import { useEffect } from "react";
import { Mediator } from "../functions/Mediator";

const throwIfNoId = (id: string):void => {
    if(!id) throw new Error('useMediator: id has to be defined')
}

export const useMediator = (id:string) => {
    throwIfNoId(id);
    const m = new Mediator();
    
}
