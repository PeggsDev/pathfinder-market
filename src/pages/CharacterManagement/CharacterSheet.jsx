import './CharacterSheet.scss'
import React, { useEffect, useState } from "react";

import { ReactComponent as Armor } from "./svg/armor.svg";

function calculateModifier(value) {
    const modifier = Math.floor((value - 10) / 2)
    return modifier > 0 ? "+" + modifier : modifier.toString();
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
    return (
        <div className={'ability'}>
            <h3>{ability.toUpperCase()}</h3>
            <input className={'modifier'}
                type="text"
                disabled="disabled"
                placeholder="disabled"
                value={calculateModifier(score)}
                readOnly />
            <input className={'score'}
                type="text"
                disabled="disabled"
                placeholder="disabled"
                value={score}
                readOnly />
        </div>
    )
}

function Skill({ skill, modifier }) {
    return (
        <div className={'skill'}>
            <input className={'modifier'}
                type="text"
                disabled="disabled"
                placeholder="disabled"
                value={modifier > 0 ? "+" + modifier : modifier.toString()}
                readOnly />
            <h3>{skill.toUpperCase()}</h3>
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
        'abilityScores': [],
        'skills': []
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
                    readOnly />
                <h3 className={'sub-title'}>CLASS</h3>
                <Armor className={'shield'} />
            </div>
            <div className={'ability-scores'}>
                <h1>ABILITY SCORES</h1>
                <form className={'score-block'}>
                    {
                        characterData.abilityScores.map((ability) => {
                            return <AbilityScore key={ability.id}
                                ability={ability.ability}
                                score={ability.score} />
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
                                modifier={skill.proficiencyLevel} />
                        })
                    }
                </form>
            </div>
        </div>
    )
}