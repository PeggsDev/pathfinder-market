import {v4 as uuid} from 'uuid';
import {useEffect, useState} from "react";

export default function useToastPortal() {

    const [loaded, setLoaded] = useState(false)
    const [portalId] = useState(`toast-portal-${uuid()}`)

    useEffect(() => {
        const div = document.createElement('div')
        div.id = portalId

        //TODO - Pass in values through props to make Dynamic
        div.style = 'position: fixed; bottom: 1rem; right:1rem; color: white;'
        document.getElementsByTagName('body')[0].prepend(div)
        setLoaded(true)

        return () => document.getElementsByTagName('body')[0].removeChild(div)
    }, [portalId])

    return {loaded, portalId}
}