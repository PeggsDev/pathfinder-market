import {createContext, useEffect, useState} from "react"

export const ConditionsCtx = createContext({})

export function ConditionsDataProvider({children}) {

    const [conditionData, setConditionData] = useState([])
    const [currentConditions, applyConditions] = useState([])

    function incrementConditionCount(condition) {
        console.log(JSON.stringify(condition))
        if (condition.count != null && condition.count <= 8) {
            applyConditions([...currentConditions, condition])
        }
    }

    function decrementConditionCount(condition) {
        const index = currentConditions.findIndex(
            currentCondition => currentCondition.name === condition.name
        );
        if(index >= 0) {
            currentConditions.splice(index, 1)
            applyConditions(JSON.parse(JSON.stringify(currentConditions)))
        }
    }

    function addConditions(conditions) {
        const updatedConditions = conditions.map((condition) => {
            return (
                conditionData[conditionData.findIndex(item => item.name.toLowerCase() === condition.toLowerCase())]
            )
        })

        //TODO - De-duplicate conditions with no count property
        applyConditions(JSON.parse(JSON.stringify([...currentConditions, ...updatedConditions])))
    } 

    function removeConditions(conditions) {
        
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
                addConditions,
                removeConditions,
                incrementConditionCount,
                decrementConditionCount,
                applyConditions
            }}>
            {children}
        </ConditionsCtx.Provider>
    )
}