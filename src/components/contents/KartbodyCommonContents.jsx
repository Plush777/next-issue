'use client';

import * as Substyled from 'components/style/common/Area.style';
import * as Tabstyled from 'components/style/components/sub/TabComponent.style';
import * as Introstyled from 'components/style/components/sub/Intro.style';
import parse from 'html-react-parser';
import BtnTop from 'components/article/BtnTop';
import Link from 'next/link';
import { useDispatch , useSelector } from 'react-redux';
import { setRouterScroll } from 'redux/store/store';
import { M768 } from 'components/style/mobile/MediaQuery';
import Select from 'components/mobile/Select';
import * as Previewstyled from 'components/style/mobile/Preview.style';
import useImageLoading from 'hooks/useImageLoading';
import ImgSkeleton from 'components/article/ImgSkeleton';
import BtnClipBoard from 'components/article/BtnClipBoard';
import ClipBoardAlert from 'components/article/ClipBoardAlert';
import { Min768 } from 'components/style/mobile/MediaQuery';
import { useTranslation } from 'react-i18next';
import NoImage from 'components/article/NoImage';

const KartbodyCommonContents = ({ kartbodyCommon }) => {

    const { t } = useTranslation();
    let kartDescDepth = Object.keys(kartbodyCommon.kartDescDepth).map((item,index) => kartbodyCommon.kartDescDepth[item]);

    let dispatch = useDispatch();
    let clipBoardDisplay = useSelector(state => state.toggle.clipBoard);

    const [loading, handleLoad] = useImageLoading();

    const handleScrollState = () => {
        dispatch(setRouterScroll(false));
    }

    const itemMap = {
        4: 'cotton',
        5: 'burst',
        6: 'solid',
        7: 'marathon',
        8: 'saver',
        15: 'play',
        16: 'nexon',
        17: 'ios',
        18: 'steam',
    };
   
    return ( 
        <>
            <Min768>
                <ClipBoardAlert active={clipBoardDisplay && 'active'}/>
            </Min768>

            <Substyled.Wrap>
                <Substyled.Inner>
                    <div className="container">
                        <div className="titleArea">
                            <Substyled.Title>{t(`kartbody.group1.title`)}</Substyled.Title>
                        </div>
                    </div>
                    
                    <Tabstyled.TabWrap mt="20px">
                        <Tabstyled.TabInner>
                            <Tabstyled.TabList>
                                {Object.keys(kartbodyCommon.kartName).map((items,index) => {

                                    const itemId = kartbodyCommon.kartName[items].id;

                                    return(
                                        <Tabstyled.TabItem key={index}>
                                            <Link href={`/karts/${itemId}`} 
                                            onClick={handleScrollState}>
                                                {itemMap[itemId] && loading &&
                                                    <ImgSkeleton type="type03 absolute default" mwd="none"/>
                                                }
                                                {
                                                    itemMap[itemId] && (<Tabstyled.TabItemImg src={`/images/common/ico-${itemMap[itemId]}.webp`} 
                                                    alt="" onLoad={handleLoad} activeDisplay={loading ? 'none' : 'block'} 
                                                    className={itemMap[itemId]}/>)
                                                }
                                                {t(`kartName.group${index+1}.name`)}
                                            </Link>
                                        </Tabstyled.TabItem>
                                    )
                                })}
                            </Tabstyled.TabList>
                        </Tabstyled.TabInner>
                    </Tabstyled.TabWrap>

                    <M768>
                        <Select/>
                        
                        <Previewstyled.Wrap>
                            {loading && (
                                <ImgSkeleton pt="68.526" mwd="none"/>
                            )}
                            
                            {
                                kartDescDepth[id - 1].img === '' ? 
                                <NoImage/>
                                :
                                <Introstyled.PreviewImg src={kartDescDepth[id - 1].img} alt={kartDescDepth[id - 1].alt} ratio="445/305" className="auto" onLoad={handleLoad}
                                activeDisplay={loading ? 'none' : 'block'}/>
                            }
                        </Previewstyled.Wrap>
                        
                    </M768>

                    <Tabstyled.TabContentWrap>
                        <Tabstyled.TabContentInner>
                            <Tabstyled.TabContnetBox>
                                <Tabstyled.TabContent>
                                    <Introstyled.Top>
                                        <Introstyled.Title>{t(`kartName.group${id}.name`)}</Introstyled.Title>
                                        <Introstyled.Desc>{parse(t(`kartDesc.group${id}.desc`))}</Introstyled.Desc>
                                    </Introstyled.Top>
                                    <div className="bottom">
                                        <Introstyled.RowList>
                                            <Introstyled.Row>
                                                <Introstyled.RowTitle>{t(`kartDescDepth.group${id}.title`)}</Introstyled.RowTitle>
                                                <Introstyled.RowDesc as="dd">{t(`kartDescDepth.group${id}.desc`)}</Introstyled.RowDesc>
                                            </Introstyled.Row>
                                            <Introstyled.Row>
                                                <Introstyled.RowTitle>{t(`kartDescDepth.group${id}.title2`)}</Introstyled.RowTitle>
                                                <Introstyled.RowDesc as="dd">{parse(t(`kartDescDepth.group${id}.desc2`))}</Introstyled.RowDesc>
                                            </Introstyled.Row>
                                            <Introstyled.Row>
                                                <Introstyled.RowTitle>{t(`kartDescDepth.group${id}.title3`)}</Introstyled.RowTitle>
                                                <Introstyled.RowDesc as="dd">{parse(t(`kartDescDepth.group${id}.desc3`))}</Introstyled.RowDesc>
                                            </Introstyled.Row>
                                        </Introstyled.RowList>
                                    </div>
                                </Tabstyled.TabContent>

                                <Tabstyled.TabContent>
                                   
                                    <Introstyled.PreviewArea>
                                        {loading && (
                                            <ImgSkeleton pt="68.54" mwd="none"/>
                                        )}
                                         
                                        {
                                            kartDescDepth[id - 1].img === '' ? 
                                            <NoImage/>
                                            :
                                            <Introstyled.PreviewImg src={kartDescDepth[id - 1].img} alt={kartDescDepth[id - 1].alt} ratio="445/305" className="auto" onLoad={handleLoad}
                                            activeDisplay={loading ? 'none' : 'block'}/>
                                        }
                                    </Introstyled.PreviewArea>
                                </Tabstyled.TabContent>
                            </Tabstyled.TabContnetBox>
                        </Tabstyled.TabContentInner>
                    </Tabstyled.TabContentWrap>
                    
                    <BtnClipBoard/>
                    <BtnTop/>
                </Substyled.Inner>
            </Substyled.Wrap>
        </>
     );
}

export default KartbodyCommonContents;