import './Conditions.scss'
import SearchableBox from "../../../../componenets/SearchableBox/SearchableBox";
import { ReactComponent as RemoveConditionIcon } from "../../../../componenets/icons/xmark-solid.svg";

export default function Conditions({ conditionData, currentConditions, applyConditions }) {

    //TODO implement this in the 
    // function removeAndCountDuplicates() {
    //     const data = [
    //         { typeId: 1, sort: 1, name: "Test1" },
    //         { typeId: 2, sort: 1, name: "Test2" },
    //         { typeId: 1, sort: 2, name: "Test3" },
    //         { typeId: 3, sort: 1, name: "Test4" },
    //     ];

    //     const answer = Object.values(data.reduce((p, v) => {
    //         const old = p[v.typeId];
    //         if (!old)
    //             p[v.typeId] = { ...v, count: 1 };
    //         else if (old.sort > v.sort)
    //             p[v.typeId] = { ...v, count: old.count + 1 };
    //         else
    //             p[v.typeId].count++;
    //         return p;
    //     }, {}));

    //     console.log(answer);
    // }

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
                {currentConditions?.map((condition, index) => {
                    return (
                        <div className={'current-conditions'}>
                            <RemoveConditionIcon className={'remove-condition-icon'} />
                            <div key={index} className={'condition'}>{condition.name}</div>
                            <div className={'condition-count'}>{condition.count}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}