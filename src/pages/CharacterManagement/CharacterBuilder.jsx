import './CharacterBuilder.scss'
import React, { useEffect, useState } from "react";

export default function CharacterBuilder() {
    const [ancestries, setAncestry] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:3001/character/ancestry');
                const json = await response.json();
                setAncestry(json)
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, []);

    return (
        <div className='character-builder'>
            <div className={'ancestry'}>
                <select name={'ancestries'}> {
                    ancestries.map((ancestry) => {
                        return <option value={ancestry.id}>{ancestry.name}</option>
                    })
                }
                </select>
            </div>
        </div>
    )
}