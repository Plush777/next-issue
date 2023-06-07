'use client';

import FootNotice from "components/article/FootNotice";
import FootSupport from "components/article/FootSupport";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import SubVisual from "components/contents/common/SubVisual";
import SourceContents from "../../components/contents/SourceContents";
import Alert from "components/mobile/Alert";
import BottomNavigation from "components/mobile/BottomNavigation";
import { useSelector } from "react-redux";
import { M768 } from 'components/style/mobile/MediaQuery';
import * as Substyled from 'components/style/common/Area.style';
import sourceData from 'locales/ko/etc/source.json';
import { useState } from "react";

const Source = () => {
    const [sources] = useState(sourceData);
    let openInNewAlert = useSelector(state => state.openInNew);

    return ( 
        <>
            <Header/>
            <Substyled.Main id='main'>
                <SubVisual/>
                <SourceContents sources={sources}/>
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

export default Source;