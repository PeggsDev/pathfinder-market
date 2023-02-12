import './Skills.scss'
import { proficiencyEnum } from "../../../../App";
import { calculateAbilityBasedModifier } from "../../CharacterSheet";
import { ReactComponent as DiceIcon } from '../../svg/dice-d20-solid.svg';

import { IDieType } from "dddice-js";
import { rollDice } from "../../../../App";

export default function Skills({ characterData, diceClient }) {

    function Skill({ skill, proficiencyIndicator, baseAbility, skillModifier, diceClient }) {

        return (<div className={'skill-box'}>
            <div className={'skill-title-proficiency'}>
                <div className={'proficiency-indicator'}>
                    <label>
                        {proficiencyIndicator}
                    </label>
                </div>
            </div>
            <div className={'skill-title-ability'}>
                <div className={'base-ability'}>
                    <label className={'base-ability-label'}>
                        {baseAbility}
                    </label>
                </div>
            </div>
            <div className={'skill'}>
                <div className={'skill-name'}>
                    <label>
                        {skill}
                    </label>
                </div>
                <div className={'skill-dice-roll'}>
                    <DiceIcon className={'dice-icon'} onClick={() => {
                        rollDice(
                            diceClient,
                            IDieType.D20,
                            1,
                            'dddice-old-school')
                    }} />
                </div>
                <div className={'skill-title-bonus'}>
                    <div className={'skill-modifier'}>
                        <label>
                            {skillModifier > 0 ? "+" + skillModifier : '+0'}
                        </label>
                    </div>
                </div>
            </div>
        </div>)
    }

    return (
        <form className={'skill-block'}>
            <div className={'skill-block-titles'}>
                <div className={'skill-title-proficiency'}>PROF</div>
                <div className={'skill-title-ability'}>BASE</div>
                <div className={'skill-title-skill'}>SKILL</div>
                <div className={'skill-title-bonus title'}>BONUS</div>
            </div>
            {characterData?.skills.map((skill, index) => {
                const baseAbility = characterData?.abilityScores.find(item => item.ability === skill.ability)
                return (
                    <Skill
                        key={index}
                        diceClient={diceClient}
                        skill={skill?.skill}
                        baseAbility={baseAbility?.ability.slice(0, 3).toUpperCase()}
                        proficiencyIndicator={skill?.proficiencyLevel}
                        skillModifier={calculateAbilityBasedModifier(baseAbility?.score, characterData?.level, proficiencyEnum[skill?.proficiencyLevel])} />
                )
            })}
            <div>
                <div className='skill-block manage-skills'>Manage Lore</div>
            </div>
        </form>
    )
}