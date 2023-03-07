import './ACSection.scss'
import React, {useContext, useEffect} from "react";
import {ReactComponent as Armor} from "../../svg/armor-class.svg";
import {ArmorClassCtx} from "../../../../contexts/ArmorClassCtx";
import {ConditionsCtx} from "../../../../contexts/ConditionsCtx";
import {proficiencyColourEnum} from "../../../../App";

export default function ACSection() {

    const {
        armorClass,
        dexBonus,
        dexCap,
        applyACModifier,
        removeACModifier,
        acProficiencies
    } = useContext(ArmorClassCtx)

    const {
        currentConditions,
        conditionData
    } = useContext(ConditionsCtx)

    //TODO - Look to move this to some kind of Conditions Service
    useEffect(() => {
        applyConditionModifier(conditionData.find(item => item.name.toLowerCase() === 'flat-footed'))
        applyConditionModifier(conditionData.find(item => item.name.toLowerCase() === 'fatigued'))
        applyConditionModifier(conditionData.find(item => item.name.toLowerCase() === 'unconscious'))
    }, [currentConditions])

    function applyConditionModifier(condition){
        const modifier = condition?.system.rules[0].value
        if (currentConditions.some(item => item.name.toLowerCase() === condition.name.toLowerCase())) {
            applyACModifier(modifier)
        } else {
            removeACModifier(modifier)
        }
    }
    /* -------------- END OF TODO -------------------*/
    return (
        <>
            <div className={'ac-section'}>
                <div className={'ac-shield'}>
                    <div className={'ac-wrapper'}>
                        <Armor className={'shield'}/>
                        <input className={'modifier'}
                               type="text"
                               disabled="disabled"
                               placeholder="disabled"
                               value={armorClass}
                               readOnly/>
                    </div>
                </div>
                <div className={'ac-stats'}>
                                <span className={'armor-class-stat'}>
                                    <div className={'armor-class-stat title'}>
                                        ITEM
                                    </div>
                                    <div className={'armor-class-stat value'}>
                                        +1
                                    </div>
                                </span>
                    <span className={'armor-class-stat'}>
                                    <div className={'armor-class-stat title'}>
                                        DEX
                                    </div>
                                    <div className={'armor-class-stat value'}>
                                        {dexBonus >= 0 ? '+' + dexBonus : '-'}
                                    </div>
                                </span>
                    <span className={'armor-class-stat'}>
                                    <div className={'armor-class-stat title'}>
                                        DEX CAP
                                    </div>
                                    <div className={'armor-class-stat value'}>
                                        {dexCap >= 0 ? '+' + dexCap : '-'}
                                    </div>
                                </span>
                    <span className={'armor-class-stat'}>
                                    <div className={'armor-class-stat title'}>
                                        PROF
                                    </div>
                                    <div className={'armor-class-stat value'}>
                                        +3
                                    </div>
                                </span>
                </div>
            </div>
            <div className={'armor-proficiencies'}>
                {acProficiencies?.map((armorType, index) => {
                    return (
                        <div className={'armor-proficiency-box'} key={index}>
                            <div className={'armor-type'}>{armorType?.armorType}</div>
                            <div className={'armor-proficiency'} style={
                                {color: `${proficiencyColourEnum[armorType?.proficiencyLevel]}`, filter: 'brightness(250%)'}
                            }>
                                {armorType?.proficiencyLevel}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}