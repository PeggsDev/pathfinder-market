import './CardComponent.scss'
import {ReactComponent as ShoppingBagIcon} from './icons/bag-shopping-solid.svg';
import {ReactComponent as ClosedLockIcon} from './icons/lock-solid.svg';
import {ReactComponent as OpenLockIcon} from "./icons/lock-open-solid.svg";

function checkOwnStatus({price}) {

}

export default function CardComponent(props) {
    const {imagePath, bookName, summary, price} = props;
    return (
        <div className={'card'}>
            <div className={'own-status'}>
                {(price === '£0') ? <OpenLockIcon /> : <ClosedLockIcon className={'lock-svg'}/>}
            </div>
            <div className={'front-section'}>
                <img className={'thumbnail'} src={imagePath} alt={''}/>
                <h3 className={'book-name'}>{bookName}</h3>
                <div className={'details-bar-front'}>
                    <p>{(price === '£0') ? 'FREE' : price}</p>
                </div>
            </div>
            <div className={'back-section'}>
                <h3 className={'book-name'}>{bookName}</h3>
                <p className={'summary'}>{summary}</p>
                 <button className={'card-button'}>
                     {(price === '£0') ? 'View' : 'View Details'}
                </button>
                <div className={'details-bar-back'}>
                    <p>{(price === '£0') ? 'FREE' : price}</p>
                    {(price === '£0') ? null : <ShoppingBagIcon/>}
                </div>
            </div>
            <div className={'background'}/>
        </div>
    )
}