import styled from "styled-components";
import mixins from 'components/style/mixins';

export const BottomNavWrap = styled.aside`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    border-top: 1px solid #ececec;
    background-color: ${({ theme }) => theme.colors.fff};
    z-index: 1000;
`

export const MenuList = styled.ul`
    ${mixins.aic};
`

export const MenuLink = styled.a`
    ${mixins.fcc};
    row-gap: 2px;
    font-size: ${({ theme }) => theme.fontSizes.f12};
    font-family: 'NexonMaplestory';
`

export const MenuItem = styled.li`
    ${mixins.jcc};
    flex: 1;
    height: 55px;
    padding: 6px 0;

    &.disabled{
        color: rgba(0, 0, 0, 0.6);
        ${mixins.disabled}; 
    }

    &.active{
        a{
            color: #1C559C; 
            font-weight: bold;
        }
        
        svg{
            fill: #1C559C;
        }
    }

    ${({ theme }) => theme.mobile`
        >svg{
            width: 22px;
            height: 22px;
        }
    `};

    ${({ theme }) => theme.small`
        font-size: ${({ theme }) => theme.fontSizes.f11};
        >svg{
            width: 20px;
            height: 20px;
        }
    `};
`