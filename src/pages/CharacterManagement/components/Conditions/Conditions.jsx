import './Conditions.scss'
import SearchableBox from "../../../../componenets/SearchableBox/SearchableBox";

export default function Conditions({conditionData, currentConditions, applyConditions}) {

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
                selectedItems={applyConditions}/>

            <div className={'current-conditions'}>
                {currentConditions?.map((condition, index) => {
                    return (
                        <div key={index} className={'condition'}>{condition.name}</div>
                    )
                })}
            </div>
        </div>
    )
}