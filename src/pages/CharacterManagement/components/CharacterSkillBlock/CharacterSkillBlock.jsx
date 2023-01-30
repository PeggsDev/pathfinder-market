import {proficiencyEnum} from "../../../../App";
import {calculateSkillModifier} from "../../CharacterSheet";
import {ReactComponent as DiceIcon} from '../../svg/dice-d20-solid.svg';

export default function CharacterSkillBlock({characterData}) {

    function Skill({skill, proficiencyIndicator, baseAbility, skillModifier, diceClient}) {

        return (
            <div className={'skill-box'}>
                <div className={'proficiency-indicator'}>
                    <label>
                        {proficiencyIndicator}
                    </label>
                </div>
                <div className={'base-ability'}>
                    <label className={'base-ability-label'}>
                        {baseAbility}
                    </label>
                </div>
                <div className={'skill'}>
                    <div className={'skill-name'}>
                        <label>
                            {skill}
                        </label>
                    </div>
                    <div className={'skill-dice-roll'}>
                        <DiceIcon className={'dice-icon'}/>
                    </div>
    
                    <div classame={'skill-modifier'}>
                        <label>
                            {skillModifier > 0 ? "+" + skillModifier : '+0'}
                        </label>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <form className={'skill-block'}>
        <div className={'skill-block-titles'}>
            <div className={'skill-title-proficiency'}>PROF</div>
            <div className={'skill-title-ability'}>BASE</div>
            <div className={'skill-title-skill'}>SKILL</div>
            <div className={'skill-title-bonus'}>BONUS</div>
        </div>
        {
            characterData?.skills.map((skill) => {
                const baseAbility = characterData?.abilityScores.find(item => item.ability === skill.ability)
                return <Skill key={skill?.id}
                              skill={skill?.skill}
                              baseAbility={baseAbility?.ability.slice(0, 3).toUpperCase()}
                              proficiencyIndicator={skill?.proficiencyLevel}
                              skillModifier={
                                  calculateSkillModifier(
                                      baseAbility?.score,
                                      characterData?.level,
                                      proficiencyEnum[skill?.proficiencyLevel]
                                  )}
                />
            })
        }
    </form>
    )
}