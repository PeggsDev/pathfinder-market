import './SourceBookDetails.scss'
import BookBackgroundImg from '../img/sources-page-background.jpg'
import CoreRulebookImg from '../img/pathfinder-2e-core-rulebook.jpg';

export default function SourceBookDetailsPage() {

    return (
        <div>
            <img src={BookBackgroundImg} alt={'book-background'}/>
            <img src={CoreRulebookImg}/>
        </div>
    )
}