import './ACShield.scss'
import React from "react";
import {ReactComponent as Armor} from "../../svg/armor-class.svg";

export default function ACShield({armorClass}) {
    return (
        <div className={'ac-wrapper'}>
            <Armor className={'shield'}/>
            <h3 className={'title'}>ARMOR</h3>
            <input className={'modifier'}
                   type="text"
                   disabled="disabled"
                   placeholder="disabled"
                   value={armorClass}
                   readOnly/>
            <h3 className={'sub-title'}>CLASS</h3>
        </div>
    )
}