import {createContext, useEffect, useState} from "react"

export const ConditionsCtx = createContext({})

export function ConditionsDataProvider({children}) {

    const [conditionData, setConditionData] = useState()
    const [currentConditions, applyConditions] = useState(new Set())

    function incrementConditionCount(condition) {
        console.log(condition)
        applyConditions(currentConditions => new Set([...currentConditions, condition]))
    }

    function decrementConditionCount(condition) {
        console.log(condition)
        applyConditions(currentConditions => new Set([...currentConditions].filter(x => x !== condition)))
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:3001/conditions');
                const json = await response.json();
                setConditionData(json)
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, []);

    return (
        <ConditionsCtx.Provider value={
            {
                conditionData,
                currentConditions,
                applyConditions,
                incrementConditionCount,
                decrementConditionCount
            }}>
            {children}
        </ConditionsCtx.Provider>
    )
}