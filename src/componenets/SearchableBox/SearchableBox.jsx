import './SearchableBox.scss'
import {ReactComponent as SearchIcon} from "../icons/magnifying-glass-solid.svg";
import {ReactComponent as ClearSearchIcon} from "../icons/xmark-solid.svg";
import {useState} from "react";

export default function SearchableBox({placeHolder, data, selectedItems, addItems}) {

    const [filteredData, setFilteredData] = useState([])
    const [searchItem, setSearchItem] = useState('')
    const [selected, setSelected] = useState([])

    function addSelectedItem(item) {
        setSelected([...selected, item])
        addItems(JSON.parse(JSON.stringify(selected)))
    }

    function handleFilter(event) {
        const searchTerm = event.target.value
        setSearchItem(searchTerm)
        const filterResult = data.filter((item) => {
            return item.name.toLowerCase().includes(searchItem.toLowerCase())
        })
        searchItem === '' ? setFilteredData([]) : setFilteredData(filterResult)
    }

    function clearInput() {
        setFilteredData([])
        setSearchItem('')
    }

    return (
        <div className={'search-box'}>
            <div className={'search-input-wrapper'}>
                <SearchIcon className={'search-icon'}/>
                <input
                    className={'search-input'}
                    type={'text'}
                    placeholder={placeHolder}
                    onChange={handleFilter}
                    value={searchItem}/>
                <ClearSearchIcon
                    className={'clear-search-icon'}
                    onClick={clearInput}
                />
            </div>
            {
                filteredData.length !== 0 && <div className={'search-results'}>
                    {filteredData?.map((item, index) => {
                        return (
                            <span>
                                <p
                                    className={'search-item'}
                                    key={index}
                                    onClick={() => addSelectedItem(item)}>
                                    {item.name}
                                </p>
                        </span>
                        )
                    })}
                </div>
            }
        </div>
    )
}