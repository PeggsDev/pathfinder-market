import './Skills.scss'
import {proficiencyEnum, proficiencyColourEnum} from "../../../../App";
import {calculateAbilityBasedModifier} from "../../CharacterSheet";
import {ReactComponent as DiceIcon} from '../../svg/dice-d20-solid.svg';

import {IDieType} from "dddice-js";
import {rollDice} from "../../../../App";

export default function Skills(props) {

    const {characterData, skills, skillsCallback, diceClient, refreshData} = props

    function addLore() {
        skillsCallback([...skills,
            {
                "skill": "Lore",
                "ability": "dexterity",
                "proficiencyLevel": "T"
            }
        ])
        console.log('LORE ADDED')
        console.log(JSON.stringify(skills))
    }

    function Skill({skill, proficiencyIndicator, baseAbility, skillModifier, diceClient}) {

        return (<div className={'skill-box'}>
            <div className={'skill-title-proficiency'}>
                <div className={'proficiency-indicator'}>
                    <label style={
                        {color: `${proficiencyColourEnum[proficiencyIndicator]}`}
                    }>
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
                            'pink-skull-leddyaze')
                    }}/>
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
        <>
            <form className={'skill-block'}>
                <div className={'skill-block-titles'}>
                    <div className={'skill-title-proficiency'}>PROF</div>
                    <div className={'skill-title-ability'}>BASE</div>
                    <div className={'skill-title-skill'}>SKILL</div>
                    <div className={'skill-title-bonus title'}>BONUS</div>
                </div>
                {skills?.map((skill, index) => {
                    const baseAbility = characterData?.abilityScores.find(item => item.ability === skill.ability)
                    return (
                        <Skill
                            key={index}
                            diceClient={diceClient}
                            skill={skill?.skill}
                            baseAbility={baseAbility?.ability.slice(0, 3).toUpperCase()}
                            proficiencyIndicator={skill?.proficiencyLevel}
                            skillModifier={calculateAbilityBasedModifier(baseAbility?.score, characterData?.level, proficiencyEnum[skill?.proficiencyLevel])}/>
                    )
                })}
            </form>
            <div>
                <div className={'lore-wrapper'}>
                    <div className='manage-lore' onClick={() => addLore()}>
                        Add Lore
                    </div>
                    <div className={'plus-symbol'}>
                        +
                    </div>
                </div>
            </div>
        </>
    )
    //.sort((a, b) => a.itemM > b.itemM ? 1 : -1)
}