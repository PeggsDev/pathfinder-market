import './CharacterSheet.scss'
import React, {useEffect, useState} from "react";

function calculateModifier(value) {
    let modifier = Math.floor((value - 10) / 2)
    return modifier > 0 ? "+" + modifier : modifier.toString();
}

function AbilityScore({ability}) {
    const [score, setScore] = useState(10)
    return (
        <div className={'ability'}>
            <label className={'modifier'}>
                <h3>{(ability.substring(0, 3)).toUpperCase()}</h3>
                <h4>MODIFIER</h4>
                <input type="text" value={calculateModifier(score)} onChange={() => {
                }}/>
            </label>
            <label className={'score'}>
                <h3>{ability.toUpperCase()}</h3>
                <h4>SCORE</h4>
                <input type="text" value={score} onChange={(event) => setScore(event.target.value)}/>
            </label>
        </div>
    )
}

export default function CharacterSheet() {
    return (
        <div className={'character-sheet'}>
            <div className={'ability-scores'}>
                <h1>ABILITY SCORES</h1>
                <form className={'score-block'}>
                    <AbilityScore ability={'strength'}/>
                    <AbilityScore ability={'dexterity'}/>
                    <AbilityScore ability={'Constitution'}/>
                    <AbilityScore ability={'Intelligence'}/>
                    <AbilityScore ability={'Wisdom'}/>
                    <AbilityScore ability={'Charisma'}/>
                </form>
            </div>
        </div>
    )
}