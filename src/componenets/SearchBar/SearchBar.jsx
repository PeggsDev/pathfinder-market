import './SearchBar.scss'
import {ReactComponent as XMarkIcon} from "../icons/xmark-solid.svg";
import {ReactComponent as SearchIcon} from "../icons/magnifying-glass-solid.svg";


export default function SearchBar({isVisible, setVisibility}) {

    return (
        <div className={`search-container ${isVisible ? '' : 'hide'}`}>
            <SearchIcon className={'link-search'}/>
            <div className={'search-bar'}>
                <form action={''}>
                    <input type={'text'} placeholder={'Search Everything...'}/>
                </form>
            </div>
            <XMarkIcon className={`link-close`} onClick={() => setVisibility(!isVisible)}/>
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
