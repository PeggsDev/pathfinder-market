import './ACShield.scss'
import React from "react";
import { ReactComponent as Armor } from "../../svg/armor-class.svg";
import { calculateModifier } from '../../CharacterSheet';

//TODO - Attach a context of some kind to subscribe to changes that affect AC i.e. new Armor
function calculateArmorClass(armor, dexCap, shield, dexterity, additionalMods) {
    return (10 + armor + shield + calculateModifier(dexterity) + additionalMods) - dexCap;
}

export default function ACShield(props) {
    const {
        armor,
        shield,
        dexterity,
        additionalMods
    } = props


    return (
        <div className={'ac-wrapper'}>
            <Armor className={'shield'} />
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
                        additionalMods
                        )
                }
                readOnly />
        </div>
    )
}