'use client';

import * as BottomSheetstyled from 'components/style/mobile/BottomSheet.style';
import * as Substyled from 'components/style/common/Area.style'; 
import { ReactComponent as SCclose } from 'static/svg/ico-close.svg';
import { ReactComponent as SCdictionary } from 'static/svg/ico-dictionary.svg';
import { ReactComponent as SCskill } from 'static/svg/ico-skill.svg';
import { useSelector , useDispatch } from 'react-redux';  
import useBodyScrollLock from 'hooks/useBodyScrollLock';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { useRef , useLayoutEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { setOutside , setToggle } from 'redux/store/store'; 
import { useTranslation } from 'react-i18next';

const BottomSheet = () => {

    const ref = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { openScroll } = useBodyScrollLock();
    let gnbData = useSelector(state => state.gnb.menus);
    let route = useSelector(state => state.commonRoute);
    const gnbDataFilter = Object.values(gnbData).filter(item => item.id >= 6);
    const [bottomSheetTxt,setBottomSheetTxt] = useState({
        title: '더보기',
        hidden: '닫기'
    });
    const { t } = useTranslation();
    let outsideData = useSelector(state => state.outside);
    let bottomSheetDisplay = useSelector(state => state.toggle);
    const language = useSelector(state => state.language);

    const handleBottomSheetClose = useCallback(() => {
        navigate(-1);
        dispatch(setOutside(false));
        dispatch(setToggle({
            bottomSheet: null
        }));
        openScroll();
    }, [dispatch,openScroll,navigate]);

    useLayoutEffect(() => {
        if(outsideData === true && ref){ //outsideData가 true이면 dimmed와 함께 숨겨짐.
            handleBottomSheetClose();
        }
    },[outsideData,navigate,dispatch,handleBottomSheetClose])

    useOnClickOutside(ref,openScroll);

    useLayoutEffect(() => {
        if(language === 'ko'){
            setBottomSheetTxt({
                title: '더보기',
                hidden: '닫기'
            });
        } else if(language === 'en'){
            setBottomSheetTxt({
                title: 'More',
                hidden: 'Close'
            });
        } else if(language === 'ja'){
            setBottomSheetTxt({
                title: 'もっと見る',
                hidden: '閉じる'
            });
        } else if(language === 'zh'){
            setBottomSheetTxt({
                title: '更多',
                hidden: '关闭'
            });
        }
    },[language]);

    return ( 
        <>
            <BottomSheetstyled.Wrap className={bottomSheetDisplay.bottomSheet}>
                <BottomSheetstyled.Head>
                    <BottomSheetstyled.HeadTitle>{t(`${bottomSheetTxt.title}`)}</BottomSheetstyled.HeadTitle>
                    <BottomSheetstyled.BtnClose onClick={handleBottomSheetClose}>
                        <SCclose width="24px" height="24px" fill="#000"/>
                        <span className="hidden">{t(`${bottomSheetTxt.hidden}`)}</span>
                    </BottomSheetstyled.BtnClose>
                </BottomSheetstyled.Head>

                <BottomSheetstyled.Body>
                    <BottomSheetstyled.List>
                            {gnbDataFilter.map((item,index) => {

                                const itemId = gnbDataFilter[index].id
                                // const itemName = gnbDataFilter[index].name
                                const routeLink = route.routeList.find(routeItem => routeItem.id === itemId).link;

                                return(
                                    <BottomSheetstyled.Item key={itemId} className="disabled">
                                        <BottomSheetstyled.ListLink href={routeLink} title={t(`menus.group${index+6}.name`)}>
                                            {
                                                itemId === 6 ? <Substyled.Ico zIndex="100" left="11px" top="23px"><SCdictionary width="20px" height="20px" fill="#666"/></Substyled.Ico>
                                                : itemId === 7 ? <Substyled.Ico zIndex="100" left="10px" top="24px"><SCskill width="18px" height="18px" fill="#666"/></Substyled.Ico>
                                                : null
                                            }
                                            {t(`menus.group${index+6}.name`)}
                                        </BottomSheetstyled.ListLink>
                                    </BottomSheetstyled.Item>
                                )
                            })}
                    </BottomSheetstyled.List>
                </BottomSheetstyled.Body>
            </BottomSheetstyled.Wrap>
           
            {outsideData === false && <Substyled.DimmedHidden ref={ref}/>}
        </>
    );
}

export default BottomSheet;