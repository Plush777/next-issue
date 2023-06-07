'use client';

import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Meta from 'Meta/MetaTag';
import mixins from "components/style/mixins";

const FlexContainer = styled.div`
    ${mixins.fcc}
    height: 100%;
    padding: 0 16px;

    ${({ theme }) => theme.laptopL`
        height: calc(100vh - 120px);
    `}
`
const ImgArea = styled.div`
    ${mixins.jcc}
`

const ErrorImg = styled.img`
    width: 50%;

    ${({ theme }) => theme.tablet`
        width: 358px;
    `}

    ${({ theme }) => theme.small`
        ${mixins.resWidth};
    `}
`

const TxtArea = styled.div`
    margin-top: 30px;
    text-align: center;
`

const ErrorTitle = styled.h1`
    ${mixins.font('nexonLv1Gothic','#333')}
    font-size: 2rem;

    ${({ theme }) => theme.laptopL`
       font-size: 1.75rem
    `}

    ${({ theme }) => theme.tablet`
       font-size: 1.5rem;
    `}
`

const ErrorDesc = styled.p`
    ${mixins.font('nexonLv1Gothic','#666')}
    font-size: 1.125rem;
    margin-top: 10px;

    ${({ theme }) => theme.laptopL`
       font-size: 1rem;
    `}

    ${({ theme }) => theme.tablet`
       font-size: 0.875rem;
    `}
`

const BtnArea = styled.div`
    ${mixins.jcc}
    margin-top: 40px;

    ${({ theme }) => theme.laptopL`
       margin-top: 30px;
    `}

    ${({ theme }) => theme.tablet`
       margin-top: 20px;
    `}
`

const BtnRedirect = styled.button.attrs({type: 'button'})`
    height: 40px;
    padding: 0 15px;
    border-radius: 4px;
    font-size: 1rem;
    background-color: #333;
    ${mixins.font('nexonLv1Gothic','#fff')}

    ${({ theme }) => theme.laptopL`
       font-size: 0.875rem;
    `}
`

const Notfound = () => {

    const navigate = useNavigate();

    const metaData = {
        title: 'KartRider Tips | 404',
        robots: 'noindex, nofollow'
    }

    const errData = {
        title: '찾을 수 없는 페이지입니다.',
        desc: '요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하신 것 같아요.',
        link: '홈으로 이동'
    }

    return ( 
        <>
            <Meta data={metaData}/>
            <FlexContainer>
                <ImgArea>
                    <ErrorImg src="/images/common/img-notfound.webp" alt="에러 이미지" />
                </ImgArea>
                <TxtArea>
                    <ErrorTitle>{errData.title}</ErrorTitle>
                    <ErrorDesc>{errData.desc}</ErrorDesc>
                </TxtArea>
                <BtnArea>
                    <BtnRedirect onClick={() => navigate('/')}>{errData.link}</BtnRedirect>
                </BtnArea>
            </FlexContainer>
        </>
    );
}

export default Notfound;