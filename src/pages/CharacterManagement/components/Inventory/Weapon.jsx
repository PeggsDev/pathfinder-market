import './Weapon.scss'

import {ReactComponent as DiceIcon} from '../../svg/dice-d20-solid.svg';
import {ReactComponent as SwordsIcon} from '../../svg/swords.svg';
import {ReactComponent as BowAndArrowIcon} from "../../svg/bow-and-arrow.svg";
import {IDieType} from "dddice-js";
import {rollDice} from "../../../../App";

//TODO - Pass in item data directly
export default function Weapon(props) {
    const {
        weaponName,
        weaponType,
        weaponCategory,
        weaponRange,
        weaponTraits,
        weaponRarity,
        die,
        dieCount,
        diceClient
    } = props

    return (
        <div className={'weapon-component'}>

            <div className={'attack-dice-roll'}>
                {weaponRange && <BowAndArrowIcon
                    className={'weapon-icon-svg'}
                    onClick={() => rollDice(
                        diceClient,
                        IDieType.D20,
                        1,
                        'dddice-old-school')}/>}
                {!weaponRange && <SwordsIcon
                    className={'weapon-icon-svg'}
                    onClick={() => rollDice(
                        diceClient,
                        IDieType.D20,
                        1,
                        'dddice-old-school')}/>}
            </div>

            <div className={'action'}>
                <div className={'weapon-title-box'}>
                    <div className={'weapon-name'}>{weaponName}</div>
                    <div className={'weapon'}>
                        <div className={'weapon-category'}>{weaponCategory}</div>
                        <div className={'weapon-type'}>{weaponType}</div>
                    </div>
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
                <div className={'action-count-icon'}/>
            </div>
            <div className={'weapon-rarity'}>
                {weaponRarity}
            </div>
            <div className={'weapon-traits'}>
                {weaponTraits?.map((trait, index) => {
                    return (
                        <span className={'weapon-trait'} key={index}>{trait}</span>
                    )
                })}
            </div>
        </div>
    )
}