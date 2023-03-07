import {createContext, useEffect, useState} from "react"

export const ConditionsCtx = createContext({})

export function ConditionsDataProvider({children}) {

    const [conditionData, setConditionData] = useState([])
    const [currentConditions, applyConditions] = useState([])

    function incrementConditionCount(condition) {
        if (condition.count != null && condition.count <= 8) {
            applyConditions([...currentConditions, condition])
        }
    }

    function decrementConditionCount(condition) {
        const index = currentConditions.findIndex(
            currentCondition => currentCondition.name === condition.name
        );
        if (index >= 0) {
            currentConditions.splice(index, 1)
            applyConditions(JSON.parse(JSON.stringify(currentConditions)))
        }
    }

    function addConditions(conditions) {
        const updatedConditions = conditions.map((condition) => {
            return conditionData[conditionData.findIndex(item => item.name.toLowerCase() === condition.toLowerCase())]
        })

       // const extraConditions =  updatedConditions.flatMap((con) => {
       //      return con.system?.rules.map((rule) => {
       //          console.log(rule.flag)
       //          if(rule.flag !== undefined) {
       //              return conditionData[conditionData.findIndex(item => item.name.toLowerCase() === rule.flag.toLowerCase())]
       //          }
       //      })
       //  })
       //
       //
       //  const cons = [...updatedConditions, ...extraConditions.filter(function( element ) {
       //      return element !== undefined;
       //  })]

        //TODO - For each condition in updatedConditions add any other conditions found in condition.system.rules.flag[]
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