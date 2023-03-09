import './HitPoints.scss'
import React, { useContext, useState } from "react";
import { ConditionsCtx } from "../../../../contexts/ConditionsCtx";

export default function HealthPoints(props) {

    const {
        conditionData,
        addConditions,
        removeConditions,
        decrementConditionCount
    } = useContext(ConditionsCtx)

    const {
        current,
        max,
        temp,
        updateCurrentHitPoints,
        updateTempHitPoints
    } = props

    const [hp, setHp] = useState(0)

    function removeConditionsAfterHealing(conditions) {
        conditions.map((condition) => {
            const con = conditionData[conditionData.findIndex(item => item.name.toLowerCase() === condition.toLowerCase())]
            decrementConditionCount(con)
        })
        //removeConditions(conditions)
        if (current === 0) {
            addConditions(['wounded'])
        }
    }

    function healHP() {
        const returnValue = current + Number(hp)
        updateCurrentHitPoints(returnValue <= max ? returnValue : max)
        removeConditionsAfterHealing(['dying', 'blinded', 'flat-footed', 'unconscious'])
    }

    function takeDamage() {
        let total = current + temp

        if (Number(hp) <= temp) {
            updateTempHitPoints(temp - Number(hp))
        } else {
            updateTempHitPoints(0)
            let newTotal = total - Number(hp) <= 0 ? 0 : total - Number(hp)
            if (newTotal <= 0) {
                addConditions(['dying', 'blinded', 'flat-footed', 'unconscious'])
            }
            updateCurrentHitPoints(newTotal)
        }
    }

    return (
        <div className={'hp-section'}>
            <div className={'hp-wrapper'}>
                <h1>Hit Points</h1>
                <div className={'hit-point-info-wrapper'}>
                    <div className={'hit-point current-hp'}>
                        <div className={'hp-label'}>Current</div>
                        <div className={'hp-value'}>{current}</div>
                    </div>
                    <div className={'hit-point max-hp'}>
                        <div className={'hp-label'}>Max</div>
                        <div className={'hp-value'}>{max}</div>
                    </div>
                    <div className={'hit-point temp-hp'}>
                        <div className={'hp-label'}>Temp</div>
                        <input className={'hp-value temp-hp-input'}
                            type={'number'}
                            value={temp <= 0 ? '' : temp}
                            onChange={(e) => updateTempHitPoints(Number(e.target.value))} />
                    </div>
                </div>
            </div>
            <div className='vertical-line-hp' />
            <div className={'hit-point manage-hp'}>
                <button className={'heal-button'} onClick={() => healHP()}>heal</button>
                <input className={'hit-point-input'}
                    type={'number'}
                    onChange={(e) => setHp(Number(e.target.value))} />
                <button className={'damage-button'} onClick={() => takeDamage()}>damage</button>
            </div>
        </div>
    )
}