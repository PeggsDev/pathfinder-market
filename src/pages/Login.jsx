import './Login.scss'
import {FcGoogle} from "react-icons/fc";
import {BsTwitch} from "react-icons/bs";
import {GoogleAuthProvider, signInWithRedirect} from 'firebase/auth'
import {auth} from '../config/firebase'

export default function Login() {
    /* Sign in with Google */
    const googleProvider = new GoogleAuthProvider()

    async function GoogleLogin() {
        try {
            const result = await signInWithRedirect(auth, googleProvider)
            console.log(result.user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={'login-page'}>
            <div>
                <h2>Log into your Account</h2>
                <div>
                    <h3>Sign in with one of these providers</h3>
                </div>
                <div>
                    <button className={'login-btn google'} onClick={GoogleLogin}>
                        <FcGoogle className={'google-logo'}/>
                        Login with Google
                    </button>
                    {/*<button className={'login-btn twitch'} onClick={GoogleLogin}>*/}
                    {/*    <BsTwitch className={'twitch-logo'}/>*/}
                    {/*    Login with Twitch*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    )
}