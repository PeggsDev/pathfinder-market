import './CharacterSheet.scss'
import React, {useEffect, useRef, useState} from "react";
import '../../componenets/SlidingCard/SlidingCard.scss'
import {ThreeDDice, ThreeDDiceAPI} from 'dddice-js';

import CharacterSheetBackground from "../../images/character-sheet-background-b.jpg";
//import CharacterSheetBackground from "../../images/andreas-rocha-theicecastle03.jpg";
//import CharacterSheetBackground from "../../images/andreas-rocha-electrichues02.jpg";
//import CharacterSheetBackground from "../../images/splash-8.jpg";

import Weapon from "./components/Inventory/Weapon";

import Skills from './components/Skills/Skills';
import ACShield from "./components/ACShield/ACShield";
import SavingThrows from './components/SavingThrows/SavingThrows';
import {ReactComponent as CameraIcon} from './svg/camera-solid.svg'

import Spell from "./components/Inventory/Spells/Spell";
import SpellBlock from "./components/Inventory/Spells/SpellBlock";
import {useParams} from "react-router-dom";
import HealthPoints from "./components/HitPoints/HitPoints";
import Conditions from "./components/Conditions/Conditions";
import {proficiencyColourEnum} from "../../App";

import {ConditionsCtx, ConditionsDataProvider} from "../../contexts/ConditionsCtx";
import {GiCampfire, GiChoppedSkull, GiGoblinCamp} from "react-icons/gi";


export function calculateModifier(value) {
    return Math.floor((value - 10) / 2)
}

export function calculateAbilityBasedModifier(baseAbilityScore, level, proficiency) {
    return calculateModifier(baseAbilityScore) + (proficiency > 0 ? level : 0) + proficiency
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
            <input className={'score'}
                   type="text"
                   disabled="disabled"
                   placeholder="disabled"
                   value={score}
                   readOnly/>
        </div>
    )
}

