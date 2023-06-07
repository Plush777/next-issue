'use client';

import FootNotice from "components/article/FootNotice";
import FootSupport from "components/article/FootSupport";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import SubVisual from "components/contents/common/SubVisual";
import PurposeContents from "../../components/contents/PurposeContents";
import Alert from "components/mobile/Alert";
import { useSelector } from "react-redux";
import { M768 } from 'components/style/mobile/MediaQuery';
import BottomNavigation from "components/mobile/BottomNavigation";
import * as Substyled from 'components/style/common/Area.style';
import purposeData from 'locales/ko/etc/purpose.json'; 
import { useState } from "react";

const Purpose = () => {
    const [purposes] = useState(purposeData);
    let openInNewAlert = useSelector(state => state.openInNew);

    return ( 
        <>
            <Header/>
            <Substyled.Main id='main'>
                <SubVisual/>
                <PurposeContents purposes={purposes}/>
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

export default Purpose;