import './Item.scss'

import {ReactComponent as DiceIcon} from '../../svg/dice-d20-solid.svg';
import {ReactComponent as SwordsIcon} from '../../svg/swords.svg';
import {ReactComponent as BowAndArrowIcon} from "../../svg/bow-and-arrow.svg";


//TODO - Pass in item data directly
export default function Item(props) {
    const {
        itemName,
        itemType,
        itemCategory,
        range,
        itemTraits,
        itemRarity,
        diceFormula
    } = props

    return (
        <div className={'item-component'}>
            {
                <>
                    {range && <BowAndArrowIcon className={'item-icon-svg'}/>}
                    {!range && <SwordsIcon className={'item-icon-svg'}/>}
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
                <div className={'action-dice-roll'}>
                    <DiceIcon className={'dice-icon'}/>
                </div>
                <div className={'dice-formula'}>
                    {diceFormula}
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