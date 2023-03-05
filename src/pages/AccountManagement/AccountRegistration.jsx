import './Account.scss'
import Goblin from '../../images/Goblin-Jugler.png'
import ThreeDimensionalCard from "../../componenets/ThreeDimentionalCard/ThreeDimensionalCard";

export default function AccountRegistration() {
    return (
        <div className={'account-registration-page'}>
            <ThreeDimensionalCard
                title={'Create an Account'}
                subTitle={'Signup with one of these popular providers'}
                cardType={'Signup'}
                image={Goblin}
            />
        </div>
    )
}