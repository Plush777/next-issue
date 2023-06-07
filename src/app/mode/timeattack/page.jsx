'use client';

import React from 'react';
import SubTab from 'components/contents/common/SubTab';
import SubVisual from 'components/contents/common/SubVisual';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import FootSupport from 'components/article/FootSupport';
import FootNotice from 'components/article/FootNotice';
import Alert from "components/mobile/Alert";
import { useSelector } from "react-redux";
import { M768 } from 'components/style/mobile/MediaQuery';
import BottomNavigation from "components/mobile/BottomNavigation";
import * as Substyled from 'components/style/common/Area.style';
import TimeAttackContents from 'components/contents/TimeAttackContents';
import timeAttackData from 'locales/ko/mode/singleMode/timeAttack/contents.json';
import { useState } from 'react';

const TimeAttack = () => {
    const [timeAttackContents] = useState(timeAttackData);
    let openInNewAlert = useSelector(state => state.openInNew);
    
    return ( 
        <>
            <Header/>
            <Substyled.Main id='main'>
                <SubVisual/>
                <SubTab/>
                <TimeAttackContents timeAttackContents={timeAttackContents}/>
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

export default TimeAttack;