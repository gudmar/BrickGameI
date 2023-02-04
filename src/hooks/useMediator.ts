import { useCallback, useEffect, useState } from "react";
import { Mediator } from "../functions/Mediator";
import { getUUID } from "../functions/UUIDGenerator";

export interface Observables {
    eventType: string,
    initialValue: any,
    setStateFunctionGetter?: () => (payload:any) => {},
}

interface GetObservablesCallbacks {
    observables: Observables[] | null,
    setValueStateFunctionGetter: any,
    currentValueStateGetter: any,
}

interface GetCallback {
    index: number,
    currentValueStateGetter: any,
    setStateFunctionGetter: any,
}


const getInitialValues = (observables:Observables[] | null):any[] | null => {
        if (!observables) return null;
        return observables.map(
            ({initialValue}) => initialValue
        )
    }

const getCallback = ({ index, currentValueStateGetter, setStateFunctionGetter }: GetCallback) => {
    const cb = (payload: any) => {
        console.log('payload', payload)
        const valueStateCp = [...currentValueStateGetter()];
        console.log('STATE CP', valueStateCp)
        valueStateCp[index] = payload;
        const setStateFunction = setStateFunctionGetter();
        setStateFunction(valueStateCp);
    }
    return cb;
}

const getObservablesWithCallbacks = (
        { observables, setValueStateFunctionGetter, currentValueStateGetter }: GetObservablesCallbacks
    ) => {
    if (!observables) return null;
    const newObservables = observables.map((observable, index) => ({
            ...observable,
            setStateFunction: getCallback({index, currentValueStateGetter, setStateFunctionGetter: setValueStateFunctionGetter}),
        })
    );
    return newObservables;
}

const m = new Mediator();

export const useMediator = (observables?: Observables[]):any => {
    
    const [values, setValues] = useState(getInitialValues(observables || null) || []);


    
    useEffect(() => {
        const thisInstanceId = getUUID();
        if (observables !== undefined) {
            const observablesWithCallbacks = getObservablesWithCallbacks({
                observables, setValueStateFunctionGetter: () => setValues, currentValueStateGetter: () => values,
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
            
        }
        return () => { m.unsubscribeSubscriber(thisInstanceId);}
    }, [values, setValues]);

    useEffect(() => { console.log('VALUES CHANGED', values)}, [values])

    if (!observables) {
        return (eventType: string, payload: any) => {
            const m = new Mediator();
            console.log('SUBSCRIPTIONS', m.subscribtions)
            m.emit({ eventType, payload })
        }
    }

    return values;
}
