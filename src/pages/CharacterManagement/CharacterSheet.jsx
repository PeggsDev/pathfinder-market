import './CharacterSheet.scss'
import React, { useState } from "react";

import { ReactComponent as Armor } from "./svg/armor.svg";

const characterData = {
    'id':'gsrwe4tegdfg90d',
    'characterName': '',
    'playerName': '',
    'level': 1,
    'armorClass': 125,
    'experiencePoints': 800,
    'ancestry': '',
    'background':'',
    'abilityScores': [
        {
            'id': '1',
            'ability': 'strength',
            'score': 12
        },
        {
            'id': '2',
            'ability': 'dexterity',
            'score': 20
        },
        {
            'id': '3',
            'ability': 'constitution',
            'score': 8
        },
        {
            'id': '4',
            'ability': 'intelligence',
            'score': 14
        },
        {
            'id': '5',
            'ability': 'wisdom',
            'score': 16
        },
        {
            'id': '6',
            'ability': 'charisma',
            'score': 18
        }
    ]
}

function calculateModifier(value) {
    const modifier = Math.floor((value - 10) / 2)
    return modifier > 0 ? "+" + modifier : modifier.toString();
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

function Skill({ skill }) {
    const [score, setScore] = useState(10)
    return (
        <div className={'skill'}>
            <input className={'modifier'}
                type="text"
                disabled="disabled"
                placeholder="disabled"
                value={calculateModifier(score)}
                readOnly />
            <h3>{skill.toUpperCase()}</h3>
        </div>
    )
}

export default function CharacterSheet() {
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
                    {characterData.abilityScores.map((ability) => {
                        return <AbilityScore key={ability.id}
                            ability={ability.ability}
                            score={ability.score} />
                    })}
                </form>
            </div>
            <div className={'skill-modifiers'}>
                <h1>SKILLS</h1>
                <form className={'skills-block'}>
                    <Skill skill={'Acrobatics'} />
                    <Skill skill={'Arcana'} />
                    <Skill skill={'Athletics'} />
                </form>
            </div>
        </div>
    )
}