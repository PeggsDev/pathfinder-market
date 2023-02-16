import './HealthPoints.scss'
import {useState} from "react";

export default function HealthPoints(props) {
    const {
        current,
        max,
        temp,
        updateCurrentHealth,
        updateTempHealth
    } = props

    const [hp, setHp] = useState(0)

    function healHP() {
        const returnValue = current + Number(hp)
        updateCurrentHealth(returnValue <= max ? returnValue : max)
    }

    function takeDamage() {

        let total = current + temp

        if (Number(hp) <= temp) {
            updateTempHealth(temp - Number(hp))
        } else {
            updateTempHealth(0)
            updateCurrentHealth(total - Number(hp) <= 0 ? 0 : total - Number(hp))
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
                               value={temp}
                               onChange={(e) => updateTempHealth(Number(e.target.value))}/>
                        {/*<div className={'hp-value'}>{temp === 0 ? '--' : temp}</div>*/}
                    </div>
                </div>
            </div>
            <div className={'hit-point manage-hp'}>
                <button className={'heal-button'} onClick={() => healHP()}>heal</button>
                <input className={'hit-point-input'}
                       type={'number'}
                       onChange={(e) => setHp(Number(e.target.value))}/>
                <button className={'damage-button'} onClick={() => takeDamage()}>damage</button>
            </div>
        </div>
    )
}