'use client';

import React, { useEffect } from 'react';
import MainBox from 'components/article/MainBox';
import FootSupport from 'components/article/FootSupport';
import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';
import Visual from 'components/layout/Visual';
import Started from 'components/contents/common/Started';
import { useDispatch , useSelector } from "react-redux";
import { setStartState } from 'redux/store/store';
import FootNotice from 'components/article/FootNotice';
import Alert from "components/mobile/Alert";

const Main = ({ videoIds }) => {
    let dispatch = useDispatch();
    let started = useSelector(state => state.startState);
    let openInNewAlert = useSelector(state => state.openInNew);

    useEffect(() => {
        let timer = setTimeout(() => {
            dispatch(setStartState(false)); 
            return () => clearTimeout(timer);
        }, 3000);

        if(started){
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            window.scrollTo(0,0);
        }
    },[dispatch,started])

    return ( 
        <>  
            {
                started && <Started/> 
            }
            <Header/>
            <main id='main'>
                <Visual/>
                <MainBox videoIds={videoIds}/>
            </main>
            <FootSupport/>
            <FootNotice/>
            <Footer/>
            {openInNewAlert && <Alert/>}
        </>
    );
}

export default Main;