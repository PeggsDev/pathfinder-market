import './Toast.scss'
import {useMemo} from "react";

export default function Toast({mode, onClose, message}) {

    const toastType = useMemo(() => {
        return 'mode'
    }, [mode])

    return (
        <div
            className={`toast ${toastType}`}
            onClick={onClose}>
            <div>
                {message}
            </div>
        </div>
    )
}