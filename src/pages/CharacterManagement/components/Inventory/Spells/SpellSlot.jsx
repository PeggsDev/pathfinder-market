import './SpellSlot.scss'

export default function SpellSlot({slotCount, spellLevel}) {
    const spellSlots = []
    for (let index = 0; index < slotCount; index++) {
        spellSlots.push(
            <div className={'spell-slot'} id={spellLevel + '-' + index}/>
        )
    }

    return (
        <div className={'spell-slots'}>
            {spellSlots}
            <div className={'spell-slots-label'}>Slots</div>
        </div>
    )
}