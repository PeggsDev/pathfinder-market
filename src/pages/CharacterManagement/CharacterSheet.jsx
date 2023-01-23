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
            <input className={'score'}
                   type="text"
                   disabled="disabled"
                   placeholder="disabled"
                   value={score}
                   readOnly/>
        </div>
    )
}


function Skill({skill, proficiency}) {

    let proficiencyValue = proficiencyEnum[proficiency]

    return (
        <div className={'skill'}>

            <h3>{skill.toUpperCase()}</h3>
            <input className={'modifier'}
                   type="text"
                   disabled="disabled"
                   placeholder="disabled"
                   value={proficiencyValue > 0 ? "+" + proficiencyValue : '-'}
                   readOnly/>
            <ProficiencyIndicator proficiency={proficiency}
                                  skill={skill}/>
        </div>
    )
}

function ProficiencyIndicator({proficiency, skill}) {
    const proficiencyMap = ['T', 'E', 'M', 'L']

    return (
        <div className={'proficiency-indicator-block'}>
            {
                proficiencyMap.map((prof) => {
                    return (
                        <div className={'proficiency-indicator'}>
                            <div className={'proficiency-indicator-name'}> {prof} </div>
                            <input className={'proficiency-indicator-value'}
                                   type={'radio'}
                                   value={prof}
                                   name={skill}
                                   checked={prof === proficiency}/>
                        </div>
                    )
                })
            }
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
            "ability": 'charisma',
            "score": 0
        }],
        'skills': [{
            "id": '',
            "skill": '',
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
                <form className={'skills-block'}>
                    {
                        characterData.skills.map((skill) => {
                            return <Skill id={skill.id}
                                          skill={skill.skill}
                                          proficiency={skill.proficiencyLevel}/>
                        })
                    }
                </form>
            </div>
        </div>
    )
}