import './Login.scss'
import {FcGoogle} from "react-icons/fc";
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {auth} from '../config/firebase'

export default function Login() {
    /* Sign in with Google */
    const googleProvider = new GoogleAuthProvider()

    async function GoogleLogin() {
        try {
            const result = await signInWithPopup(auth, googleProvider)
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
                    <button onClick={GoogleLogin}>
                        <FcGoogle/>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    )
}