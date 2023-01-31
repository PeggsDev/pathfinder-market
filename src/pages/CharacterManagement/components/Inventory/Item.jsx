import './Item.scss'

import {ReactComponent as DiceIcon} from '../../svg/dice-d20-solid.svg';
import {ReactComponent as SwordsIcon} from '../../svg/swords.svg';
import {ReactComponent as BowAndArrowIcon} from "../../svg/bow-and-arrow.svg";
import {IDieType} from "dddice-js";
import {rollDice} from "../../../../App";

//TODO - Pass in item data directly
export default function Item(props) {
    const {
        itemName,
        itemType,
        itemCategory,
        range,
        itemTraits,
        itemRarity,
        die,
        dieCount,
        diceClient
    } = props

    return (
        <div className={'item-component'}>
            {
                <>
                    {range && <BowAndArrowIcon
                        className={'item-icon-svg'}
                        onClick={() => rollDice(
                            diceClient,
                            IDieType.D20,
                            dieCount,
                            'dddice-old-school')}/>}
                    {!range && <SwordsIcon
                        className={'item-icon-svg'}
                        onClick={() => rollDice(
                            diceClient,
                            IDieType.D20,
                            dieCount,
                            'dddice-old-school')}/>}
                </>
            }
            <div className={'action'}>
                <div className={'item-title-box'}>
                    <div className={'item-name'}>{itemName}</div>
                    <div className={'item'}>
                        <div className={'item-category'}>{itemCategory}</div>
                        <div className={'item-type'}>{itemType}</div>
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
            <div className={'item-traits'}>
                {itemRarity}
            </div>
            <div className={'item-traits'}>
                {itemTraits}
            </div>
        </div>
    )
}