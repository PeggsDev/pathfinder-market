import './Conditions.scss'
import SearchableBox from "../../../../componenets/SearchableBox/SearchableBox";
import {ReactComponent as RemoveConditionIcon} from "../../../../componenets/icons/xmark-solid.svg";

export default function Conditions({conditionData, currentConditions, applyConditions}) {

    const reducedConditions = removeAndCountDuplicates(currentConditions)

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
            {/* Army Conditions: Attitudes: Friendly, Helpful, Hostile, Indifferent, Unfriendly
            Death and Dying: Doomed, Dying, Unconscious, Wounded
            Degrees of Detection: Hidden, Observed, Undetected, Unnoticed
            Lowered Abilities: Clumsy, Drained, Enfeebled, Stupefied
            Senses: Blinded, Concealed, Dazzled, Deafened, Invisible */}

            <SearchableBox
                placeHolder={'Search Conditions...'}
                data={conditionData}
                selectedItems={currentConditions}
                addItems={applyConditions}/>

            <div className={'current-conditions-wrapper'}>
                {reducedConditions?.map((condition, index) => {
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