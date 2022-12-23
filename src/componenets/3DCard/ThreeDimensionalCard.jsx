import './ThreeDimensionalCard.scss'
import Character from '../../images/3d-card-pathfinder-character.png'

export default function ThreeDimensionalCard() {
    return (
        <div className={'container'}>
            <div className={'card'}>
                <div className={'character'}>
                    <img src={Character} alt={'a character image'}/>
                </div>
                <div className={'info'}>
                    <h3 className={'title'}>Create Your Character</h3>
                </div>
            </div>
        </div>
    )
}