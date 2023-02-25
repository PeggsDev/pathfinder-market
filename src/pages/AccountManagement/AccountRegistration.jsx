import './Account.scss'
import Goblin from '../../images/Goblin_GoblinWarrior.png'
import CircleImage from '../../images/parallax-background.jpg'
import ThreeDimensionalCard from "../../componenets/ThreeDimentionalCard/ThreeDimensionalCard";

export default function AccountRegistration() {
    return (
        <div className={'account-registration-page'}>
            <ThreeDimensionalCard
                title={'Creat an Account'}
                subTitle={'Create with one of these popular providers'}
                circleImage={CircleImage}
                image={Goblin}
            />
        </div>
    )
}