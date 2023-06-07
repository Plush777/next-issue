'use client';

import * as Selectstyled from 'components/style/common/Select.style';
import SClangSelect from 'svg/ico-lang-select-arrow-down.svg';
import useLanguageSelect from 'hooks/useLanguageSelect';
import langData from 'data/languageList';
import { useState } from 'react';

const LangSelect = () => {

    const { selected, toggle, handleSelectClick, handleToggleSelect, handleSelectLang } = useLanguageSelect();
    const [lang] = useState(langData);
   
    return ( 
        <Selectstyled.SelectArea>
            <Selectstyled.Select onClick={handleToggleSelect} aria-expanded={toggle}>
                <Selectstyled.SelectTxt>{selected.lang}</Selectstyled.SelectTxt>
                <SClangSelect width="20px" height="20px" fill="#333"/>
            </Selectstyled.Select>
            <Selectstyled.OptionList className="scY" maxHeight="150px" top="33px" show={toggle}>
                {
                    lang.lang.map((item,index) => {
                        return (
                            <Selectstyled.OptionItem key={item.id}>
                                <Selectstyled.OptionTxt type02="true" as="span" onClick={(e) => {
                                    handleSelectClick('lang', e)
                                    handleSelectLang(index)
                                }}>{item.name}</Selectstyled.OptionTxt>
                            </Selectstyled.OptionItem>
                        )
                    }) 
                }
            </Selectstyled.OptionList>
        </Selectstyled.SelectArea>
    );
}

export default LangSelect;