import {createContext, useState} from "react"

export const ArmorClassCtx = createContext({})

export function ArmorClassDataProvider({children}) {

    const [armorBonus, setArmorBonus] = useState( 0)
    const [dexCap, setDexCap] = useState(0)
    const [shieldBonus, setShieldBonus] = useState(0)
    const [dexBonus, setDexBonus] = useState(0)
    const [additionalModifiers, addModifier] = useState(new Set())
    const [acProficiencies, setArmorProficiencies] = useState()
    const armorClass = calculateArmorClass(armorBonus, dexBonus, dexCap, shieldBonus, additionalModifiers)

    function applyModifier(mod) {
        addModifier(additionalModifiers => new Set([...additionalModifiers, mod]))
    }

    function removeModifier(mod) {
        addModifier(additionalModifiers => new Set([...additionalModifiers].filter(x => x !== mod)))
    }

    function calculateArmorClass(armor, dex, dexCap, shield, otherMods) {
        const additional = Array.from(otherMods).reduce((acc, val) => {
            return acc + val
        }, 0)

        return (10 + armor + shield + (dex <= dexCap ? dex : dexCap) + additional);
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
            acProficiencies,
            setArmorProficiencies,
            armorClass
        }}>
            {children}
        </ArmorClassCtx.Provider>
    )
}