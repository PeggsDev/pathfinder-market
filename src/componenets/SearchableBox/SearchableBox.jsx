import './SearchableBox.scss'
import {ReactComponent as SearchIcon} from "../icons/magnifying-glass-solid.svg";
import {ReactComponent as ClearSearchIcon} from "../icons/xmark-solid.svg";

export default function SearchableBox({placeHolder, data, selectedItems}) {
    return (
        <div className={'search-box'}>
            <div className={'search-input-wrapper'}>
                <SearchIcon className={'search-icon'}/>
                <input className={'search-input'} type={'text'} placeholder={placeHolder}/>
                <ClearSearchIcon className={'clear-search-icon'}/>
            </div>
            <div className={'search-results'}>
            </div>
        </div>
    )
}