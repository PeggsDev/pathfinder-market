import './SearchableBox.scss'
import {ReactComponent as SearchIcon} from "../icons/magnifying-glass-solid.svg";
import {ReactComponent as ClearSearchIcon} from "../icons/xmark-solid.svg";
import {useState} from "react";

export default function SearchableBox({placeHolder, data, selectedItems, addItems}) {

    const [filteredData, setFilteredData] = useState([])
    const [searchItem, setSearchItem] = useState()
    const [selected, setSelected] = useState([])

    function addSelectedItem(item) {
        const selectedItem = [...selected, item]
        setSelected(selectedItem)
        addItems(selectedItem)
    }

    function handleFilter(event) {
        const searchTerm = event.target.value
        const filterResult = data.filter((item) => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase())
        })

        searchTerm === '' ? setFilteredData([]) : setFilteredData(filterResult)
        setSearchItem(searchTerm)
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