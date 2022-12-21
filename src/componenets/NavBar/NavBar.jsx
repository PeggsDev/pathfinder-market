import './NavBar.scss'

import {ReactComponent as HomeIcon} from "./icons/house-solid.svg";
import {ReactComponent as SearchIcon} from "./icons/magnifying-glass-solid.svg";
import {ReactComponent as ShoppingBagIcon} from "./icons/bag-shopping-solid.svg";
import {useState} from "react";
import {ReactComponent as XMarkIcon} from "./icons/xmark-solid.svg";

export default function NavBar() {
    const [isHidden, setHidden] = useState(false);

    function SearchBox() {
        return (
            <div className={`search-container ${isHidden ? '' : 'hide'}`}>
                <SearchIcon className={'link-search'}/>
                <div className={'search-bar'}>
                    <form action={''}>
                        <input type={'text'} placeholder={'Search Everything...'}/>
                    </form>
                </div>
                <XMarkIcon className={`link-close`} onClick={() => setHidden(!isHidden)}/>
                <div className={'quick-links'}>
                    <h2>Quick Links</h2>
                    <ul>
                        <li>
                            <a href={'#'}>Rules</a>
                        </li>
                        <li>
                            <a href={'#'}>Books</a>
                        </li>
                        <li>
                            <a href={'#'}>Campaigns</a>
                        </li>
                        <li>
                            <a href={'#'}>Characters</a>
                        </li>
                        <li>
                            <a href={'#'}>Homebrew</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className={'nav-container'}>
            <nav className={`${isHidden ? 'hide' : ''}`}>
                <ul id={'primary-navigation'} className={'primary-navigation'}>
                    <li>
                        <a href={'#'}>
                            <HomeIcon clssName={'inglorious-logo'}/>
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
                            Market Place
                        </a>
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
            <SearchBox />
            <div className={`overlay ${isHidden ? 'show' : ''}`} onClick={() => setHidden(!isHidden)} />
        </div>
    )
}