import './Account.scss'
import GoblinPyro from '../../images/goblin-pyro.png'
import CircleImage from '../../images/parallax-background.png'
import ThreeDimensionalCard from "../../componenets/ThreeDimentionalCard/ThreeDimensionalCard";

export default function AccountLogin() {
    return (
        <div className={'account-login-page'}>
            <ThreeDimensionalCard
                title={'Log into your Account'}
                subTitle={'Sign in with one of these providers'}
                circleImage={CircleImage}
                image={GoblinPyro}
            />
        </div>
    )
}