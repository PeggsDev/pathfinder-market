import { createContext } from "react"
import { createContext, useState } from "react"

export default ArmorClassContext = createContext()

export function ArmorClassDataProvider({children}) {
    
    const [dexModifier, setDexModifier] = useState(0)
    const [dexCap, setDexCap] = useState(0)
    const [proficiencyBonus, setProficiencyBonus] = useState(0)
    const [armorItemBonus, setArmorItemBonus] = useState(0)
    const [otherBonuses, setOtherBonuses] = useState([])
    const [penalties, setPenalties] = useState([])

    return (
        <ArmorClassContext.Provider value={'<TODO - Add data here>'}>
            {children}
        </ArmorClassContext.Provider>
    )
}