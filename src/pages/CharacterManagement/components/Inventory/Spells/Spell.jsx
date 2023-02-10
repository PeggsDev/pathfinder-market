import './Spell.scss'

import {ReactComponent as DiceIcon} from '../../../svg/dice-d20-solid.svg';
import {ReactComponent as SpellIcon} from '../../../svg/wand-sparkles-solid.svg';

import {rollDice} from "../../../../../App";

//TODO - Pass in item data directly
export default function Spell({spell, diceClient}) {

    const spellDamage = spell.system.damage?.value[0]
    const damageDiceArray = spellDamage?.value.split('d');
    const damageDiceCount = damageDiceArray?.[0]
    const damageDieType = 'd' + damageDiceArray?.[1];

    const spellSave = spell.system.save?.value
    const castTime = spell?.system?.time?.value

    const die = damageDieType
    const dieCount = damageDiceCount

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
                    <div className={'spell-name'}>{spell.name}</div>
                    <div className={'spell-info'}>
                        <div className={'spell-school'}>{spell.system.school?.value}</div>
                        <div className={'spell-type'}>{spell.system.spellType?.value}</div>
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
                spellDamage?.type?.value ?
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
                    </div>
                    : <div className={'dice'}/>
            }
            <div className={'damage-type'}>
                {spellDamage?.type?.value}
            </div>
            <div className={'spell-range'}>
                {spell.system?.range.value}
            </div>
            <div className={'spell-traits'}>
                {spell.system.traditions?.value?.map((trait) => {
                    return (
                        <span className={'spell-trait'}>{trait}</span>
                    )
                })}
            </div>
        </div>
    )
}