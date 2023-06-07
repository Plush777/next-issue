'use client';

import * as BottomNavigationstyled from 'components/style/mobile/BottomNavigation.style';
import { useSelector , useDispatch } from 'react-redux';
import { setGnbActive , setRouterScroll , setToggle} from "redux/store/store";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import SCmode from 'svg/ico-tab01.svg';
import SCkartbody from 'svg/ico-tab02.svg';
import SCcharacter from 'svg/ico-tab03.svg';
import SCtrack from 'svg/ico-tab04.svg';
import SCmore from 'svg/ico-more.svg';
import useBodyScrollLock from 'hooks/useBodyScrollLock';
import { useTranslation } from 'react-i18next';

const BottomNavigation = () => {

    let gnbData = useSelector(state => state.gnb.menus);
    let gnbActiveState = useSelector(state => state.gnbActive);
    let route = useSelector(state => state.commonRoute);
    const dispatch = useDispatch();
    const pathname = usePathname();
    const gnbDataFilter = Object.values(gnbData).filter(item => item.id <= 5);
    const { lockScroll } = useBodyScrollLock(); 
    const { t } = useTranslation();

    const routeList = route.routeList.map(item => item.link);

    const handleClick = (e,index) => { 
        dispatch(setGnbActive(index));
    }

    const handleBottomSheet = () => {
        lockScroll();
        dispatch(setRouterScroll(false));
        dispatch(setToggle({
            bottomSheet: 'active'
        }));
    }

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }

    useLayoutEffect(() => {
        if(pathname.startsWith('/mode')){
            dispatch(setGnbActive(0));
        } else if(pathname.startsWith('/karts')){
            dispatch(setGnbActive(1));
        } else if(pathname.startsWith('/character')){
            dispatch(setGnbActive(3)); 
        } else if (pathname.startsWith('/track')){
            dispatch(setGnbActive(4)); 
        } else if(pathname.startsWith('/')){
            dispatch(setGnbActive(null));
        } 
    },[pathname,dispatch]);     

    return (  
        <BottomNavigationstyled.BottomNavWrap id="aside">
           <div className="menuArea">
                <BottomNavigationstyled.MenuList>
                    {gnbDataFilter.map((item,index) => {

                        const itemId = gnbDataFilter[index].id
                        const itemName = gnbDataFilter[index].name

                        return(
                            <BottomNavigationstyled.MenuItem key={index} 
                            className={`${gnbActiveState === index ? 'active' : ''}${itemId > 4 ? 'disabled' : ''}`}
                            >
                                <BottomNavigationstyled.MenuLink href={routeList[index]} title={itemName}
                                state={itemId === 3 && { background: location }} 
                                onClick={e => {
                                    itemId !== 3 && handleClick(e,index);
                                    itemId === 3 && handleBottomSheet();
                                    gnbActiveState === index && scrollToTop();
                                }}>
                                    {itemId === 1 ? <SCmode fill="#000"/>
                                    : itemId === 2 ? <SCkartbody fill="#000"/>
                                    : itemId === 3 ? <SCmore width="38px" height="38px" fill="none"/>
                                    : itemId === 4 ? <SCcharacter fill="#000"/>
                                    : itemId === 5 ? <SCtrack fill="#818181"/>
                                    : null
                                    }
                                    {itemId === 3 ? <span className="hidden">{t(`menus.group${index+1}.name`)}</span> : <span>{t(`menus.group${index+1}.name`)}</span>}
                                </BottomNavigationstyled.MenuLink>
                                <Outlet/>
                            </BottomNavigationstyled.MenuItem>
                        )
                    })}
                </BottomNavigationstyled.MenuList>
           </div>
        </BottomNavigationstyled.BottomNavWrap>
    );
}

export default BottomNavigation;