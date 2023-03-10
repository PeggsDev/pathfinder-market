import './HitPoints.scss'
import React, { useContext, useState } from "react";
import { ConditionsCtx } from "../../../../contexts/ConditionsCtx";

export default function HealthPoints(props) {

    const {
        conditionData,
        currentConditions,
        applyConditions,
        incrementConditionCount,
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

    const dying = conditionData[conditionData.findIndex(condition => condition.name.toLowerCase() === 'dying'.toLowerCase())]
    const blinded = conditionData[conditionData.findIndex(condition => condition.name.toLowerCase() === 'blinded'.toLowerCase())]
    const unconscious = conditionData[conditionData.findIndex(condition => condition.name.toLowerCase() === 'unconscious'.toLowerCase())]
    const flatFooted = conditionData[conditionData.findIndex(condition => condition.name.toLowerCase() === 'flat-footed'.toLowerCase())]
    const wounded = conditionData[conditionData.findIndex(condition => condition.name.toLowerCase() === 'wounded'.toLowerCase())]

    function conditionsAtZeroHitPoints() {
        applyConditions(JSON.parse(JSON.stringify([...currentConditions, dying, dying, blinded, flatFooted, unconscious])))
    }

    function conditionsAfterHealing() {
        //TODO - Add all the other rules for dying here. It's complicated MUAHAHA
        decrementConditionCount(dying)
        decrementConditionCount(dying)
        decrementConditionCount(unconscious)
        decrementConditionCount(blinded)
        decrementConditionCount(flatFooted)

        applyConditions(JSON.parse(JSON.stringify([...currentConditions, wounded, wounded])))
    }

    function healHP() {
        const returnValue = current + Number(hp)
        updateCurrentHitPoints(returnValue <= max ? returnValue : max)
        conditionsAfterHealing()
    }

    function takeDamage() {
        let total = current + temp

        if (Number(hp) <= temp) {
            updateTempHitPoints(temp - Number(hp))
        } else {
            updateTempHitPoints(0)
            let newTotal = total - Number(hp) <= 0 ? 0 : total - Number(hp)
            if (newTotal <= 0) {
                conditionsAtZeroHitPoints()
            }
            updateCurrentHitPoints(newTotal)
        }
    }

    return (
        <div className={'hp-section'}>
            <div className={'hp-wrapper'}>
                <div className={'hp-section-title'}>Hit Points</div>
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