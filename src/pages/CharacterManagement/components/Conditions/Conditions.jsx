import './Conditions.scss'

export default function Conditions(props) {

    const {conditions} = props    
    
    return (
        <div className={'death-saves-wrapper'}>
            {/* Army Conditions: Attitudes: Friendly, Helpful, Hostile, Indifferent, Unfriendly
            Death and Dying: Doomed, Dying, Unconscious, Wounded
            Degrees of Detection: Hidden, Observed, Undetected, Unnoticed
            Lowered Abilities: Clumsy, Drained, Enfeebled, Stupefied
            Senses: Blinded, Concealed, Dazzled, Deafened, Invisible */}

            {conditions?.map((condition, index) => {
                    return (
                        <div key={index} className={'condition'}>{condition.name}</div>
                    )
                })}
        </div>
    )
}