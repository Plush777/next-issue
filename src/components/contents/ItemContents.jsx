'use client';

import * as Substyled from 'components/style/common/Area.style';
import * as Itemstyled from 'components/style/components/sub/Item.style'
import parse from 'html-react-parser';
import BtnTop from 'components/article/BtnTop'; 
import React, { useState } from 'react';
import useImageLoading from 'hooks/useImageLoading';
import ImgSkeleton from 'components/article/ImgSkeleton';
import useTimeout from 'hooks/useTimeout';
import BtnClipBoard from 'components/article/BtnClipBoard';
import ClipBoardAlert from 'components/article/ClipBoardAlert';
import { useSelector } from 'react-redux';
import { Min768 } from 'components/style/mobile/MediaQuery';
import { useTranslation } from 'react-i18next';
import itemContentsData from 'locales/ko/mode/itemMode/contents.json';

const ItemContents = ({ itemContents }) => {
    
    const [loading, handleLoad] = useImageLoading();
    const [isReady, setReady] = useState(false);
    let clipBoardDisplay = useSelector(state => state.toggle.clipBoard);
    const { t } = useTranslation();

    useTimeout(() => {
        setReady(true);
    },1500);

    return ( 
        <>
            <ClipBoardAlert active={clipBoardDisplay && 'active'}/>
            <Min768>
                <ClipBoardAlert active={clipBoardDisplay && 'active'}/>
            </Min768>

            <Substyled.Wrap>
                <Substyled.Inner>
                    
                    <div className="container">
                        <div className="titleArea">
                            <Substyled.Title>{t(`item.depth1.group1.title`)}</Substyled.Title>
                            <Substyled.Desc>{parse(t(`item.depth1.group1.description`))}</Substyled.Desc>
                        </div>

                        <Substyled.ImgWrap>
                            <Substyled.GroupBox>
                                <Substyled.SmallTitle>{t(`item.depth1.group2.title`)}</Substyled.SmallTitle>
                                <Substyled.SmallDesc>{parse(t(`item.depth1.group2.description`))}</Substyled.SmallDesc>
                            </Substyled.GroupBox>
                            <Substyled.ImgBox mt="20px">
                                {loading && (
                                    <ImgSkeleton mwd="none" pt="56.312"/>
                                )}
                                <Substyled.CommonImg ratio="634/357" src={t(`item.depth1.group2.img`)} alt={t(`item.depth1.group2.alt`)} 
                                onLoad={handleLoad} activeDisplay={loading ? 'none' : 'block'}/>
                                <figcaption className="imgCaption">{t(`item.depth1.group2.caption`)}</figcaption>
                            </Substyled.ImgBox>
                        </Substyled.ImgWrap>

                        <Substyled.GroupContainer>
                            <Substyled.GroupBox>
                                <Substyled.SmallTitle>{t(`item.depth1.group3.title`)}</Substyled.SmallTitle>
                                <Substyled.SmallDesc>{parse(t(`item.depth1.group3.description`))}</Substyled.SmallDesc>
                            </Substyled.GroupBox>
                        </Substyled.GroupContainer>

                        <Substyled.GroupContainer>
                            <Substyled.GroupBox>
                                <Substyled.SmallTitle>{t(`item.depth1.group1.title`)}</Substyled.SmallTitle>
                            </Substyled.GroupBox>

                            <Substyled.ListContainer>
                                <Substyled.ListContainerInner>
                                    <div className="listWrap">
                                        <Substyled.ListBox>
                                            {Object.keys(itemContents.itemList).map((items,index) => {
                                                return(
                                                    <Substyled.ListItem key={index}>
                                                        <Itemstyled.ItemImgBox>
                                                            {isReady ? <Itemstyled.ItemImg src={t(`itemList.group${index+1}.img`)} 
                                                            alt={t(`itemList.group${index+1}.alt`)}/> 
                                                                : 
                                                            <ImgSkeleton type="type02 absolute"/>
                                                            }
                                                        </Itemstyled.ItemImgBox>
                                                        <Itemstyled.ItemBox>
                                                            <Itemstyled.ItemName>{t(`itemList.group${index+1}.name`)}</Itemstyled.ItemName>
                                                            <Itemstyled.ItemDesc>{parse(t(`itemList.group${index+1}.itemDesc`))}</Itemstyled.ItemDesc>
                                                            <Itemstyled.ItemTip>{parse(t(`itemList.group${index+1}.tip`))}</Itemstyled.ItemTip>
                                                        </Itemstyled.ItemBox>
                                                    </Substyled.ListItem>
                                                )
                                            })}
                                        </Substyled.ListBox>
                                    </div>
                                </Substyled.ListContainerInner>
                            </Substyled.ListContainer>
                        </Substyled.GroupContainer>

                        <Substyled.GroupContainer>
                            <Substyled.SmallTitle>{t(`item.depth1.group5.title`)}</Substyled.SmallTitle>
                            <ul className="groupList">
                                {Object.keys(itemContents.itemTips).map((items,index) => {
                                    return(
                                        <Substyled.GroupItem key={index} mt="30px">
                                            <Substyled.MediumTitle>{t(`itemTips.group${index+1}.title`)}</Substyled.MediumTitle>
                                            <Substyled.SmallDesc>{parse(t(`itemTips.group${index+1}.desc`))}</Substyled.SmallDesc>
                                        </Substyled.GroupItem>
                                    )
                                })}
                            </ul>
                        </Substyled.GroupContainer>

                        <Substyled.GroupContainer>
                            <Substyled.SmallTitle>{t(`item.depth1.group6.title`)}</Substyled.SmallTitle>
                            <ul className="groupList">
                                {Object.keys(itemContents.itemTerm).map((items,index) => {
                                    return(
                                        <Substyled.GroupItem key={index} bullet="''" mt="20px">
                                            <Substyled.SmallDesc>{parse(t(`itemTerm.group${index+1}.detail`))}</Substyled.SmallDesc>
                                        </Substyled.GroupItem>
                                    )})
                                }
                            </ul>
                        </Substyled.GroupContainer>
                    </div>
                
                    <BtnClipBoard/>
                    <BtnTop/>
                </Substyled.Inner>
            </Substyled.Wrap>
        </>
        
    )
}

export default ItemContents;