import './SpellSlot.scss'
import {useState} from "react";

export default function SpellSlots(props) {

    const {spells, spellLevel} = props
    const [spellSlotBurnStatus, setSpellSlotBurnStatus] = useState(false)

    function burnSlot(spellSlot, slotId) {
        setSpellSlotBurnStatus(!spellSlotBurnStatus)
        // console.log(slotId)
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(
        //         {"spellSlotId": slotId, "burnt": spellSlotBurnStatus}
        //     )
        // };
        // const response = fetch(`http://localhost:3001/character/spells/spell-slots/${spells.level}/${slotId}`, requestOptions);
        // return response.json();
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