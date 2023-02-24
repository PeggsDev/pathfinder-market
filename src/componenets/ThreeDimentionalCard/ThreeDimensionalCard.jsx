import './ThreeDimensionalCard.scss'
import {FcGoogle} from "react-icons/fc";
import {AiFillApple} from "react-icons/ai";
import {GoogleAuthProvider, signInWithRedirect} from 'firebase/auth'
import {auth} from '../../config/firebase'



export default function ThreeDimensionalCard({title, subTitle, circleImage, image}) {

    const googleProvider = new GoogleAuthProvider()

    /* Sign in with Google */
    async function GoogleLogin() {
        try {
            await signInWithRedirect(auth, googleProvider)
        } catch (error) {
            console.log(error)
        }
    }

    /* Sign in with Apple */
    async function AppleLogin() {
        try {
            //const result = await signInWithRedirect(auth, googleProvider)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={'container'}>
            <div className={'three-d-card'}>
                <div className={'character'}>
                    {/*<img className={'background-circle'} src={circleImage}/>*/}
                    <img className={'goblin'} src={image} alt={title}/>
                </div>
                <div className={'info'}>
                    <h2 className={'title'}>{title}</h2>
                    <h3 className={'sub-title'}>{subTitle}</h3>
                </div>
                <button className={'login-btn google'} onClick={GoogleLogin}>
                    <FcGoogle className={'google-logo'}/>
                    Login with Google
                </button>
                <button className={'login-btn apple'} onClick={AppleLogin}>
                    <AiFillApple className={'apple-logo'}/>
                    Login with Apple
                </button>
            </div>
        </div>
    )
}