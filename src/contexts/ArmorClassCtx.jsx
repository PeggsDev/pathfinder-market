import {createContext, useState} from "react"

export const ArmorClassCtx = createContext({})

export function ArmorClassDataProvider({children}) {

    const [armorBonus, setArmorBonus] = useState({"acBonus": 0})
    const [dexCap, setDexCap] = useState({"dexCap": 0})
    const [shieldBonus, setShieldBonus] = useState({"acBonus": 0})


    return (
        <ArmorClassCtx.Provider value={{armorBonus, setArmorBonus, shieldBonus, setShieldBonus, dexCap, setDexCap}}>
            {children}
        </ArmorClassCtx.Provider>
    )
}