import './CharacterSheet.scss'
import React, { useEffect, useState } from "react";
import '../../componenets/SlidingCard/SlidingCard.scss'

import { ReactComponent as DiceIcon } from './svg/dice-d20-solid.svg';
import { ReactComponent as Armor } from "./svg/armor.svg";

const proficiencyEnum = {
    T: 2,
    E: 4,
    M: 6,
    L: 8
}

function calculateModifier(value) {
    return Math.floor((value - 10) / 2)
}

function calculateSkillModifier(baseAbilityScore, level, proficiency) {
    return calculateModifier(baseAbilityScore) + level + proficiency
}

function CharacterDetails(props) {
    return (
        <div className={'character-details'}>
            <img src={''} className={'character-profile-img'} />
            <label>{props.characterName}</label>
        </div>
    )
}

function AbilityScore({ ability, score }) {
    const modifier = (calculateModifier(score))
    return (
        <div className={'ability'}>
            <h3>{ability.toUpperCase()}</h3>
            <input className={'modifier'}
                type="text"
                disabled="disabled"
                placeholder="disabled"
                value={modifier > 0 ? "+" + modifier : modifier.toString()}
                readOnly />
        </div>
    )
}


function Skill({ skill, proficiencyIndicator, proficiencyValue, baseAbility, skillModifier }) {

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
                    <DiceIcon className={'dice-icon'} />
                </div>
                <div className={'skill-modifier'}>
                    <label>
                        {skillModifier > 0 ? "+" + skillModifier : '+0'}
                    </label>
                </div>
            </div>
        </div>
    )
}

export default function CharacterSheet() {
    const characterDto = {
        'id': '',
        'characterName': '',
        'playerName': '',
        'level': 0,
        'armorClass': 0,
        'experiencePoints': 0,
        'ancestry': '',
        'background': '',
        'traits': '',
        'abilityScores': [{
            "id": '',
            "ability": '',
            "score": 0
        }],
        'skills': [{
            "id": '',
            "skill": '',
            "ability": '',
            "proficiencyLevel": ''
        }]
    }

    const [characterData, setCharacterData] = useState(characterDto)

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:3001/character/3');
                const json = await response.json();
                setCharacterData(json)
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, []);

    return (
        <div className={'character-sheet'}>
            <div className={'armor-class'}>
                <h3 className={'title'}>ARMOR</h3>
                <input className={'modifier'}
                    type="text"
                    disabled="disabled"
                    placeholder="disabled"
                    value={characterData.armorClass}
                    readOnly />
                <h3 className={'sub-title'}>CLASS</h3>
                <Armor className={'shield'} />
            </div>
            <div className={'ability-scores'}>
                <h1>Ability Scores</h1>
                <form className={'score-block'}>
                    {
                        characterData.abilityScores.map((ability) => {
                            return <AbilityScore key={ability.id}
                                ability={ability.ability}
                                score={ability.score}
                            />
                        })
                    }
                </form>
            </div>
            <div className={'skill-modifiers'}>
                <h1>Skills</h1>
                <form className={'skill-block'}>
                    {
                        characterData.skills.map((skill, index) => {
                            const baseAbility = characterData.abilityScores.find(item => item.ability === skill.ability)
                            return <Skill key={skill.id}
                                skill={skill.skill}
                                baseAbility={baseAbility.ability.slice(0, 3).toUpperCase()}
                                proficiencyIndicator={skill.proficiencyLevel}
                                proficiencyValue={proficiencyEnum[skill.proficiencyLevel]}
                                skillModifier={
                                    calculateSkillModifier(
                                        baseAbility.score,
                                        characterData.level,
                                        proficiencyEnum[skill.proficiencyLevel]
                                    )
                                } />
                        })
                    }
                </form>
            </div>
        </div>
    )
}