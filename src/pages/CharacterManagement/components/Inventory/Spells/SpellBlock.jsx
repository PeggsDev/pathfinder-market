import './SpellBlock.scss'

export default function SpellBlock(props) {
    return (
        <>
            <div className={'title-underline'}>
                <div className={'tab-content actions title'}>
                    <span>{props.spellBlockName}</span>
                </div>
            </div>
            <div className={'section-header'}>
                <div className={'section-header-label spell-name'}>
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
                    <span>TRADITIONS</span>
                </div>
            </div>
            <div className={'tab-content actions spells'}>
                {props.children}
            </div>
        </>
    )
}
