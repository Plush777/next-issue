'use client';

import SubTab from "components/contents/common/SubTab";
import SubVisual from "components/contents/common/SubVisual";
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import FootSupport from 'components/article/FootSupport';
import CharacterCommonContents from "components/contents/CharacterCommonContents";
import FootNotice from "components/article/FootNotice";
import Alert from "components/mobile/Alert";
import { useSelector } from "react-redux";
import { M768 } from 'components/style/mobile/MediaQuery';
import BottomNavigation from "components/mobile/BottomNavigation";
import * as Substyled from 'components/style/common/Area.style';
import characterCommonContentsData from 'locales/ko/character/common/contents.json';
import { useState } from "react";

const SubCommonCharacter = () => {

    const [characterCommon] = useState(characterCommonContentsData);
    let openInNewAlert = useSelector(state => state.openInNew);

    return ( 
        <>
            <Header/>
            <Substyled.Main id='main'>
                <SubVisual/>
                <SubTab/>
                <CharacterCommonContents characterCommon={characterCommon}/>
                <FootSupport/>
                <FootNotice/>
                <Footer/>
            </Substyled.Main>
            <M768>
                <BottomNavigation/>
            </M768>
            {openInNewAlert && <Alert/>}
        </>
    );
}

export default SubCommonCharacter;