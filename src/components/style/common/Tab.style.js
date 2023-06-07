import styled from "styled-components";
import mixins from 'components/style/mixins';

export const TabWrap = styled.div`
    width: 100%;
    height: 80px;
    background-color: ${({ theme }) => theme.colors.fff};

    ${({ theme }) => theme.tablet`
        height: 60px;
    `};
`

export const TabWrapInner = styled.div`
    position: relative;
    ${mixins.aic}
    ${mixins.inner}
    column-gap: 20px;
    height: 100%;
    padding: 15px 16px;

    ${({ theme }) => theme.small`
        padding: 15px 10px;
    `};
`

export const TabInfo = styled.div`
    ${mixins.aic};
    min-width: 125px;
    height: 50px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 25px;
    border: 1px solid ${({ theme }) => theme.colors.ddd};
    background-color: #f2f2f2;

    svg{
        overflow: visible;
        width: 20px;
    }

    ${({ theme }) => theme.tablet`
        display: none;
    `};
`

export const TabInfoTxt = styled.span`
    ${mixins.fc}
    width: 100%;
    ${mixins.font('nexonLv1Gothic', '#626262')}
    position: relative;
    font-size: ${({ theme }) => theme.fontSizes.f14};
    margin-left: 5px;
    margin-right: 10px;

    ${({ theme }) => theme.tablet`
        width: auto;
        font-size: ${({ theme }) => theme.fontSizes.f12};
        margin-left: 3px;
    `};
`

export const TabList = styled.ul`
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;

    ${({ theme }) => theme.tablet`
         &::-webkit-scrollbar{
            display: none;
        }
    `};
`

export const TabItem = styled.li`
    >a{
        ${mixins.fc}
        ${mixins.font('nexonLv1Gothic', '#333')}
        min-width: 110px;
        height: 50px;
        border-radius: 25px;
        font-size: ${({ theme }) => theme.fontSizes.f18};

        &.active{
            color: #fff;
            background-color: ${({ theme }) => theme.colors.c333};
        }
    }

    &.disabled > a{
        color: rgba(0, 0, 0, 0.6);
        ${mixins.disabled}
    }

    ${({ theme }) => theme.tablet`
        ${mixins.aic};
        >a{
            width: 90px;
            height: 40px;
            font-size: ${({ theme }) => theme.fontSizes.f14};
        }   
    `};
`