export default function CharacterSheet() {

    let {id} = useParams()

    const threeDDiceApiKey = process.env.REACT_APP_THREE_D_DICE_API_KEY
    const roomSlug = process.env.REACT_APP_THREE_D_DICE_ROOM_SLUG

    console.log(process.env)

    const threeDDiceRef = useRef(ThreeDDice)
    const canvasRef = useRef(null);

    canvasRef.current = window.innerWidth;
    canvasRef.current = window.innerHeight;

    useEffect(() => {
        try {
            threeDDiceRef.current = new ThreeDDice(canvasRef.current, threeDDiceApiKey, {dice: {drawOutlines: false}})
            threeDDiceRef.current.start();
            threeDDiceRef.current.connect(roomSlug);

            const diceApi = ThreeDDiceAPI
            diceApi.console.log('THREE-D-DICE INGLORIOUS DRAGONS');
        } catch (error) {
            console.log("error initializing ddDice", error);
        }
    }, [])

    /** -----------------------End TODO---------------------------- */

    const [uploadImage, setImage] = useState(false)
    const [characterData, setCharacterData] = useState()
    const [characterName, setCharacterName] = useState('')
    const [skills, setSkills] = useState()
    const [refreshCharacterData, triggerCharacterDataRefresh] = useState(0)
    const [equipment, setEquipment] = useState([])
    const [activeTab, setActiveTab] = useState((localStorage.getItem('activeTab')))

    /* Hit Points */
    const [currentHitPoints, setCurrentHitPoints] = useState(0)
    const [maxHitPoints, setMaxHitPoints] = useState(0)
    const [tempHitPoints, setTempHitPoints] = useState(0)

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://localhost:3001/character/${id}`);
                const json = await response.json();
                setCharacterData(json)
                setCharacterName(json.characterName)
                setSkills(json.skills)

                setCurrentHitPoints(json.hp.current)
                setMaxHitPoints(json.hp.max)
                setTempHitPoints(json.hp.temp)

            } catch (error) {
                console.log("error", error);
            }
        })();
    }, [refreshCharacterData]);

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
                <img className={'character-sheet-background'} src={CharacterSheetBackground}/>

                <section className={'character-sheet-component character-info-section'}>
                    <div className={'character-image-wrapper'}>
                        <img className={'character-info image'}
                             onMouseEnter={() => {
                                 setImage(true)
                             }}
                             onMouseLeave={() => {
                                 setImage(false)
                             }}
                             src={characterData?.characterImage}
                             alt={'avatar'} 
                             referrerPolicy={'no-referrer'}/>
                        <CameraIcon className={`upload-image-svg ${uploadImage ? 'show-icon' : ''}`}/>
                    </div>
                    <div className={'character-info-block'}>
                        <input className={'character-info character-name'}
                               type={'text'}
                               value={characterName}
                               onChange={(e) => setCharacterName(e.target.value)}/>
                        <div className={'character-info ancestry-and-heritage'}>
                            <div className={'ancestry-block'}>
                                <div className={'character-info-entry-left'}>{characterData?.ancestry} </div>
                                <div className={'character-info-entry-center'}>|</div>
                                <div className={'character-info-entry-right'}> {characterData?.heritage}</div>
                            </div>
                            <div className={'background-block'}>
                                <div className={'character-info-entry-left'}> {characterData?.class} </div>
                                <div className={'character-info-entry-center'}>|</div>
                                <div className={'character-info-entry-right'}> {characterData?.background}</div>
                            </div>
                        </div>
                        <div className={'character-info level'}>Level {characterData?.level}</div>
                        {/* <div className={'character-info size'}>{characterData?.size}</div>
                        <div className={'character-info alignment'}>{characterData?.alignment}</div> */}
                        {/*<div className={'character-info traits'}>Traits</div>*/}
                        {/*<div className={'character-info xp'}>Experience Points</div>*/}

                        {/*Short Rest*/}
                        {/*<GiCampfire />*/}

                        {/*Long Rest*/}
                        {/*<GiGoblinCamp/>*/}

                        {/*Death Saves*/}
                        {/*<GiChoppedSkull />*/}

                    </div>
                    <div className='vertical-line'/>
                    <section className={'character-sheet-component ability-scores'}>
                        <h1>Ability Scores</h1>
                        <form className={'score-block'}>
                            {
                                characterData?.abilityScores.map((ability, index) => {
                                    return <AbilityScore
                                        key={index}
                                        ability={ability.ability}
                                        score={ability.score}/>
                                })
                            }
                        </form>
                    </section>

                    <div className='vertical-line'/>

                    <section className={'character-sheet-component saving-throws'}>
                        <SavingThrows
                            characterData={characterData}
                            diceClient={threeDDiceRef}/>
                    </section>

                    <div className='vertical-line'/>

                    <section className={'character-sheet-component armor-class'}>
                        <div className={'ac-section'}>
                            <div className={'ac-shield'}>
                                <ACShield
                                    armor={{"acBonus": 5, "dexCap": 6}}
                                    shield={{"acBonus": 2}}
                                    dexterity={characterData?.abilityScores[1].score}
                                    additionalMods={2}
                                    armorClass={characterData?.armorClass}/>
                            </div>
                            <div className={'ac-stats'}>
                                <span className={'armor-class-stat'}>
                                    <div className={'armor-class-stat title'}>
                                        ITEM
                                    </div>
                                    <div className={'armor-class-stat value'}>
                                        +1
                                    </div>
                                </span>
                                <span className={'armor-class-stat'}>
                                    <div className={'armor-class-stat title'}>
                                        DEX
                                    </div>
                                    <div className={'armor-class-stat value'}>
                                        +5
                                    </div>
                                </span>
                                <span className={'armor-class-stat'}>
                                    <div className={'armor-class-stat title'}>
                                        DEX CAP
                                    </div>
                                    <div className={'armor-class-stat value'}>
                                        +4
                                    </div>
                                </span>
                                <span className={'armor-class-stat'}>
                                    <div className={'armor-class-stat title'}>
                                        PROF
                                    </div>
                                    <div className={'armor-class-stat value'}>
                                        +3
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className={'armor-proficiencies'}>
                            {characterData?.armorProficiencies?.map((armorType, index) => {
                                return (
                                    <div className={'armor-proficiency-box'} key={index}>
                                        <div className={'armor-type'}>{armorType?.armorType}</div>
                                        <div className={'armor-proficiency'} style={
                                            {color: `${proficiencyColourEnum[armorType?.proficiencyLevel]}`}
                                        }>
                                            {armorType?.proficiencyLevel}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </section>

                <section className={'character-sheet-component hit-points'}>
                        <HealthPoints
                            current={currentHitPoints}
                            updateCurrentHitPoints={setCurrentHitPoints}
                            max={maxHitPoints}
                            temp={tempHitPoints}
                            updateTempHitPoints={setTempHitPoints}/>

                </section>

                <section className={'character-sheet-component conditions'}>
                        <Conditions/>
                </section>

                <section className={'character-sheet-component class-dc'}>

                </section>
                <section className={'character-sheet-component skill-modifiers'}>
                    <h1>Skills</h1>
                    <Skills
                        characterData={characterData}
                        skills={skills}
                        skillsCallback={setSkills}
                        refreshData={triggerCharacterDataRefresh}
                        diceClient={threeDDiceRef}/>
                </section>

                <section className={'character-sheet-component tabbed-component actions-and-Inventory'}>
                    <div className={'tab-block'}>
                        <div className={`tab ${activeTab === '1' ? 'active-tab' : ''}`}
                             onClick={() => {
                                 setActiveTab('1')
                                 localStorage.setItem('activeTab', '1');
                             }}>
                            Armory
                        </div>
                        <div className={`tab ${activeTab === '2' ? 'active-tab' : ''}`}
                             onClick={() => {
                                 setActiveTab('2')
                                 localStorage.setItem('activeTab', '2');
                             }}>
                            Spells
                        </div>
                        <div className={`tab ${activeTab === '3' ? 'active-tab' : ''}`}
                             onClick={() => {
                                 setActiveTab('3')
                                 localStorage.setItem('activeTab', '3');
                             }}>
                            Equipment
                        </div>
                        <div className={`tab ${activeTab === '4' ? 'active-tab' : ''}`}
                             onClick={() => {
                                 setActiveTab('4')
                                 localStorage.setItem('activeTab', '4');
                             }}>
                            Actions
                        </div>
                        <div className={`tab ${activeTab === '5' ? 'active-tab' : ''}`}
                             onClick={() => {
                                 setActiveTab('5')
                                 localStorage.setItem('activeTab', '5');
                             }}>
                            Feats & Abilities
                        </div>
                        <div className={`tab ${activeTab === '6' ? 'active-tab' : ''}`}
                             onClick={() => {
                                 setActiveTab('6')
                                 localStorage.setItem('activeTab', '6');
                             }}>
                            Journal
                        </div>
                    </div>

                    <div className={'tab-content armory'}>
                        <div className={`content ${localStorage.getItem('activeTab') === '1' ? 'active-content' : ''}`}>
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
                                    {characterData?.equipment?.map((item, index) => {
                                        const system = item?.system
                                        return (
                                            !item?.system.range &&
                                            item?.type === 'weapon' &&
                                            <Weapon
                                                key={index}
                                                weaponName={item.name}
                                                weaponCategory={system.category && system.category}
                                                weaponType={item?.type}
                                                weaponRarity={system.traits.rarity}
                                                weaponTraits={system.traits.value}
                                                diceClient={threeDDiceRef}
                                                die={system.damage.die}
                                                dieCount={system.damage.dice}
                                                weaponRange={system.range}/>
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
                                <div className={'tab-content actions strikes'}>
                                    {characterData?.equipment?.map((item, index) => {
                                        const system = item?.system
                                        return (
                                            item.system.range && item.type === 'weapon' &&
                                            <Weapon
                                                key={index}
                                                weaponName={item.name}
                                                weaponCategory={system.category && system.category}
                                                weaponType={item?.type}
                                                weaponRarity={system.traits.rarity}
                                                weaponTraits={system.traits.value?.map((trait) => {
                                                    return trait
                                                })}
                                                diceClient={threeDDiceRef}
                                                die={system.damage.die}
                                                dieCount={system.damage.dice}
                                                weaponRange={system.range}/>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'tab-content equipment'}>
                        <div className={`content ${localStorage.getItem('activeTab') === '3' ? 'active-content' : ''}`}>
                            <div className={'title-underline'}>
                                <div className={'tab-content actions title'}>
                                    <span>Equipment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'tab-content spells'}>
                        <div className={`content ${localStorage.getItem('activeTab') === '2' ? 'active-content' : ''}`}>
                            {
                                characterData?.spells?.map((spellsByLevel, index) => {
                                    const spellType = spellsByLevel.level === 0 ? 'Cantrips' : 'Level ' + spellsByLevel.level
                                    const spellLevelByLevel = Math.ceil(characterData?.level / 2)

                                    return (
                                        spellsByLevel.level <= spellLevelByLevel &&
                                        <SpellBlock key={index}
                                                    spellBlockName={spellType}
                                                    spells={spellsByLevel}
                                                    triggerCharacterDataRefresh={triggerCharacterDataRefresh}>
                                            {spellsByLevel.spells?.map((spell, index) => {
                                                return (
                                                    <Spell key={index}
                                                           spell={spell}
                                                           diceClient={threeDDiceRef}/>
                                                )
                                            })}
                                        </SpellBlock>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={'tab-content actions'}>
                        <div className={`content ${localStorage.getItem('activeTab') === '4' ? 'active-content' : ''}`}>
                            WIP
                        </div>
                    </div>
                    <div className={'tab-content feats-and-abilities'}>
                        <div className={`content ${localStorage.getItem('activeTab') === '5' ? 'active-content' : ''}`}>
                            WIP
                        </div>
                    </div>
                    <div className={'tab-content journal'}>
                        <div className={`content ${localStorage.getItem('activeTab') === '6' ? 'active-content' : ''}`}>
                            <div className={'title-underline'}>
                                <div className={'tab-content notes title'}>
                                    <span>Locations</span>
                                </div>
                            </div>
                            <div contentEditable className={'tab-notes'}
                                 suppressContentEditableWarning={true}
                                 dangerouslySetInnerHTML={{__html: characterData?.journal[0].locations}}/>
                            <div className={'title-underline'}>
                                <div className={'tab-content notes title'}>
                                    <span>Allies</span>
                                </div>
                            </div>
                            <div contentEditable className={'tab-notes'}
                                 suppressContentEditableWarning={true}
                                 dangerouslySetInnerHTML={{__html: characterData?.journal[0].allies}}/>
                            <div className={'title-underline'}>
                                <div className={'tab-content notes title'}>
                                    <span>Enemies</span>
                                </div>
                            </div>
                            <div contentEditable className={'tab-notes'} suppressContentEditableWarning={true}>
                                {characterData?.journal[0].enemies}
                            </div>

                            <div className={'title-underline'}>
                                <div className={'tab-content notes title'}>
                                    <span>Backstory</span>
                                </div>
                            </div>
                            <div contentEditable className={'tab-notes'} suppressContentEditableWarning={true}>
                                {characterData?.journal[0].backstory}
                            </div>

                            <div className={'title-underline'}>
                                <div className={'tab-content notes title'}>
                                    <span>Notes</span>
                                </div>
                            </div>
                            <div contentEditable className={'tab-notes'} suppressContentEditableWarning={true}>
                                {characterData?.journal[0].notes}
                            </div>
                        </div>
                    </div>
                </section>
                <canvas className={'dd-dice-canvas'} ref={canvasRef}/>
            </section>
        </div>
    )
}