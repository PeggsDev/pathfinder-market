import './CharacterSheet.scss'
import React, {useEffect, useState} from "react";
import '../../componenets/SlidingCard/SlidingCard.scss'

import {ReactComponent as Armor} from "./svg/armor.svg";

const proficiencyEnum = {
    T: 2,
    E: 4,
    M: 6,
    L: 8
}

function calculateModifier(value) {
    const modifier = Math.floor((value - 10) / 2)
    return modifier > 0 ? "+" + modifier : modifier.toString();
}

function CharacterDetails(props) {
    return (
        <div className={'character-details'}>
            <img src={''} className={'character-profile-img'}/>
            <label>{props.characterName}</label>
        </div>
    )
}

function AbilityScore({ability, score}) {
    return (
        <div className={'ability'}>
            <h3>{ability.toUpperCase()}</h3>
            <input className={'modifier'}
                   type="text"
                   disabled="disabled"
                   placeholder="disabled"
                   value={calculateModifier(score)}
                   readOnly/>
        </div>
    )
}


function Skill({skill, proficiencyIndicator, baseAbility}) {

    let proficiencyValue = proficiencyEnum[proficiencyIndicator]

    return (
        <div className={'skill'}>
            <label className={'proficiency-indicator-label'}>
                {proficiencyIndicator}
            </label>
            <label className={'base-ability-label'}>
                {baseAbility}
            </label>
            <div className={'skill-box'}>
                <label className={'skill-label'}>
                    {skill}
                </label>
                <label className={'skill-modifier'}>
                    {proficiencyValue > 0 ? "+" + proficiencyValue : '-'}
                </label>
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
                const response = await fetch('http://localhost:3001/character/data');
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
                       readOnly/>
                <h3 className={'sub-title'}>CLASS</h3>
                <Armor className={'shield'}/>
            </div>
            <div className={'ability-scores'}>
                <h1>ABILITY SCORES</h1>
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
                <h1>SKILLS</h1>
                <form className={'skill-block'}>
                    {
                        characterData.skills.map((skill, index) => {
                            const baseAbility = characterData.abilityScores.find(item => item.ability === skill.ability)
                            return <Skill key={skill.id}
                                          skill={skill.skill}
                                          baseAbility={baseAbility.ability.slice(0, 3).toUpperCase()}
                                          proficiencyIndicator={skill.proficiencyLevel}/>
                        })
                    }
                </form>
            </div>
        </div>
    )
}