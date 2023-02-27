import './TakeARest.scss'
import {GiCampfire, GiGoblinCamp} from "react-icons/gi";
import React from "react";

export default function TakeARest(){

    return (
        <div className={'rest-button-wrapper'}>
            <div className={'rest-button short-rest'}>
                <GiCampfire className={'rest-button-svg short'}/>
                <h4 className={'short-rest-label'}>
                    Short Rest
                </h4>
            </div>
            <div className={'rest-button long-rest'}>
                <GiGoblinCamp className={'rest-button-svg long'}/>
                <h4 className={'long-rest-label'}>
                    Long Rest
                </h4>
            </div>
        </div>
    )
}