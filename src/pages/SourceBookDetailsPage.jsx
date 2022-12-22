import './SourceBookDetails.scss'
import BookBackgroundImg from '../img/sources-page-background.jpg'
import CoreRulebookImg from '../img/pathfinder-2e-core-rulebook.jpg';

export default function SourceBookDetailsPage() {

    return (
        <div className={'details-container'}>
            <img className={'book-background'} src={BookBackgroundImg} alt={'book-background'}/>
            <img className={'book-image'} src={CoreRulebookImg}/>
        </div>
    )
}