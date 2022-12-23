import './ThreeDimensionalCard.scss'

export default function ThreeDimensionalCard({ title, image }) {
    return (
        <div className={'container'}>
            <div className={'card'}>
                <div className={'character'}>
                    <img src={image} alt={title} />
                </div>
                <div className={'info'}>
                    <h3 className={'title'}>{title}</h3>
                </div>
            </div>
        </div>
    )
}