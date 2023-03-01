import './Weapon.scss'

import { ReactComponent as DiceIcon } from '../../svg/dice-d20-solid.svg';
import { ReactComponent as SwordsIcon } from '../../svg/swords.svg';
import { ReactComponent as BowAndArrowIcon } from "../../svg/bow-and-arrow.svg";
import { IDieType } from "dddice-js";
import { rollDice } from "../../../../App";
import { GiSaberSlash, GiHammerBreak, GiPiercedHeart } from 'react-icons/gi'

//TODO - Pass in item data directly
export default function Weapon(props) {
    const {
        weaponName,
        weaponType,
        weaponCategory,
        weaponRange,
        weaponTraits,
        weaponRarity,
        damageType,
        keyAbility,
        die,
        dieCount,
        diceClient
    } = props

    const damageTypeEnum = {
        S: <GiSaberSlash />,
        B: <GiHammerBreak />,
        P: <GiPiercedHeart />
    }
    return (
        <div className={'weapon-component'}>

            <div className={'attack-dice-roll'}>
                {weaponRange && <BowAndArrowIcon
                    className={'weapon-icon-svg'}
                    onClick={() => rollDice(
                        diceClient,
                        IDieType.D20,
                        1,
                        'pink-skull-leddyaze')} />}
                {!weaponRange && <SwordsIcon
                    className={'weapon-icon-svg'}
                    onClick={() => rollDice(
                        diceClient,
                        IDieType.D20,
                        1,
                        'pink-skull-leddyaze')} />}
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
            {/* <div className={'to-hit-dice-formula'}>
                {die + keyAbility}
            </div> */}
            <div className={'dice'}>
                <div className={'action-damage-dice-roll'}>
                    <DiceIcon
                        onClick={() => rollDice(
                            diceClient,
                            die,
                            dieCount,
                            'pink-skull-leddyaze')}
                        className={'dice-icon'} />
                </div>
                <div className={'dice-formula'}>
                    {dieCount + die + " "}
                    <div className={'damage-type-icons'}>
                        {damageTypeEnum[damageType?.charAt(0).toUpperCase()]}
                    </div>
                </div>
                <div className={'action-count-icon'} />
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
        </div >
    )
}