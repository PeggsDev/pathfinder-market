import './Login.scss'

export default function Login() {
    return (
        <div className={'login-page'}>
            <div>
                <h2>Log into your Account</h2>
                <div>
                    <h3>Sign in with one of these providers</h3>
                </div>
                <div>
                    <button>Sign in with Google</button>
                </div>
            </div>
        </div>
    )
}