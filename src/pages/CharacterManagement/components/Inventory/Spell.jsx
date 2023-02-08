import './Spell.scss'

import {ReactComponent as DiceIcon} from '../../svg/dice-d20-solid.svg';
import {ReactComponent as SpellIcon} from '../../svg/wand-sparkles-solid.svg';

import {IDieType} from "dddice-js";
import {rollDice} from "../../../../App";

//TODO - Pass in item data directly
export default function Spell(props) {
    const {
        spellName,
        spellSchool,
        spellType,
        castTime,
        components,
        damageType,
        range,
        spellTraits,
        die,
        dieCount,
        diceClient
    } = props

    return (
        <div className={'spell-component'}>

            <div className={'attack-dice-roll'}>
                <SpellIcon
                    className={'spell-icon-svg'}
                    onClick={() => rollDice(
                        diceClient,
                        IDieType.D20,
                        dieCount,
                        'dddice-old-school')}/>
            </div>

            <div className={'action'}>
                <div className={'spell-title-box'}>
                    <div className={'spell-name'}>{spellName}</div>
                    <div className={'spell'}>
                        <div className={'spell-school'}>{spellSchool}</div>
                        <div className={'spell-type'}>{spellType}</div>
                    </div>

                    <div className={'spell-cast-time'}>{castTime}</div>
                </div>
            </div>
            <div className={'dice'}>
                <div className={'action-damage-dice-roll'}>
                    <DiceIcon
                        onClick={() => rollDice(
                            diceClient,
                            die,
                            dieCount,
                            'dddice-old-school')}
                        className={'dice-icon'}/>
                </div>
                <div className={'dice-formula'}>
                    {dieCount + die}
                </div>
                <div className={'damage-type'}>
                    {damageType}
                </div>
            </div>
            <div className={'spell-range'}>
                {range}
            </div>
            <div className={'spell-traits'}>
                {spellTraits?.map((trait) => {
                    return (
                        <span className={'spell-trait'}>{trait}</span>
                    )
                })}
            </div>
        </div>
    )
}