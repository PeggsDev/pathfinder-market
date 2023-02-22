import './NavBar.scss'

import {ReactComponent as HomeIcon} from "./icons/house-solid.svg";
import {ReactComponent as SearchIcon} from "./icons/magnifying-glass-solid.svg";
import {ReactComponent as ShoppingBagIcon} from "./icons/bag-shopping-solid.svg";
import {useState} from "react";
import {Link} from 'react-router-dom'
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
    const [isHidden, setHidden] = useState(false);

    return (
        <div className={'nav-container'}>
            <nav className={`${isHidden ? 'hide' : ''}`}>
                <ul id={'primary-navigation'} className={'primary-navigation'}>
                    <li>
                        <a href={'#'}>
                            <Link to={'/'}>
                                <HomeIcon className={'inglorious-logo'}/>
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
                        <a href={'#'}>
                            Tools
                        </a>
                    </li>
                    <li>
                        <a href={'#'}>
                            Marketplace
                        </a>
                    </li>
                    <li>
                        <Link to={'/login'}>
                            <a>Login</a>
                        </Link>
                    </li>
                    <li>
                        <a href={'#'}>
                            <SearchIcon onClick={() => setHidden(!isHidden)}/>
                        </a>
                    </li>
                    <li>
                        <a href={'#'}>
                            <ShoppingBagIcon/>
                        </a>
                    </li>
                </ul>
            </nav>
            <SearchBar isVisible={isHidden} setVisibility={setHidden}/>
            <div className={`overlay ${isHidden ? 'show' : ''}`} onClick={() => setHidden(!isHidden)}/>
        </div>
    )
}