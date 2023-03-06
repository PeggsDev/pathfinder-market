import {createContext, useState} from "react"

export const ArmorClassCtx = createContext({})

export function ArmorClassDataProvider({children}) {

    const [armorBonus, setArmorBonus] = useState({"acBonus": 0})
    const [dexCap, setDexCap] = useState({"dexCap": 0})
    const [shieldBonus, setShieldBonus] = useState({"acBonus": 0})
    const [dexBonus, setDexBonus] = useState({"dexBonus": 0})
    const [additionalModifiers, addModifier] = useState(new Set())
    const armorClass = calculateArmorClass(
        armorBonus,
        dexBonus,
        dexCap,
        shieldBonus,
        additionalModifiers
    )

    function applyModifier(mod) {
        addModifier(additionalModifiers => new Set([...additionalModifiers, mod]))
    }

    function removeModifier(mod) {
        addModifier(additionalModifiers => new Set([...additionalModifiers].filter(x => x !== mod)))
    }

    function calculateArmorClass(armor, dex, dexCap, shield, additionalMods) {
        const other = Array.from(additionalMods).reduce((acc, val) => {return acc + val;}, 0)
        return (10 + armor + shield + dex + other) - dexCap;
    }

    return (
        <ArmorClassCtx.Provider value={{
                armorBonus,
                setArmorBonus,
                dexBonus,
                setDexBonus,
                dexCap,
                setDexCap,
                shieldBonus,
                setShieldBonus,
                applyModifier,
                removeModifier,
                additionalModifiers,
                armorClass
            }}>
            {children}
        </ArmorClassCtx.Provider>
    )
}