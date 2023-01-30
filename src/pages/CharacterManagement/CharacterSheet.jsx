import './CharacterSheet.scss'
import React, { useEffect, useRef, useState } from "react";
import '../../componenets/SlidingCard/SlidingCard.scss'
import { IRoll, ThreeDDiceRollEvent, ThreeDDice, ITheme, TheeDDiceAPI } from 'dddice-js';

import { ReactComponent as DiceIcon } from './svg/dice-d20-solid.svg';
import { ReactComponent as Armor } from "./svg/armor-class.svg";
import { proficiencyEnum } from "../../App";
import CharacterSheetBackground from "../../images/parallax-background.jpg";
import Item from "./components/inventory/Item";

function calculateModifier(value) {
    return Math.floor((value - 10) / 2)
}

function calculateSkillModifier(baseAbilityScore, level, proficiency) {
    return calculateModifier(baseAbilityScore) + (proficiency > 0 ? level : 0) + proficiency
}

function CharacterDetails(props) {
    return (
        <div className={'character-details'}>
            <img src={''} className={'character-profile-img'} />
            <label>{props.characterName}</label>
        </div>
    )
}

function AbilityScore({ ability, score }) {
    const modifier = (calculateModifier(score))
    return (
        <div className={'ability'}>
            <h3>{ability.toUpperCase()}</h3>
            <input className={'modifier'}
                type="text"
                disabled="disabled"
                placeholder="disabled"
                value={modifier > 0 ? "+" + modifier : modifier.toString()}
                readOnly />
        </div>
    )
}


function Skill({ skill, proficiencyIndicator, baseAbility, skillModifier }) {

    return (
        <div className={'skill-box'}>
            <div className={'proficiency-indicator'}>
                <label>
                    {proficiencyIndicator}
                </label>
            </div>
            <div className={'base-ability'}>
                <label className={'base-ability-label'}>
                    {baseAbility}
                </label>
            </div>
            <div className={'skill'}>
                <div className={'skill-name'}>
                    <label>
                        {skill}
                    </label>
                </div>
                <div className={'skill-dice-roll'}>
                    <DiceIcon className={'dice-icon'} />
                </div>
            </div>
        </div>
    )
}

