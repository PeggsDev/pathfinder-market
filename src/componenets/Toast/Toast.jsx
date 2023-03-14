import './Toast.scss'
import {useMemo} from "react";

export default function Toast({type, onClose, title, message}) {

    const toastType = useMemo(() => {
        return 'type'
    }, [type])

    return (
        <div
            className={`toast ${toastType}`}
            onClick={onClose}>
            <div className={'toast-title'}>
                {title}
            </div>
            <div className={'toast-message'} dangerouslySetInnerHTML={{__html: `${message}`}}/>
        </div>
    )
}