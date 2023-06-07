import styled from "styled-components";
import mixins from 'components/style/mixins';

export const ItemImgBox = styled.div`
    position: relative;
    ${mixins.fc};
    width: 126px;
    height: 126px;
    border: 1px solid #eee;
    border-radius: 50%;
    z-index: 10;

    &::after{
        content: '';
        ${mixins.posCenter};
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: #eee;
        z-index: 1;
    }

    ${({ theme }) => theme.laptop`
        width: 116px;
        height: 116px;

        &::after{
            width: 110px;
            height: 110px;
        }
    `};

    ${({ theme }) => theme.tablet`
        margin-right: auto;
    `};

    ${({ theme }) => theme.mobile`
        width: 100px;
        height: 100px;

        &::after{
            width: 95px;
            height: 95px;
        }
    `};
`

export const ItemImg = styled.img`
    position: relative;
    z-index: 10;
    ${mixins.fc};
    width: 120px;
    height:57px;
    object-fit: none;

    ${({ theme }) => theme.laptop`
        width: 50px;
        height: 50px;
        object-fit: contain;
    `};

    ${({ theme }) => theme.mobile`
        width: 38px;
        height: 38px;
    `};
`

export const ItemBox = styled.div`
    ${mixins.fcol}
    row-gap: 10px;

    ${({ theme }) => theme.tablet`
        margin-right: auto;
    `};
`

export const ItemName = styled.strong` 
    font-size: ${({ theme }) => theme.fontSizes.f18};
    ${mixins.font('nexonLv1Gothic', '#333')};

    ${({ theme }) => theme.laptop`
        font-size: ${({ theme }) => theme.fontSizes.f17};
    `};
    
    ${({ theme }) => theme.tablet`
        margin-top: 15px;
    `};

    ${({ theme }) => theme.mobile`
        font-size: ${({ theme }) => theme.fontSizes.f16};
    `};
`

export const ItemDesc = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.f14};
    ${mixins.font('nexonLv1Gothic', '#555')};
    line-height: 19px;

    ${({ theme }) => theme.laptopL`
        max-width: 290px;
        word-break: keep-all;
    `};

    ${({ theme }) => theme.laptop`
        font-size: ${({ theme }) => theme.fontSizes.f13};
    `};

    ${({ theme }) => theme.mobile`
        max-width: initial;
    `};
`

export const ItemTip = styled.span`
    position: relative;
    ${mixins.aic};
    font-size: ${({ theme }) => theme.fontSizes.f12};
    ${mixins.font('nexonLv1Gothic', '#666')};
    padding-left: 8px;

    &::before{
        content: '*';
        position: absolute; 
        top: 0;
        left: 0;
        color: #FF0000;
    }
`