export default function CharacterSheet() {
    const threeDDiceApiKey = 'kn4MfcKWqPq3WhVMhTVFPFmeW6sgUnpWmtOU3uKy'
    const roomSlug = '-t_xEwM'

    const threeDDiceRef = useRef(ThreeDDice)
    const canvasRef = useRef(null);
    canvasRef.current = window.innerWidth;
    canvasRef.current = window.innerHeight;

    useEffect(() => {
        try {
            threeDDiceRef.current = new ThreeDDice(canvasRef.current, threeDDiceApiKey)
            threeDDiceRef.current.start();
            threeDDiceRef.current.connect(roomSlug);
            console.log('DDDICE INGLORIOUS DRAGONS');
        } catch (error) {
            console.log("error initializing ddDice", error);
        }
    }, [])

    // threeDDiceRef.current.roll([{
    //     theme: 'dddice-standard',
    //     type: 'd20',
    // }]);

    const [characterData, setCharacterData] = useState()
    const [equipment, setEquipment] = useState([])
    const [activeTab, setActiveTab] = useState(1)

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:3001/character/3');
                const json = await response.json();
                setCharacterData(json)
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:3001/equipment');
                const json = await response.json();
                setEquipment(json)
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, []);

    return (
        <div className={'character-sheet'}>
            <img src={CharacterSheetBackground} className={'character-sheet-background'} />
            <div className={'character-sheet-component ability-scores'}>
                <h1>Ability Scores</h1>
                <form className={'score-block'}>
                    {
                        characterData?.abilityScores.map((ability) => {
                            return <AbilityScore key={ability.id}
                                ability={ability.ability}
                                score={ability.score}/>
                        })
                    }
                </form>
            </div>
            <div className={'character-sheet-component armor-class'}>
                <h3 className={'title'}>ARMOR</h3>
                <input className={'modifier'}
                    type="text"
                    disabled="disabled"
                    placeholder="disabled"
                    value={characterData?.armorClass}
                    readOnly />
                <h3 className={'sub-title'}>CLASS</h3>
                <Armor className={'shield'} />
            </div>
            <div className={'character-sheet-component saving-throws'}>
                {/*<h1>Saving Throws</h1>*/}
                {/*<h3>Fortitude</h3>*/}
                {/*<h3>Reflex</h3>*/}
                {/*<h3>Will</h3>*/}
            </div>
            <div className={'character-sheet-component class-dc'}></div>
            <div className={'character-sheet-component skill-modifiers'}>
                <h1>Skills</h1>
                <form className={'skill-block'}>
                    <div className={'skill-block-titles'}>
                        <div className={'skill-title-proficiency'}>PROF</div>
                        <div className={'skill-title-ability'}>BASE</div>
                        <div className={'skill-title-skill'}>SKILL</div>
                        <div className={'skill-title-bonus'}>BONUS</div>
                    </div>
                    {
                        characterData?.skills.map((skill) => {
                            const baseAbility = characterData?.abilityScores.find(item => item.ability === skill.ability)
                            return <Skill key={skill?.id}
                                skill={skill?.skill}
                                baseAbility={baseAbility?.ability.slice(0, 3).toUpperCase()}
                                proficiencyIndicator={skill?.proficiencyLevel}
                                skillModifier={
                                    calculateSkillModifier(
                                        baseAbility?.score,
                                        characterData?.level,
                                        proficiencyEnum[skill?.proficiencyLevel]
                                    )
                                } />
                        })
                    }
                </form>
            </div>

            <div className={'character-sheet-component tabbed-component actions-and-inventory'}>
                <div className={'tab-block'}>
                    <div className={`tab ${activeTab === 1 ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab(1)}>
                        Actions
                    </div>
                    <div className={`tab ${activeTab === 2 ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab(2)}>
                        Inventory
                    </div>
                    <div className={`tab ${activeTab === 3 ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab(3)}>
                        Feats & Abilities
                    </div>
                    <div className={`tab ${activeTab === 4 ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab(4)}>
                        Notes
                    </div>
                </div>
                <div className={'tab-content'}>
                    <div className={`content ${activeTab === 1 ? 'active-content' : ''}`}>
                        <div className={'tab-content actions title-block'}>
                            <div className={'title-underline'}>
                                <div className={'tab-content actions title'}>
                                    <span>Melee Strikes</span>
                                </div>
                            </div>
                            <div className={'tab-content actions strikes'}>
                                {equipment?.map((item) => {
                                    const system = item?.system
                                    return (
                                        !item?.system.range &&
                                        item?.type === 'weapon' &&
                                        <Item
                                            itemName={item.name}
                                            itemCategory={system.category && system.category}
                                            itemType={item?.type}
                                            itemRarity={system.traits.rarity}
                                            itemTraits={system.traits.value?.map((trait) => {
                                                return trait + ' '
                                            })}
                                            diceFormula={system.damage.dice + system.damage.die}
                                            range={system.range} />
                                    )
                                })}
                            </div>
                            <div className={'title-underline'}>
                                <div className={'tab-content actions title'}>
                                    <span>Ranged Strikes</span>
                                </div>
                            </div>
                            <div className={'tab-content actions ranged'}>
                                {equipment?.map((item) => {
                                    const system = item?.system
                                    return (
                                        item.system.range && item.type === 'weapon' &&
                                        <Item
                                            itemName={item.name}
                                            itemCategory={system.category && system.category}
                                            itemType={item?.type}
                                            itemRarity={system.traits.rarity}
                                            itemTraits={system.traits.value?.map((trait) => {
                                                return trait
                                            })}
                                            diceFormula={system.damage.dice + system.damage.die}
                                            range={system.range} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'tab-content'}>
                    <div className={`content ${activeTab === 2 ? 'active-content' : ''}`}>
                        WIP
                    </div>
                </div>
                <div className={'tab-content'}>
                    <div className={`content ${activeTab === 3 ? 'active-content' : ''}`}>
                        WIP
                    </div>
                </div>
                <div className={'tab-content'}>
                    <div className={`content ${activeTab === 4 ? 'active-content' : ''}`}>
                        WIP
                    </div>
                </div>
            </div>
            <div className={'character-sheet-component'}></div>
            <canvas className={'dd-dice-canvas'} ref={canvasRef} />
        </div>
    )
}