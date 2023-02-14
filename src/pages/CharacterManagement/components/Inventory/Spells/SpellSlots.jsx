import './SpellSlot.scss'
import { useEffect, useState } from "react";

export default function SpellSlots({ slotCount, spellLevel }) {

    const [spellSlots, setSpellSlots] = useState(Array(slotCount))
    const [burnSpell, setBurn] = useState('');

    useEffect(() => {
        for (let index = 0; index < slotCount; index++) {
            const key = spellLevel.toLowerCase().replace(/\s/g, '-') + '-slot-' + index
            spellSlots.splice(index, 1,
                <div role="checkbox" key={key} className={'spell-slot'} id={key}
                     onClick={(e) => burnSpellSlot(e.target.id)}/>)
        }
    }, [])

    useEffect(() => {
        //setSpellSlots(spellSlots)
    }, [burnSpell])

    function burnSpellSlot(slotId) {
        const slotNumber = slotId.slice(-1)
        const spellSlot = spellSlots[slotNumber]
        setBurn(slotId)

        spellSlots.splice(slotNumber, 1,
            <div role="checkbox" key={spellSlot.key}
                className={`spell-slot ${spellSlot.props.className.includes('burnt') ? '' : 'burnt'}`}
                id={spellSlot.props.id}
                onClick={(e) => burnSpellSlot(e.target.id)}/>)
    }

    return (
        <div className={'spell-slots'}>
            {[...spellSlots]}
            <div className={'spell-slots-label'}>Slots</div>
        </div>

    )
}