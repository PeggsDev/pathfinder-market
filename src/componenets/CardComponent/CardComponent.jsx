import './CardComponent.css'
import {ReactComponent as ShoppingCartIcon} from './icons/shopping-cart.svg';
import {ReactComponent as LockIcon} from './icons/lock-solid.svg';


export default function CardComponent(props) {
    const {imagePath, bookName, summary, price} = props;
    return (
        <div className={'card'}>
            <div className={'own-status'}>
                <LockIcon className={'lock-sgv'}/>
            </div>
            <div className={'front-section'}>
                <img src={imagePath} alt={''}/>
                <h3 className={'book-name'}>{bookName}</h3>
                <div className={'details-bar'}>
                    <p>£{price}</p>
                    <ShoppingCartIcon />
                </div>
            </div>
            <div className={'back-section'}>
                <p>{summary}</p>
                <div className={'card-button-bar'}>
                    <button className={'card-button'}>
                        View Details
                    </button>
                    <ShoppingCartIcon />
                </div>
            </div>
        </div>
    )
}