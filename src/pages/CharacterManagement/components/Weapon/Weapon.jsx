import './Weapon.scss'

import {ReactComponent as DiceIcon} from '../../svg/dice-d20-solid.svg';
import {ReactComponent as SwordsIcon} from '../../svg/swords.svg';

export default function Weapon(props) {
    const {weaponName, weaponType, weaponTraits} = props
    return (
        <div className={'weapon-component'}>
            <SwordsIcon className={'sword-icon-svg'}/>
            <div className={'weapon'}>
                <div className={'weapon-name'}>{weaponName}</div>
                <div className={'weapon-type'}>{weaponType}</div>
            </div>
            <div className={'weapon-traits'}>
                {weaponTraits}
            </div>
        </div>
    )
}