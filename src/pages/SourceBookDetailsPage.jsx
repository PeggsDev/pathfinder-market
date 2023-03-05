import './SourceBookDetails.scss'
import BookBackgroundImg from '../images/sources-page-background.jpg'
import CoreRulebookImg from '../images/pathfinder-2e-core-rulebook.jpg';

export default function SourceBookDetailsPage() {

    return (
        <div className={'details-container'}>
            <img className={'book-background'} src={BookBackgroundImg} alt={'book-background'}/>
            <img className={'book-image'} src={CoreRulebookImg}/>
        </div>
    )
}