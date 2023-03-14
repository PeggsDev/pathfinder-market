import {useState} from "react";
import {v4 as uuid} from "uuid";


import {createContext} from "react";

export const ToastPortalCtx = createContext({})

export function ToastPortalDataProvider({children}) {
    const [toasts, setToasts] = useState([])

    function addToast(toast) {
        setToasts([...toasts, {...toast, id: uuid}])
    }

    function removeToast(id) {
        setToasts(toasts.filter(t => t.id !== id))
    }

    return (
        <ToastPortalCtx.Provider value= {
            {
                toasts,
                addToast,
                removeToast
            }}>
            {children}
        </ToastPortalCtx.Provider>
    )
}