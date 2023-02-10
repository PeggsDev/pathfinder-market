import './SpellSlot.scss'

export default function SpellSlot({slotCount}) {
    const spellSlots = []
    for (let i = 0; i < slotCount; i++) {
        spellSlots.push(
            <div className={'spell-slot'}/>
        )
    }

    return (
        <div className={'spell-slots'}>
            {spellSlots}
            <div className={'spell-slots-label'}>Slots</div>
        </div>
    )
}