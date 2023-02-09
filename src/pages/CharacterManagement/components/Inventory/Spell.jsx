import './Spell.scss'

import {ReactComponent as DiceIcon} from '../../svg/dice-d20-solid.svg';
import {ReactComponent as SpellIcon} from '../../svg/wand-sparkles-solid.svg';

import {rollDice} from "../../../../App";

//TODO - Pass in item data directly
export default function Spell(props) {
    const {
        spellName,
        spellSchool,
        spellType,
        castTime,
        spellSave,
        components,
        damageType,
        range,
        spellTraditions,
        die,
        dieCount,
        diceClient
    } = props

    return (
        <div className={'spell-component'}>
            <div className={'attack-dice-roll'}>
                <SpellIcon
                    className={'spell-icon-svg'}
                    onClick={() => {
                        //TODO - Add functionality to burn a spell slot
                        {
                           console.log("Spell has been cast")
                        }
                    }}/>
            </div>

            <div className={'spell'}>
                <div className={'spell-title-box'}>
                    <div className={'spell-name'}>{spellName}</div>
                    <div className={'spell-info'}>
                        <div className={'spell-school'}>{spellSchool}</div>
                        <div className={'spell-type'}>{spellType}</div>
                    </div>
                </div>
                 {/* TODO - Review this, we should look to pull values from ActionEnum */}
                <div className={'spell-cast-time'}
                     style={{
                         fontFamily: castTime.match(/^[a-zA-Z0-9]+$/) ? 'Pathfinder2eActions' : 'sans-serif',
                         fontSize: castTime.match(/^[a-zA-Z0-9]+$/) ? '1.3rem' : '0.9rem'
                     }}>
                    {castTime}
                </div>
                <div className={'spell-save'}>
                    {spellSave}
                </div>
            </div>
            {
                damageType && <div className={'dice'}>
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
                </div>
            }
            <div className={'damage-type'}>
                {damageType}
            </div>
            <div className={'spell-range'}>
                {range}
            </div>
            <div className={'spell-traits'}>
                {spellTraditions?.map((trait) => {
                    return (
                        <span className={'spell-trait'}>{trait}</span>
                    )
                })}
            </div>
        </div>
    )
}