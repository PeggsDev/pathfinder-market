import './SpellSlot.scss'
import {useState} from "react";

export default function SpellSlots({spells}) {

    // const [spellSlotId, setSpellSlotId] = useState()
    // const [spellSlot, setSpellSlot] = useState()
    // const [spellSlotBurnStatus, setSpellSlotBurnStatus] = useState(false)
    // const [requestUpdate, setRequestUpdate] = useState(false)

    const [spellSlotBurnStatus, setSpellSlotBurnStatus] = useState(false)


    function burnSlot(spellSlot, slotId) {
        console.log(slotId)
        const requestOptions = {
            method: 'PUT', // TODO - Fix this - Should be a POST but backend seems not to support it at the moment
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {"spellSlotId": slotId, "burnt": spellSlotBurnStatus}
            )
        };
        const response = fetch(`http://localhost:3001/character/spells/spell-slots/${spells.level}/${slotId}`, requestOptions);
        window.location.reload()
        return response.json();
    }

    // useEffect(() => {
    //     if(requestUpdate) {
    //         console.log(spellSlotId)
    //         const requestOptions = {
    //             method: 'PUT', // TODO - Fix this - Should be a POST but backend seems not to support it at the moment
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify(
    //                 {"spellSlotId": spellSlotId, "burnt": spellSlotBurnStatus}
    //             )
    //         };
    //         const response = fetch(`http://localhost:3001/character/spells/spell-slots/${spells.level}/${spellSlotId}`, requestOptions);
    //         // window.location.reload()
    //         return response.json();
    //         setRequestUpdate(false)
    //
    //     }
    //
    // }, [spellSlotBurnStatus]);
    //
    //
    // function updateBurnStatus(spellSlot, spellSlotId){
    //     setRequestUpdate(true)
    //     setSpellSlotId(spellSlotId)
    //     setSpellSlot(spellSlot)
    //     setSpellSlotBurnStatus(!spellSlotBurnStatus)
    //
    // }


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