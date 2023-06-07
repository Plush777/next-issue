'use client';

import { useTranslation } from 'react-i18next';
import * as Introstyled from 'components/style/components/sub/Intro.style';
import useImageLoading from 'hooks/useImageLoading';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const NoImage = () => {

    const [loading, handleLoad] = useImageLoading();
    const { t } = useTranslation();
    const language = useSelector(state => state.language);

    const [txt,setTxt] = useState('이미지 준비중이에요.');

    useLayoutEffect(() => {
        if(language === 'ko'){
            setTxt('이미지 준비중이에요.');
        } else if(language === 'en'){
            setTxt('Image is preparing.');
        } else if(language === 'ja'){
            setTxt('画像の準備中です。');
        } else if(language === 'zh'){
            setTxt('图片准备中。');
        }
    },[language])

    return ( 
        <>
            <Introstyled.PreviewImg src="/images/common/img-no-image.webp" alt="준비중 이미지" ratio="136/136" className="auto" 
            onLoad={handleLoad} activeDisplay={loading ? 'none' : 'block'}/>
            <Introstyled.PreviewTxt>{t(txt)}</Introstyled.PreviewTxt>
        </>
    );
}

export default NoImage;