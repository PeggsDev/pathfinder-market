import './Conditions.scss'
import SearchableBox from "../../../../componenets/SearchableBox/SearchableBox";
import { ReactComponent as RemoveConditionIcon } from "../../../../componenets/icons/xmark-solid.svg";
import { useState } from 'react';

export default function Conditions({ conditionData, currentConditions, applyConditions }) {

    const [displayIcon, setDisplayIcon] = useState(false)

    function removeAndCountDuplicates(conditions) {


        //TODO - Clean up this function - its not clear what it does by variable names
        const answer = Object.values(conditions.reduce((p, v) => {
            const old = p[v.name];
            if (!old)
                p[v.name] = { ...v, count: 0 };
            else if (old.sort > v.sort)
                p[v.name] = { ...v, count: old.count + 1 };
            else
                p[v.name].count++;
            return p;
        }, {}));

        return answer
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
                addItems={applyConditions} />

            <div className={'current-conditions-wrapper'}>
                {removeAndCountDuplicates(currentConditions)?.map((condition, index) => {
                    return (
                        <div className={'current-condition'} onMouseLeave={() => setDisplayIcon(false)}>
                            {
                                displayIcon && <RemoveConditionIcon className={'remove-condition-icon'} />
                            }
                            <div
                                key={index}
                                className={'condition'}
                                onMouseOver={() => setDisplayIcon(true)}>
                                {condition.name}
                            </div>
                            <div className={'condition-count'}>{condition.count}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}