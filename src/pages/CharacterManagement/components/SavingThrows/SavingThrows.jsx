import './SavingThrows.scss'

import { proficiencyEnum } from "../../../../App";
import { calculateAbilityBasedModifier } from "../../CharacterSheet";
import { ReactComponent as DiceIcon } from '../../svg/dice-d20-solid.svg';

import { IDieType } from "dddice-js";
import { rollDice } from "../../../../App";

export default function SavingThrows({ characterData, diceClient }) {

    function Skill({ save, proficiencyIndicator, baseAbility, saveModifier, diceClient }) {

        return (
            <div className={'save-box'}>
                <div className={'save-title-proficiency'}>
                    <div className={'proficiency-indicator'}>
                        <label>
                            {proficiencyIndicator}
                        </label>
                    </div>
                </div>
                <div className={'save-title-ability'}>
                    <div className={'base-ability'}>
                        <label className={'base-ability-label'}>
                            {baseAbility}
                        </label>
                    </div>
                </div>
                <div className={'save'}>
                    <div className={'save-name'}>
                        <label>
                            {save}
                        </label>
                    </div>
                    <div className={'save-dice-roll'}>
                        <DiceIcon className={'dice-icon'} onClick={() => {
                            rollDice(
                                diceClient,
                                IDieType.D20,
                                0,
                                'dddice-old-school')
                        }} />
                    </div>
                    <div className={'save-title-bonus'}>
                        <div className={'save-modifier'}>
                            <label>
                                {saveModifier > 0 ? "+" + saveModifier : '+0'}
                            </label>
                        </div>
                    </div>
                </div>
            </div>)
    }

    return (
        <form className={'save-block'}>
            <div className={'save-block-titles'}>
                <div className={'save-title-proficiency'}>PROF</div>
                <div className={'save-title-ability'}>BASE</div>
                <div className={'save-title-save'}>SAVE</div>
                <div className={'save-title-bonus title'}>BONUS</div>
            </div>
            {characterData?.savingThrows?.map((save, index) => {
                const baseAbility = characterData?.abilityScores.find(item => item.ability === save.ability)
                return (
                    <Skill
                        key={index}
                        diceClient={diceClient}
                        save={save?.save}
                        baseAbility={baseAbility?.ability.slice(0, 3).toUpperCase()}
                        proficiencyIndicator={save?.proficiencyLevel}
                        saveModifier={calculateAbilityBasedModifier(baseAbility?.score, characterData?.level, proficiencyEnum[save?.proficiencyLevel])} />
                )
            })}
        </form>
    )
}