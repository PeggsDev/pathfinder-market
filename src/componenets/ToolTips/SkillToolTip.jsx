import './SkillToolTip.scss'
import React, {useRef, useState} from "react";
import {proficiencyEnum} from "../../App";

export default function SkillToolTip(props){

    const {skill, proficiency, baseAbility, abilityDescription, level, proficiencyLevel} = props

    const [isHovered, setHovered] = useState(false)
    const targetRef = useRef(null);

    return (
            <div className={'tooltip-wrapper'}>
                <div className={'tooltip-target'}>{props.children}</div>

                <div className={'tooltip-container'}>
                    <h3>{skill}</h3>
                    <span>Proficiency: <div>{proficiency}</div></span>
                    <span>Base Ability: {baseAbility?.ability}</span>
                    <span>{abilityDescription}</span>
                    <h3>Bonus Breakdown</h3>
                    <div>{proficiency} = {baseAbility?.score} + {level} + {proficiencyEnum[proficiencyLevel]}</div>
                </div>
            </div>

    )
}