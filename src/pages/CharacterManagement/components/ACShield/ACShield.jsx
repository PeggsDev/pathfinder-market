import './ACShield.scss'
import React from "react";
import { ReactComponent as Armor } from "../../svg/armor-class.svg";
import { calculateModifier } from '../../CharacterSheet';

//TODO - Figure this out as it needs a bunch of things that are currently missing
function calculateArmorClass(armor, dexCap, shield, dexterity, aditionalMods) {
    return (10 + armor + shield + calculateModifier(dexterity) + aditionalMods) - dexCap;
}

export default function ACShield(props) {
    const {
        armor,
        shield,
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
                        armor?.acBonus,
                        armor?.dexCap,
                        shield?.acBonus,
                        dexterity,
                        aditionalMods
                        )
                }
                readOnly />
            <h3 className={'sub-title'}>CLASS</h3>
        </div>
    )
}