import { useEffect, useState } from "react";
import { Mediator } from "../functions/Mediator";
import { getUUID } from "../functions/UUIDGenerator";

export interface Observables {
    eventType: string,
    initialValue: any,
    setStateFunction?: (payload:any) => {},
}

interface GetObservablesCallbacks {
    observables: Observables[] | null,
    setValueStateFunction: any,
    currentValueState: any[],
}

interface GetCallback {
    index: number,
    currentValueState: any[],
    setStateFunction: any,
}


const getInitialValues = (observables:Observables[] | null):any[] | null => {
        if (!observables) return null;
        return observables.map(
            ({initialValue}) => initialValue
        )
    }

const getCallback = ({ index, currentValueState, setStateFunction }: GetCallback) => {
    const cb = (payload: any) => {
        const valueStateCp = [...currentValueState];
        valueStateCp[index] = payload;
        setStateFunction(valueStateCp);
    }
    return cb;
}

const getObservablesWithCallbacks = (
        { observables, setValueStateFunction, currentValueState }: GetObservablesCallbacks
    ) => {
    if (!observables) return null;
    const newObservables = observables.map((observable, index) => ({
            ...observable,
            setStateFunction: getCallback({index, currentValueState, setStateFunction: setValueStateFunction}),
        })
    );
    return newObservables;
}

const thisInstanceId = getUUID();
const m = new Mediator();

export const useMediator = (observables?: Observables[]):any => {
    
    const [values, setValues] = useState(getInitialValues(observables || null) || []);

    useEffect(() => {
        if (observables !== undefined) {
            const observablesWithCallbacks = getObservablesWithCallbacks({
                observables, setValueStateFunction: setValues, currentValueState: values,
            })
            observablesWithCallbacks!.forEach(observable => {
                m.subscribe(
                    {
                        id: thisInstanceId,
                        eventType: observable.eventType,
                        callback: observable.setStateFunction,
                    }
                )
            })
            return m.unsubscribeSubscriber(thisInstanceId);
        }
    }, []);

    if (!observables) {
        return (eventType: string, payload: any) => {
            m.emit({ eventType, payload })
        }
    }

    return values;
}
