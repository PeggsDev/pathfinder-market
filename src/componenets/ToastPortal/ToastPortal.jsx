import useToastPortal from "../hooks/useToastPortal";
import {createPortal} from "react-dom";
import Toast from "../Toast/Toast";
import {useContext} from "react";
import {ToastPortalCtx} from "../../contexts/ToastPortalCtx";

export default function ToastPortal() {
    const {
        toasts,
        removeToast
    } = useContext(ToastPortalCtx)

    const {loaded, portalId} = useToastPortal()

    return loaded && createPortal(
        <div className={'styles-toast-container'}>
            {
                toasts.map((t) => {
                    return (
                        <Toast
                            key={t.id}
                            type={t.mode}
                            title={t.title}
                            message={t.message}
                            onClose={() => removeToast(t.id)}/>
                    )
                })
            }
        </div>, document.getElementById(portalId))
}