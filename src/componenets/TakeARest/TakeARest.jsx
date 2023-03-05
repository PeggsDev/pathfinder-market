import './TakeARest.scss'
import {GiCampfire} from "react-icons/gi";
import React from "react";

export default function TakeARest() {

    return (
        <div className={'rest-button-wrapper'}>
            <div className={'rest-button long-rest'}>
                <GiCampfire className={'rest-button-svg long'}/>
                <h4 className={'long-rest-label'}>
                    Take a Rest
                </h4>
            </div>
        </div>
    )
}