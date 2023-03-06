import './ACShield.scss'
import React, {useContext, useEffect} from "react";
import {ReactComponent as Armor} from "../../svg/armor-class.svg";
import {ArmorClassCtx} from "../../../../contexts/ArmorClassCtx";
import {ConditionsCtx} from "../../../../contexts/ConditionsCtx";

export default function ACShield({}) {

    const {
        armorClass,
        dexBonus,
        applyModifier,
        removeModifier,
    } = useContext(ArmorClassCtx)

    const {
        currentConditions,
    } = useContext(ConditionsCtx)

    useEffect(() => {
        if (currentConditions.some(condition => condition.name.toLowerCase() === 'flat-footed')) {
            applyModifier(-dexBonus)
        } else {
            removeModifier(-dexBonus)
        }
    },[currentConditions])

    return (
        <div className={'ac-wrapper'}>
            <Armor className={'shield'}/>
            <input className={'modifier'}
                   type="text"
                   disabled="disabled"
                   placeholder="disabled"
                   value={armorClass}
                   readOnly/>
        </div>
    )
}