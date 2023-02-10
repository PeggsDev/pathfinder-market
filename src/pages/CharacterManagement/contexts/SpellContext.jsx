import {createContext, useState} from "react"

export default SpellContext = createContext()

export function SpellDataProvider({children}) {

    const [isSpellSlotBurnt, burnSpellSlot] = useState(0)

    return (
        <SpellContext.Provider value={
            {
                isSpellSlotBurnt,
                burnSpellSlot
            }
        }>
            {children}
        </SpellContext.Provider>
    )
}