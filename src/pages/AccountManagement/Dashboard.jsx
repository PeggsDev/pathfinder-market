import './Dashboard.scss'
import {auth} from '../../config/firebase'

export default function Dashboard() {
    async function GoogleLogOut() {
        try {
            await auth.signOut()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button className={'sign-out-button'} onClick={GoogleLogOut}>Log Out</button>
    )
}