import './ACShield.scss'
import React from "react";
import { ReactComponent as Armor } from "../../svg/armor-class.svg";
import { calculateModifier } from '../../CharacterSheet';

//TODO - Figure this out as it needs a bunch of things that are currently missing
function calculateArmorClass(armorBonus, shieldBonus, dexterity, aditionalMods) {
    return 10 + armorBonus + shieldBonus + calculateModifier(dexterity) + aditionalMods;
}

export default function ACShield(props) {
    const {
        armorBonus,
        shieldBonus,
        dexterity,
        aditionalMods
    } = props


    return (
        <div className={'ac-wrapper'}>
            <Armor className={'shield'} />
            <h3 className={'title'}>ARMOR</h3>
            <input className={'modifier'}
                type="text"
                disabled="disabled"
                placeholder="disabled"
                value={
                    calculateArmorClass(
                        armorBonus,
                        shieldBonus,
                        dexterity,
                        aditionalMods)
                }
                readOnly />
            <h3 className={'sub-title'}>CLASS</h3>
        </div>
    )
}