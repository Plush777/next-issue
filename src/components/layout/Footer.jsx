'use client';

import React from 'react';
import * as Footerstyled from 'components/style/layout/Footer.style';
import Link from 'next/link';
import { useSelector } from "react-redux";
import { M500 } from 'components/style/mobile/MediaQuery';
import { useTranslation } from 'react-i18next';

const Footer = () => {

    let footerData = useSelector(state => state.footer);
    let inquiryData = useSelector(state => state.inquiry);
    let route = useSelector(state => state.commonRoute);
    const { t } = useTranslation();

    const copy = {
        txt: '2023 KARTRIDER TIPS',
        alt: '푸터 카트라이더 팁스 로고'
    }

    const imgs = [
        {
            "src": "/images/common/ico-naver.png"
        },
        {
            "src": "/images/common/ico-github.svg"
        },
        {
            "src": "/images/common/ico-instagram.png"
        }
    ];

    const imgSpread = imgs.map(item => item.src);
    const routeSpread = route.footerRoute.map(item => item.link);

    return (  
        <Footerstyled.FooterWrap>
            <Footerstyled.FooterInner>
                <Footerstyled.LogoArea>
                    <Footerstyled.Logo src='/ico-kart-logo-grayscale.svg' alt={copy.alt}/>
                </Footerstyled.LogoArea>
                <Footerstyled.CopyRightArea>
                    <Footerstyled.Copy>{copy.txt}</Footerstyled.Copy>
                </Footerstyled.CopyRightArea>
                
                <Footerstyled.BottomArea>
                    <Footerstyled.BottomMenu> 
                        {Object.keys(footerData.data).map((item,index) => {

                            const itemId = footerData.data[item].id;

                            return(
                                itemId > 4 ? null : 
                                <Footerstyled.BottomItem as="li" key={index}>
                                    {itemId === 3 ? <a href="https://forms.gle/4i8vvDYz9VbLbJGN9" target="_blank" rel="noopener noreferrer">{t(`data.group${index+1}.name`)}</a>
                                    :
                                    <Link href={routeSpread[index]}>{t(`data.group${index+1}.name`)}</Link>
                                    }
                                </Footerstyled.BottomItem>
                            )
                        })}
                    </Footerstyled.BottomMenu>
                </Footerstyled.BottomArea>

                <M500>
                    <Footerstyled.BottomLogoArea>
                        <Footerstyled.BottomLogo src="/ico-footer-logo-grayscale.svg" alt={copy.alt}/>
                        <Footerstyled.BottomLogoTxt>{copy.txt}</Footerstyled.BottomLogoTxt>
                    </Footerstyled.BottomLogoArea>
                </M500>
            </Footerstyled.FooterInner>

            <Footerstyled.Row>
                <Footerstyled.Hits>
                    <a href="https://hits.sh/kartrider-tips.vercel.app/hits/">
                        <img alt="Hits" src="https://hits.sh/kartrider-tips.vercel.app/hits.svg?view=today-total&style=for-the-badge&label=today&color=309ED5&labelColor=222"/>
                        <span className="hidden">{t(`data.group6.name`)}</span>
                    </a>
                </Footerstyled.Hits>

                <div>
                    <Footerstyled.LinkList>
                        {Object.keys(inquiryData.listInquiry).map((item,index) => {

                            const itemLink = inquiryData.listInquiry[item].link;

                            return(
                                <li key={index}>
                                    <a href={itemLink} target="_blank" rel='noopener noreferrer'>
                                        <span className="hidden">{t(`data.group5.name`)}</span>
                                        <img src={imgSpread[index]} alt=""/>
                                    </a>
                                </li>
                            )})
                        }
                    </Footerstyled.LinkList>
                </div>
            </Footerstyled.Row>
           
        </Footerstyled.FooterWrap>
    );
}

export default Footer;