import './Conditions.scss'
import SearchableBox from "../../../../componenets/SearchableBox/SearchableBox";
import {ReactComponent as RemoveConditionIcon} from "../../../../componenets/icons/xmark-solid.svg";
import {useContext, useState} from "react";
import {ConditionsCtx} from "../../../../contexts/ConditionsCtx";
import {FaMinus} from "react-icons/fa";
import {GoPlus} from "react-icons/go";

export default function Conditions() {

    const {
        conditionData,
        currentConditions,
        applyConditions,
        incrementConditionCount,
        decrementConditionCount
    } = useContext(ConditionsCtx)

    function compareByName(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0;
    }

    function removeAndCountDuplicates(conditions) {
        return Object.values(conditions.reduce((previous, current) => {
            const reducedConditions = previous[current.name];
            if (!reducedConditions)
                previous[current.name] = !current?.system.value.isValued ? {...current} : {...current, count: 1 };
            else if (reducedConditions.sort > current.sort)
                previous[current.name] = {...current, count: reducedConditions.count + 1};
            else
                previous[current.name].count++;
            return previous;
        }, {}));
    }

    return (
        <div className={'conditions-wrapper'}>

            <SearchableBox
                placeHolder={'Search Conditions...'}
                data={conditionData}
                selectedItems={currentConditions}
                addItems={applyConditions}/>

            <div className={'current-conditions-wrapper'}>
                {
                    removeAndCountDuplicates(currentConditions)?.sort(compareByName).map((condition, index) => {
                        return (
                            <div
                                key={index}
                                className={'current-condition'}>
                                {
                                    condition.count === 1 || condition.count == null ?
                                        <RemoveConditionIcon
                                            className={'remove-condition-icon'}
                                            onClick={() => decrementConditionCount(condition)}/>
                                        :
                                        <FaMinus
                                            className={'remove-condition-icon'}
                                            onClick={() => decrementConditionCount(condition)}/>
                                }
                                <div key={index} className={'condition'}>
                                    {condition.name}
                                </div>
                                {
                                    condition?.system.value.isValued &&
                                    <GoPlus
                                        onClick={() => incrementConditionCount(condition)}
                                        className={'increase-condition-count'}/>
                                }
                                <div className={'condition-count'}>
                                    {condition?.system.value.isValued ? condition.count : ''}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}