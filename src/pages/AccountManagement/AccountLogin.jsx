import './Account.scss'
import GoblinD20 from '../../images/goblin-d20.png'
import ThreeDimensionalCard from "../../componenets/ThreeDimentionalCard/ThreeDimensionalCard";

export default function AccountLogin() {
    return (
        <div className={'account-login-page'}>
            <ThreeDimensionalCard
                title={'Log into your Account'}
                subTitle={'Sign in with one of these providers'}
                cardType={'Sign in'}
                image={GoblinD20}
            />
        </div>
    )
}