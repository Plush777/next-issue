'use client';

import tabData from 'locales/ko/tab/tab.json';
import { useLayoutEffect, useState , useCallback } from "react";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import * as SubTabstyled from 'components/style/common/Tab.style';
import { useDispatch , useSelector } from "react-redux";
import { setCategoryName, setPageActive } from 'redux/store/store';
import SCmode from 'svg/ico-tab01.svg';
import SCkartbody from 'svg/ico-tab02.svg';
import SCcharacter from 'svg/ico-tab03.svg';
import SCtrack from 'svg/ico-tab04.svg';
import SCbgArrowRight from 'svg/ico-arrow-right.svg';
import { useTranslation } from 'react-i18next';

const SubTab = () => {
    let dispatch = useDispatch();
    let category = useSelector(state => state.categoryName);
    let route = useSelector(state => state.commonRoute);
    let pageActiveState = useSelector(state => state.pageActive);
    let [routePage, setRoutePage] = useState([]);
    let [routeDisabled, setRouteDisabled] = useState('');
    const currentPathname = usePathname();
    const { t } = useTranslation();

    const tabRoute = useCallback(() => {
        return route.tabRoute.map(item => item.link);
    }, [route.tabRoute]);
      
    const characterRoute = useCallback(() => {
        return route.characterRoute.map(item => item.link);
    }, [route.characterRoute]);

    const modeRoutes = [
        '/mode/speed',
        '/mode/item',
        '/mode/grandprix',
        '/mode/timeattack',
        '/mode/customgame',
        '/mode/license',
        '/mode/event'
    ];

    const characterRoutes = [
        '/character/common',
        '/character/rare',
        '/character/advenced',
        '/character/epic',
        '/character/legend',
    ]

    const modeRouteFilter = modeRoutes.map(item => item).filter(item => item);
    const characterRouteFilter = characterRoutes.map(item => item).filter(item => item);
   
    useLayoutEffect(() => {
        if(currentPathname.startsWith('/mode/speed')){
            dispatch(setPageActive({mode: 0}));
        } else if(currentPathname.startsWith('/mode/item')){
            dispatch(setPageActive({mode: 1}));
        } else if(currentPathname.startsWith('/mode/grandprix')){
            dispatch(setPageActive({mode: 2}));
        } else if(currentPathname.startsWith('/mode/timeattack')){
            dispatch(setPageActive({mode: 3}));
        } else if(currentPathname.startsWith('/mode/customgame')){
            dispatch(setPageActive({mode: 4}));
        } else if(currentPathname.startsWith('/mode/license')){
            dispatch(setPageActive({mode: 5}));
        } else if(currentPathname.startsWith('/mode/event')){
            dispatch(setPageActive({mode: 6}));
        }
    },[currentPathname,dispatch]);

    useLayoutEffect(() => {
        if(currentPathname.startsWith('/character/common')){
            dispatch(setPageActive({character: 0}));
        } else if(currentPathname.startsWith('/character/rare')){
            dispatch(setPageActive({character: 1}));
        } else if(currentPathname.startsWith('/character/advenced')){
            dispatch(setPageActive({character: 2}));
        } else if(currentPathname.startsWith('/character/epic')){
            dispatch(setPageActive({character: 3}));
        } else if(currentPathname.startsWith('/character/legend')){
            dispatch(setPageActive({character: 4}));
        }
    },[currentPathname,dispatch]);

    useLayoutEffect(() => {
        if(currentPathname.startsWith('/mode')){
            dispatch(setCategoryName(
                {
                    imgNum: '1',
                    txtNum: '1',
                    tabDataState: 'mode'
                }
            ));
            setRoutePage(tabRoute);
        } else if(currentPathname.startsWith('/karts')){
            dispatch(setCategoryName(
                {
                    imgNum: '2',
                    txtNum: null,
                    tabDataState: null
                }
            ));
            setRoutePage([]);
        } else if(currentPathname.startsWith('/character')){
            dispatch(setCategoryName(
                {
                    imgNum: '3',
                    txtNum: '3',
                    tabDataState: 'character'
                }
            ));
            setRoutePage(characterRoute);
            setRouteDisabled('disabled');
        }
    },[currentPathname,dispatch,tabRoute,characterRoute]);

    return ( 
        <SubTabstyled.TabWrap> 
            <SubTabstyled.TabWrapInner>
                <SubTabstyled.TabInfo>
                    {category.imgNum === '1' ? <SCmode fill="#818181"/>
                    : category.imgNum === '2' ? <SCkartbody fill="#818181"/>
                    : category.imgNum === '3' ? <SCcharacter fill="#818181"/>
                    : category.imgNum === '4' ? <SCtrack fill="#818181"/>
                    : null 
                    }

                    <SubTabstyled.TabInfoTxt>{t(`info.group${category.imgNum}.name`)}</SubTabstyled.TabInfoTxt>
                    <SCbgArrowRight width="22px" height="22px"/>
                </SubTabstyled.TabInfo>
                <SubTabstyled.TabList className="miniX">
                    {category.tabDataState === 'mode' &&
                        Object.keys(tabData.mode).map((item, index) => {
                            return (
                                <SubTabstyled.TabItem className={index > 0 && routeDisabled} key={index}>
                                    <Link className={pageActiveState.mode === index ? 'active' : null} 
                                    href={modeRouteFilter[index]}>{t(`mode.group${index+1}.name`)}</Link>
                                </SubTabstyled.TabItem>
                        )})
                    }

                    {category.tabDataState === 'character' &&
                        Object.keys(tabData.character).map((item, index) => {
                            return (
                                <SubTabstyled.TabItem className={index > 0 && routeDisabled} key={index}>
                                    <Link className={pageActiveState.character === index ? 'active' : null} 
                                    href={characterRouteFilter[index]}>{t(`character.group${index+1}.name`)}</Link>
                                </SubTabstyled.TabItem>
                        )})
                    }
                </SubTabstyled.TabList>
            </SubTabstyled.TabWrapInner>
        </SubTabstyled.TabWrap>
    );
}

export default SubTab;