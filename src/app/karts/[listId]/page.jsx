'use client';

import React from 'react';
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
import { useState } from 'react';
import kartbodyCommonContentsData from 'locales/ko/kartbody/contents.json';
import KartbodyCommonContents from 'components/contents/KartbodyCommonContents';

const SubCommonKartbody = ({ params }) => {
    const [kartbodyCommon] = useState(kartbodyCommonContentsData);
    let openInNewAlert = useSelector(state => state.openInNew);

    console.log(params.listId);

    return ( 
        <>
            <Header/>
            <Substyled.Main id='main'>
                <SubVisual/>
                <KartbodyCommonContents kartbodyCommon={kartbodyCommon}/>
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

export default SubCommonKartbody;