import './SpellBlock.scss'
import SpellSlots from "./SpellSlots";

export default function SpellBlock(props) {

    const {spellBlockName, spells, triggerCharacterDataRefresh} = props

    return (
        <>
            <div className={'title-underline'}>
                <div className={'tab-content actions title'}>
                    <span>{spellBlockName}</span>
                    <SpellSlots spells={spells} triggerCharacterDataRefresh={triggerCharacterDataRefresh}/>
                </div>
            </div>
            <div className={'section-header'}>
                <div className={'section-header-label spell-name-label'}>
                    <span>SPELL NAME</span>
                </div>
                <div className={'section-header-label cast-time'}>
                    <span>CASTING</span>
                </div>
                <div className={'section-header-label spell-save'}>
                    <span>SAVE</span>
                </div>
                <div className={'section-header-label spell-damage'}>
                    <span>DAMAGE</span>
                </div>
                <div className={'section-header-label spell-damage-type'}>
                    <span>TYPE</span>
                </div>
                <div className={'section-header-label spell-range'}>
                    <span>RANGE</span>
                </div>
                <div className={'section-header-label traits'}>
                    <span>TRAITS</span>
                </div>
            </div>
            <div className={'tab-content actions spells'}>
                {props.children}
            </div>
        </>
    )
}
