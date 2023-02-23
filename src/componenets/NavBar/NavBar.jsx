import './NavBar.scss'

import { ReactComponent as HomeIcon } from "./icons/house-solid.svg";
import { ReactComponent as SearchIcon } from "./icons/magnifying-glass-solid.svg";
import { ReactComponent as ShoppingBagIcon } from "./icons/bag-shopping-solid.svg";
import { useState } from "react";
import { Link } from 'react-router-dom'
import SearchBar from "../SearchBar/SearchBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../config/firebase'

export default function NavBar() {
    const [isHidden, setHidden] = useState(false);
    const [user, loading] = useAuthState(auth)

    return (
        <div className={'nav-container'}>
            <nav className={`${isHidden ? 'hide' : ''}`}>
                <ul id={'primary-navigation'} className={'primary-navigation'}>
                    <li>
                        <a href={'#'}>
                            <Link to={'/'}>
                                <HomeIcon className={'inglorious-logo'} />
                            </Link>
                        </a>
                    </li>
                    <li>
                        <a href={'#'}>
                            Collections
                        </a>
                    </li>
                    <li>
                        <a href={'#'}>
                            Game Rules
                        </a>
                    </li>
                    <li>
                        <a href={'#'}>
                            Books
                        </a>
                    </li>
                    <li>
                        <a href={'#'}>
                            New Player Guide
                        </a>
                    </li>
                    <li>
                        <Link to={'/goblins-cauldron/character-sheet/gsrwe4tegdfg90d#'}>
                            Tools
                        </Link>
                    </li>
                    <li>
                        <a href={'#'}>
                            Marketplace
                        </a>
                    </li>
                    <li>
                        <a href={'#'}>
                            <SearchIcon onClick={() => setHidden(!isHidden)} />
                        </a>
                    </li>
                    <li>
                        <a href={'#'}>
                            <ShoppingBagIcon />
                        </a>
                    </li>
                </ul>
                {!user && (
                    <Link to={'/auth/login'} className={'nav-bar-login-btm'}>
                        Login
                    </Link>
                )}
                {user && (
                    <Link to={'/dashboard'}>
                        <img
                            className={'nav-bar-login-img'} src={user.photoURL}
                            alt={'avatar'}
                            referrerPolicy={'no-referrer'} />
                    </Link>
                )}
            </nav>
            <SearchBar isVisible={isHidden} setVisibility={setHidden} />
            <div className={`overlay ${isHidden ? 'show' : ''}`} onClick={() => setHidden(!isHidden)} />
        </div>
    )
}