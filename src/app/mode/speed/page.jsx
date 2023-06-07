'use client';

import React from 'react';
import SubTab from 'components/contents/common/SubTab';
import SubVisual from 'components/contents/common/SubVisual';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import SpeedContents from 'components/contents/SpeedContents';
import FootSupport from 'components/article/FootSupport';
import FootNotice from 'components/article/FootNotice';
import Alert from "components/mobile/Alert";
import { useSelector } from "react-redux";
import { M768 } from 'components/style/mobile/MediaQuery';
import BottomNavigation from "components/mobile/BottomNavigation";
import * as Substyled from 'components/style/common/Area.style';

const SubSpeed = () => {
    let openInNewAlert = useSelector(state => state.openInNew);
    
    return ( 
        <>
            <Header/>
            <Substyled.Main id='main'>
                <SubVisual/>
                <SubTab/>
                <SpeedContents/>
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

export default SubSpeed;