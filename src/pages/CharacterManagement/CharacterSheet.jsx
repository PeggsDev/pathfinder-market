import './CharacterSheet.scss'
import React, {useState} from "react";

import { ReactComponent as Armor } from "./svg/armor.svg";

let abilityScoreData = [
    {
        'id': '1',
        'ability': 'strength',
        'score': '14'
    },
    {
        'id': '2',
        'ability': 'dexterity',
        'score': '20'
    },
    {
        'id': '3',
        'ability': 'Constitution',
        'score': '8'
    },
    {
        'id': '4',
        'ability': 'Intelligence',
        'score': '14'
    },
    {
        'id': '5',
        'ability': 'Wisdom',
        'score': '16'
    },
    {
        'id': '6',
        'ability': 'Charisma',
        'score': '18'
    }
]

function calculateModifier(value) {
    let modifier = Math.floor((value - 10) / 2)
    return modifier > 0 ? "+" + modifier : modifier.toString();
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

function Skill({skill}) {
    const [score, setScore] = useState(10)
    return (
        <div className={'skill'}>
            <input className={'modifier'}
                   type="text"
                   disabled="disabled"
                   placeholder="disabled"
                   value={calculateModifier(score)}
                   readOnly/>
            <h3>{skill.toUpperCase()}</h3>
        </div>
    )
}

export default function CharacterSheet() {
    return (
        <div className={'character-sheet'}>
            <div className={'armor-class'}>
                <Armor className={'shield'} />
                <h3>ARMOR</h3>
                <input className={'modifier'}
                       type="text"
                       disabled="disabled"
                       placeholder="disabled"
                       value={10}
                       readOnly/>
                <h3>CLASS</h3>
            </div>
            <div className={'ability-scores'}>
                <h1>ABILITY SCORES</h1>
                <form className={'score-block'}>
                    {abilityScoreData.map((ability) => {
                        return <AbilityScore key={ability.id}
                                             ability={ability.ability}
                                             score={ability.score}/>
                    })}
                </form>
            </div>
            <div className={'skill-modifiers'}>
                <h1>SKILLS</h1>
                <form className={'skills-block'}>
                    <Skill skill={'Acrobatics'}/>
                    <Skill skill={'Arcana'}/>
                    <Skill skill={'Athletics'}/>
                </form>
            </div>
        </div>
    )
}