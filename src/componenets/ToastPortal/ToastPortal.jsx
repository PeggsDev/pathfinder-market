import styles from './ToastPortal.scss'
import useToastPortal from "../hooks/useToastPortal";
import {createPortal} from "react-dom";
import {forwardRef, useImperativeHandle, useState} from "react";
import Toast from "../Toast/Toast";
import {v4 as uuid} from "uuid";

export const ToastPortal = forwardRef(
    ({autoClose, autoCloseTime}, ref) => {

        const [toasts, setToasts] = useState([])
        const {loaded, portalId} = useToastPortal()

        useImperativeHandle(ref, () => ({
            addToast(toast) {
                setToasts([...toasts, { ...toast, id: uuid() }])
            }
        }))

        function removeToast(id) {
            setToasts(toasts.filter(t => t.id !== id))
        }

        return loaded && createPortal(
            <div className={'styles-toast-container'}>
                {
                    toasts.map((t) => {
                        return (
                            <Toast
                                key={t.id}
                                mode={t.mode}
                                message={t.message}
                                onClose={() => removeToast(t.id)}/>
                        )
                    })
                }
            </div>, document.getElementById(portalId))
    })

export default ToastPortal