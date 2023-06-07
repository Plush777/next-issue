import styled from "styled-components";
import mixins from 'components/style/mixins';
import { NavLink } from "react-router-dom";

export const Wrap = styled.div`
    position: fixed;
    width: 100%;
    bottom: 0;
    border-radius: 6px 6px 0 0;
    background-color: ${({ theme }) => theme.colors.fff};
    z-index: 1020;
    transition: .3s ease-in-out;
`

export const Head = styled.div`
    ${mixins.aic};
    justify-content: space-between;
    height: 60px;
    padding: 0 16px;
    border-radius: 6px;
`

export const HeadTitle = styled.strong`
    font-size: ${({ theme }) => theme.fontSizes.f20};
    ${mixins.font('nexonLv1Gothic', '#000')}
`

export const BtnClose = styled.button.attrs({ type: 'button' })`
    position: relative;
    width: 24px;
    height: 24px;
    
    &::before{
        content: '';
        ${mixins.posCenter};
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background-color: transparent;
        z-index: -1;
    }

    &:active{
        &::before{
            background-color: #f3f3f3;
        }
    }
`

export const Body = styled.div`
    
`

export const List = styled.ul`
    ${mixins.fcol};
`

export const ListLink = styled(NavLink)`
    position: relative;
    ${mixins.whFull};
    ${mixins.aic};
    padding-left: 55px;

    &::before{
        content: '';
        width: 42px;
        height: 42px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        border-radius: 50%;
        background-color: #f3f3f3;
    }
`

export const Item = styled.li`
    ${mixins.aic};
    height: 68px;
    font-size: ${({ theme }) => theme.fontSizes.f16};
    ${mixins.font('nexonLv1Gothic', '#000')};
    transition: .3s ease-in-out;
    padding: 0 16px;

    &:active{
        background-color: ${({ theme }) => theme.colors.ddd};
    }

    &.disabled{
        ${mixins.disabled}
        color: rgba(0,0,0,.6);
    }
`