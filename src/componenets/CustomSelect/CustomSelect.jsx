import './CustomSelect.scss'
import {ReactComponent as SearchIcon} from "../icons/magnifying-glass-solid.svg";
import {ReactComponent as ClearSearchIcon} from "../icons/xmark-solid.svg";
import {useState} from "react";

export default function CustomSelect({placeHolder, data, onSelectItem}) {

    const [isActive, setStatus] = useState(false)
    const [selectedItem, setSelected] = useState()

    function addSelectedItem(item) {
        setSelected(item.label)
        onSelectItem(item.value)
        setStatus(false)
    }

    function clearInput() {
        setStatus(false)
        setSelected('')
    }

    return (
        <div className={'custom-select'}>
            <div className={'custom-select-input-wrapper'}>
                <input
                    className={'custom-select-input'}
                    type={'text'}
                    placeholder={placeHolder}
                    onClick={() => setStatus(true)}
                    value={selectedItem}/>
                <ClearSearchIcon
                    className={'clear-custom-select-icon'}
                    onClick={clearInput}/>
            </div>
            {
                isActive &&
                <div className={'custom-select-results'}>
                    {data?.map((item, index) => {
                        return (
                            <span>
                                <p className={'search-item'}
                                   key={index}
                                   onClick={() => addSelectedItem(item)}>
                                    {item.label}
                                </p>
                            </span>
                        )
                    })}
                </div>
            }
        </div>
    )
}