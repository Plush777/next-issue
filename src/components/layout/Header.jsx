'use client';

import Link from 'next/link';
import * as Headerstyled from "components/style/layout/Header.style";
import Gnb from './Gnb';
import { M768, Min768 } from 'components/style/mobile/MediaQuery';
import OpenInNew from 'components/mobile/OpenInNew';
import { useEffect, useMemo, useState , useRef } from 'react';
import { throttle } from 'lodash';
import LangSelect from 'components/article/LangSelect';
import { useTranslation } from 'react-i18next';

const Header = () => {

    const beforeScrollY = useRef(0);
    const [visible, setVisible] = useState(true);
    const ref = useRef();
    const { t } = useTranslation();

    const handleScroll = useMemo(() => 
        throttle(() => {
            const currentScrollY = window.scrollY;

            if(beforeScrollY.current < currentScrollY){
                setVisible(false);
            } else {
                setVisible(true);
            }

            beforeScrollY.current = currentScrollY;

            // console.log(beforeScrollY.current);
        }, 250),[beforeScrollY]);

    useEffect(() => {
        if(window.matchMedia('(max-width: 768px)').matches){
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            }
            
        } else {
            setVisible(null);
        }
    },[handleScroll]);

    return(
        <Headerstyled.Headers className={visible} ref={ref}>
            <Headerstyled.HeaderInner>
                <M768>
                    <LangSelect/>
                </M768>
                <Headerstyled.Logo>
                    <Link href={`/`}title={t(`header.group1.title`)}>
                        <img src="/ico-kart-logo-black-beta.svg" alt={t(`header.group1.title`)}/>
                    </Link>
                </Headerstyled.Logo>
                <Gnb/> 
                <Headerstyled.ShortArea>
                    <a href="https://kartdrift.nexon.com/kartdrift/ko/main" target="_blank" rel='noopener noreferrer'>{t(`header.group2.txt`)}</a>
                </Headerstyled.ShortArea>
                <Min768>
                    <LangSelect/>
                </Min768>

                <M768>
                    <OpenInNew/>
                </M768> 
            </Headerstyled.HeaderInner>
        </Headerstyled.Headers>
    )
}

export default Header;