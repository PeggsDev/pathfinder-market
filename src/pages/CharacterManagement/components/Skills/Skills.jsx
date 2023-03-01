import './Skills.scss'
import { proficiencyEnum, proficiencyColourEnum, proficiencies, abilities } from "../../../../App";
import { calculateAbilityBasedModifier } from "../../CharacterSheet";
import { ReactComponent as DiceIcon } from '../../svg/dice-d20-solid.svg';

import { IDieType } from "dddice-js";
import { rollDice } from "../../../../App";
import { useState } from "react";
import { FaFeatherAlt } from "react-icons/fa";
import CustomSelect from "../../../../componenets/CustomSelect/CustomSelect";

export default function Skills(props) {

    const { characterData, skills, skillsCallback, diceClient, refreshData } = props

    const [showManageLore, setManageLoreStatus] = useState(false)

    const [loreTitle, setLoreTitle] = useState('')
    const [loreAbility, setLoreAbility] = useState()
    const [loreProficiency, setLoreProficiency] = useState()

    function compareBySkill(a, b) {
        if (a.skill.toLowerCase() < b.skill.toLowerCase()) {
            return -1;
        }
        if (a.skill.toLowerCase() > b.skill.toLowerCase()) {
            return 1;
        }
        return 0;
    }

    function addLore(title, ability, proficiency) {
        skillsCallback([...skills,
        {
            "type": "Lore",
            "skill": title,
            "ability": ability,
            "proficiencyLevel": proficiency
        }])

    }

    function Skill({ type, skill, proficiencyIndicator, baseAbility, skillModifier, diceClient }) {

        return (<div className={'skill-box'}>
            <div className={'skill-title-proficiency'}>
                <div className={'proficiency-indicator'}>
                    <label style={{ color: `${proficiencyColourEnum[proficiencyIndicator]}` , filter: 'brightness(250%)'}}>
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
                    <label className={'skill-label-wrapper'}
                        style={{
                            fontStyle: type === '' ? '' : 'italic',
                            color: type === '' ? '' : 'var(--clr-dice-roll-hover)'
                        }}>
                        {type !== '' && <FaFeatherAlt />}
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
        <>
            <div className={'skill-block-header'}>
                <div className={'skill-block-titles'}>
                    <div className={'skill-title-proficiency'}>PROF</div>
                    <div className={'skill-title-ability'}>BASE</div>
                    <div className={'skill-title-skill'}>SKILL</div>
                    <div className={'skill-title-bonus title'}>BONUS</div>
                </div>
            </div>
            <div className={`skill-block  ${showManageLore ? 'show' : ''}`}>
                <div className={'skills'}>
                    {skills?.sort(compareBySkill).map((skill, index) => {
                        const baseAbility = characterData?.abilityScores.find(item => item.ability === skill.ability)
                        return (
                            <Skill
                                key={index}
                                diceClient={diceClient}
                                type={skill?.type !== `Lore` ? '' : skill?.type}
                                skill={skill?.skill}
                                baseAbility={baseAbility?.ability.slice(0, 3).toUpperCase()}
                                proficiencyIndicator={skill?.proficiencyLevel}
                                skillModifier={calculateAbilityBasedModifier(baseAbility?.score, characterData?.level, proficiencyEnum[skill?.proficiencyLevel])} />
                        )
                    })}
                </div>
            </div>
            <div className={'lore-wrapper'}>
                <div className={`lore-skill-panel ${showManageLore ? 'show' : ''}`}>
                    <CustomSelect
                        placeHolder={'Ability'}
                        data={abilities}
                        onSelectItem={setLoreAbility} />
                    <CustomSelect
                        placeHolder={'Proficiency'}
                        data={proficiencies}
                        onSelectItem={setLoreProficiency} />
                    <input className={'lore-skill-title'}
                        onChange={(event) => setLoreTitle(event.target.value)} />
                    <div className='lore-skill-buttons'>
                        <button
                            className={'lore-skill-save-btn'}
                            onClick={() => addLore(loreTitle, loreAbility, loreProficiency)}>
                            save
                        </button>
                        <button
                            className={'lore-skill-save-btn'}
                            onClick={() => setManageLoreStatus(!showManageLore)}>
                            Close
                        </button>
                    </div>
                </div>
                {
                    !showManageLore && <div className='manage-lore' onClick={() => setManageLoreStatus(!showManageLore)}>
                        Manage Lore
                    </div>
                }
            </div>
        </>
    )
}
//onCLick push content up using transalte