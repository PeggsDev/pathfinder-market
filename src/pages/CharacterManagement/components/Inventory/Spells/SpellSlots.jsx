import './SpellSlot.scss'

export default function SpellSlots(props) {

    const {spells, triggerCharacterDataRefresh} = props

    function burnSlot(spellSlot, slotId) {
        const requestOptions = {
            method: 'PUT', // TODO - Fix this - Should be a POST but backend seems not to support it at the moment
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {"spellSlotId": slotId, "burnt": false}
            )
        };
        void fetch(`http://localhost:3001/character/spells/spell-slots/${spells.level}/${slotId}`, requestOptions);
        triggerCharacterDataRefresh(slotId)
    }

    return (
        <div className={'spell-slots'}>
            {spells.spellSlots.map((spellSlot, index) => {
                return (
                    <div
                        role="checkbox"
                        key={index}
                        className={`spell-slot ${spellSlot.burnt ? 'burnt' : ''}`}
                        id={spellSlot.spellSlotId}
                        onClick={(e) => burnSlot(spellSlot, e.target.id)}/>
                )
            })}
            <div className={'spell-slots-label'}>Slots</div>
        </div>
    )
}