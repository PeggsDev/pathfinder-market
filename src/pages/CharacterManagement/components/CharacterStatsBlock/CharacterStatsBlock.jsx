import './CharacterStatsBlock.scss'
import { GiCampfire } from "react-icons/gi";
import React from "react";
import { proficiencyEnum, proficiencyColourEnum, proficiencies } from "../../../../App";
import { calculateModifier } from "../../CharacterSheet";

export default function CharacterStatsBlock(props) {

    const { characterData } = props
    const keyAbility = characterData?.abilityScores.find(ability => ability.isKey === true)
    const classDCProficiencyIndicator = characterData?.classDC.proficiencyLevel
    const perceptionProficiencyIndicator = characterData?.perception.proficiencyLevel
    const wisdom = characterData?.abilityScores.find(ability => ability.ability === 'wisdom')

    const perception = calculatePerception(
        characterData?.abilityScores.find(ability => ability.ability === 'wisdom')?.score,
        perceptionProficiencyIndicator
    )

    // const proficiency = proficiencies.find(proficiency => proficiency.value === proficiencyIndicator)?.label

    function calculateClassDC(abilityScore, proficiency, level) {
        return (10 + calculateModifier(abilityScore) + proficiencyEnum[proficiency] + level)
    }

    function calculatePerception(wisdom, proficiency) {
        return (calculateModifier(wisdom) + proficiencyEnum[proficiency])
    }
    return (
        <>
            <div className={'character-stat-block-wrapper'}>
                {/* <div className={'rest-button'}>
                    <GiCampfire className={'rest-button-svg'} />
                    <h4 className={'rest-label'}>
                        Take a Rest
                    </h4>
                </div> */}
                <div className={'stat-block-wrapper'}>
                    <div className={'stat-block-label'}>
                        Speed
                    </div>
                    <div className={'stat-block-stat'}>
                        <div className={'stat-block-stat-value'}>
                            {characterData?.speed}
                        </div>
                        <div className={'stat-block-stat-unit'}>
                            ft
                        </div>
                    </div>
                </div>
                <div className={'stat-block-wrapper'}>
                    <div className={'stat-block-label'}>
                        Class DC
                    </div>
                    <div className={'stat-block-stat class-dc'}>
                        <div className={'stat-block-stat-value'}>
                            {calculateClassDC(keyAbility?.score, classDCProficiencyIndicator, characterData?.level)}
                        </div>
                    </div>
                    <div className={'stat-block-stat-unit-wrapper'}>
                        <div className={'stat-block-stat-unit title'}>
                            PROF
                        </div>
                        <div className={'stat-block-stat-unit indicator'}
                            style={{ color: `${proficiencyColourEnum[classDCProficiencyIndicator]}`, filter: 'brightness(250%)' }}>
                            {classDCProficiencyIndicator}
                        </div>
                        <div className={'stat-block-stat-unit ability'}>
                            {keyAbility?.ability.slice(0, 3).toUpperCase()}
                        </div>
                    </div>
                </div>
                <div className={'stat-block-wrapper'}>
                    <div className={'stat-block-label'}>
                        Perception
                    </div>
                    <div className={'stat-block-stat class-dc'}>
                        <div className={'stat-block-stat-value'}>
                            {perception >= 0 ? "+" + perception : '-' + perception}
                        </div>
                    </div>
                    <div className={'stat-block-stat-unit-wrapper'}>
                        <div className={'stat-block-stat-unit title'}>
                            PROF
                        </div>
                        <div className={'stat-block-stat-unit indicator'}
                            style={{ color: `${proficiencyColourEnum[perceptionProficiencyIndicator]}`, filter: 'brightness(250%)' }}>
                            {perceptionProficiencyIndicator}
                        </div>
                        <div className={'stat-block-stat-unit ability'}>
                            {wisdom?.ability.slice(0, 3).toUpperCase()}
                        </div>
                    </div>
                </div>
                {/* <div>
                    Initiative
                </div> */}
            </div>
            {/* <div className={'languages'}>
                Languages:
                {
                    characterData?.languages.map((language, index) => {
                        return <div className={'language'} key={index}>{language.language}</div>
                    })
                }
            </div> */}
        </>
    )
}