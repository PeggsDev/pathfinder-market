import './Conditions.scss'
import SearchableBox from "../../../../componenets/SearchableBox/SearchableBox";
import {ReactComponent as RemoveConditionIcon} from "../../../../componenets/icons/xmark-solid.svg";
import {useContext} from "react";
import {ConditionsCtx} from "../../../../contexts/ConditionsCtx";

export default function Conditions() {

   const  {conditionData, currentConditions, applyConditions} = useContext(ConditionsCtx)

    console.log(currentConditions)

    function compareByName( a, b ) {
        if ( a.name.toLowerCase() < b.name.toLowerCase() ){
            return -1;
        }
        if ( a.name.toLowerCase() > b.name.toLowerCase() ){
            return 1;
        }
        return 0;
    }

    function removeAndCountDuplicates(conditions) {
        return Object.values(conditions.reduce((previous, current) => {
            const reducedConditions = previous[current.name];
            if (!reducedConditions)
                previous[current.name] = {...current, count: 0};
            else if (reducedConditions.sort > current.sort)
                previous[current.name] = {...current, count: reducedConditions.count + 1};
            else
                previous[current.name].count++;
            return previous;
        }, {}));
    }

    function incrementConditionCount(condition) {
        if (condition.count <= 8) {
            applyConditions([...currentConditions, condition])
        }
    }

    function decrementConditionCount(condition) {
        const index = currentConditions.findIndex(
            currentCondition => currentCondition.name === condition.name
        );
        currentConditions.splice(index, 1)
        applyConditions(JSON.parse(JSON.stringify(currentConditions)))
    }

    return (
        <div className={'conditions-wrapper'}>

            <SearchableBox
                placeHolder={'Search Conditions...'}
                data={conditionData}
                selectedItems={currentConditions}
                addItems={applyConditions}/>

            <div className={'current-conditions-wrapper'}>
                {removeAndCountDuplicates(currentConditions)?.sort(compareByName).map((condition, index) => {
                    return (
                        <div
                            key={index}
                            className={'current-condition'}>
                            <RemoveConditionIcon
                                className={'remove-condition-icon'}
                                onClick={() => decrementConditionCount(condition)}/>
                            <div key={index} className={'condition'}
                                 onClick={() => incrementConditionCount(condition)}>
                                {condition.name}
                            </div>
                            <div className={'condition-count'}>
                                {condition.count === 0 ? '' : condition.count}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}