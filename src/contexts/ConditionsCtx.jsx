import {createContext, useEffect, useState} from "react"

export const ConditionsCtx = createContext({})

export function ConditionsDataProvider({children}) {

    const [conditionData, setConditionData] = useState([])
    const [currentConditions, applyConditions] = useState([])

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
        <ConditionsCtx.Provider value={{conditionData, currentConditions, applyConditions}}>
            {children}
        </ConditionsCtx.Provider>
    )
}