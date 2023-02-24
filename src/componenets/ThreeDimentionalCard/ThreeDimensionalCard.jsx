import './ThreeDimensionalCard.scss'
import {FcGoogle} from "react-icons/fc";
import {AiFillApple} from "react-icons/ai";
import {GoogleAuthProvider, signInWithRedirect} from 'firebase/auth'
import {auth} from '../../config/firebase'
import {useRef, useState} from "react";

export default function ThreeDimensionalCard({title, subTitle, circleImage, image}) {

    const googleProvider = new GoogleAuthProvider()

    const [xAxis, setXAxis] = useState()
    const [yAxis, setYAxis] = useState()
    const [transition, setTransition] = useState('none')
    const [popImage, setPopImageAmount] = useState()
    const [popTitle, setPopTitleAmount] = useState()
    const [popButton, setPopButtonAmount] = useState()

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

    /* Animation Functions */
    function containerAnimation(event) {
        setXAxis((window.innerWidth / 2 - event.pageX) / 15)
        setYAxis((window.innerHeight / 2 - event.pageY) / 15)
    }

    function handleOnMouseEnter(event) {
        setTransition('none')

        setPopImageAmount(4)
        setPopTitleAmount(0.5)
        setPopButtonAmount(2)
    }

    function resetContainerAnimation(event) {
        setXAxis(0)
        setYAxis(0)

        setTransition('all 0.2s ease')
        setPopImageAmount(0)
        setPopTitleAmount(0)
        setPopButtonAmount(0)
    }

    return (
        <div className={'container'}
             onMouseMove={containerAnimation}
             onMouseEnter={handleOnMouseEnter}
             onMouseLeave={resetContainerAnimation}>
            <div className={'three-d-card'}
                 style={{
                     transform: `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`,
                     transition: `${transition}`
                 }}>
                <div className={'character'}>
                    {/*<img className={'background-circle'} src={circleImage}/>*/}
                    <img className={'goblin'} src={image} alt={title}
                         style={{
                             transform: `translateZ(${popImage}rem)`
                         }}/>
                </div>
                <div
                    className={'info'}
                    style={{transform: `translateZ(${popTitle}rem)`}}>
                    <h2 className={'title'}>
                        {title}
                    </h2>
                    <h3 className={'sub-title'}>
                        {subTitle}
                    </h3>
                </div>
                <button
                    className={'login-btn google'}
                    onClick={GoogleLogin}
                    style={{
                        transform: `translateZ(${popButton}rem)`
                    }}>
                    <FcGoogle className={'google-logo'}/>
                    Login with Google
                </button>
                <button className={'login-btn apple'}
                        onClick={AppleLogin}
                        style={{
                            transform: `translateZ(${popButton}rem)`
                        }}>
                    <AiFillApple className={'apple-logo'}/>
                    Login with Apple
                </button>
            </div>
        </div>
    )
}