import './Account.scss'
import Goblin from '../../images/Goblin_GoblinWarrior.png'
import ThreeDimensionalCard from "../../componenets/ThreeDimentionalCard/ThreeDimensionalCard";

export default function AccountRegistration() {
    return (
        <div className={'account-registration-page'}>
            <ThreeDimensionalCard
                title={'Creat an Account'}
                subTitle={'Signup with one of these popular providers'}
                cardType={'Signup'}
                image={Goblin}
            />
        </div>
    )
}