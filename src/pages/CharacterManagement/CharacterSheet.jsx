import './CharacterSheet.scss'
import React, {useEffect, useRef, useState} from "react";
import '../../componenets/SlidingCard/SlidingCard.scss'
import {IRoll, ThreeDDiceRollEvent, ThreeDDice, ITheme, ThreeDDiceAPI, IDieType} from 'dddice-js';

import {ReactComponent as Armor} from "./svg/armor-class.svg";
import CharacterSheetBackground from "../../images/character-sheet-background-b.jpg";
import Item from "./components/Inventory/Item";

import Skills from './components/Skills/Skills';

export function calculateModifier(value) {
    return Math.floor((value - 10) / 2)
}

export function calculateSkillModifier(baseAbilityScore, level, proficiency) {
    return calculateModifier(baseAbilityScore) + (proficiency > 0 ? level : 0) + proficiency
}

function CharacterDetails(props) {
    return (
        <div className={'character-details'}>
            <img src={''} className={'character-profile-img'}/>
            <label>{props.characterName}</label>
        </div>
    )
}

function AbilityScore({ability, score}) {
    const modifier = (calculateModifier(score))
    return (
        <div className={'ability'}>
            <h3>{ability.toUpperCase()}</h3>
            <input className={'modifier'}
                   type="text"
                   disabled="disabled"
                   placeholder="disabled"
                   value={modifier > 0 ? "+" + modifier : modifier.toString()}
                   readOnly/>
            {/*<input className={'score'}*/}
            {/*       type="text"*/}
            {/*       disabled="disabled"*/}
            {/*       placeholder="disabled"*/}
            {/*       value={score}*/}
            {/*       readOnly />*/}
        </div>
    )
}

export default function CharacterSheet() {
    /** TODO - Extract this to somewhere else and make it globally available */
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

            console.log('THREE-D-DICE INGLORIOUS DRAGONS');
        } catch (error) {
            console.log("error initializing ddDice", error);
        }
    }, [])

    /** -----------------------End TODO---------------------------- */

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
            <section className={'character-sheet-grid'}>
                <img src={CharacterSheetBackground} className={'character-sheet-background'}/>
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
                           readOnly/>
                    <h3 className={'sub-title'}>CLASS</h3>
                    <Armor className={'shield'}/>
                </div>
                <div className={'character-sheet-component saving-throws'}>
                    <h1>Saving Throws</h1>
                </div>
                <div className={'character-sheet-component class-dc'}></div>
                <div className={'character-sheet-component skill-modifiers'}>
                    <h1>Skills</h1>
                    <Skills
                        characterData={characterData}
                        diceClient={threeDDiceRef}/>
                </div>
                <div className={'character-sheet-component tabbed-component actions-and-Inventory'}>
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
                    <div className={'tab-content actions'}>
                        <div className={`content ${activeTab === 1 ? 'active-content' : ''}`}>
                            <div className={'tab-content actions title-block'}>
                                <div className={'title-underline'}>
                                    <div className={'tab-content actions title'}>
                                        <span>Melee Strikes</span>
                                    </div>
                                </div>
                                <div className={'section-header'}>
                                    <div className={'section-header-label attack'}>
                                        <span>ATTACK</span>
                                    </div>
                                    <div className={'section-header-label damage'}>
                                        <span>DAMAGE</span>
                                    </div>
                                    <div className={'section-header-label type'}>
                                        <span>RARITY</span>
                                    </div>
                                    <div className={'section-header-label traits'}>
                                        <span>TRAITS</span>
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
                                                itemTraits={system.traits.value}
                                                diceClient={threeDDiceRef}
                                                die={system.damage.die}
                                                dieCount={system.damage.dice}
                                                range={system.range}/>
                                        )
                                    })}
                                </div>
                                <div className={'title-underline'}>
                                    <div className={'tab-content actions title'}>
                                        <span>Ranged Strikes</span>
                                    </div>
                                </div>
                                <div className={'section-header'}>
                                    <div className={'section-header-label attack'}>
                                        <span>ATTACK</span>
                                    </div>
                                    <div className={'section-header-label damage'}>
                                        <span>DAMAGE</span>
                                    </div>
                                    <div className={'section-header-label type'}>
                                        <span>RARITY</span>
                                    </div>
                                    <div className={'section-header-label traits'}>
                                        <span>TRAITS</span>
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
                                                diceClient={threeDDiceRef}
                                                die={system.damage.die}
                                                dieCount={system.damage.dice}
                                                range={system.range}/>
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
                    <div className={'tab-content notes'}>
                        <div className={`content ${activeTab === 4 ? 'active-content' : ''}`}>
                            <div className={'title-underline'}>
                                <div className={'tab-content notes title'}>
                                    <span>Organisations</span>
                                </div>
                            </div>
                            <div contentEditable className={'tab-notes'}/>

                            <div className={'title-underline'}>
                                <div className={'tab-content notes title'}>
                                    <span>Allies</span>
                                </div>
                            </div>
                            <div contentEditable className={'tab-notes'}/>

                            <div className={'title-underline'}>
                                <div className={'tab-content notes title'}>
                                    <span>Enemies</span>
                                </div>
                            </div>
                            <div contentEditable className={'tab-notes'}/>

                            <div className={'title-underline'}>
                                <div className={'tab-content notes title'}>
                                    <span>Backstory</span>
                                </div>
                            </div>
                            <div contentEditable className={'tab-notes'}/>

                            <div className={'title-underline'}>
                                <div className={'tab-content notes title'}>
                                    <span>Other</span>
                                </div>
                            </div>
                            <div contentEditable className={'tab-notes'}/>
                        </div>
                    </div>
                </div>
                <div className={'character-sheet-component'}></div>
                <canvas className={'dd-dice-canvas'} ref={canvasRef}/>
            </section>
        </div>
    )
}