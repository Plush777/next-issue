import styled from 'styled-components';
import mixins from 'components/style/mixins';

export const Headers = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 65px;
    padding: 0 16px;
    border-bottom: 1px solid #E2E8F0;
    background-color: ${({ theme }) => theme.colors.fff};

    ${({ theme }) => theme.tablet`
        height: 55px;
        top: -65px;
        transition: .25s top ease-in-out;
        padding: 0 10px;

        &.true{
            top: 0;
        }
    `};
`

export const HeaderInner = styled.div`
    ${mixins.aic}
    ${mixins.inner}
    height: 100%;

    ${({ theme }) => theme.tablet`
        position: relative;
        justify-content: space-between;
        column-gap: 10px;
    `};
`

export const Logo = styled.h1`
    img{
        width: 130px;
        height: 29px;

        ${({ theme }) => theme.tablet`
            width: 100%;
            margin: 0 auto;
        `};
    }
`

export const Gnb = styled.nav`
    ${mixins.aic}
    ${mixins.whFull}
    margin-left: 40px;
    ${({ theme }) => theme.tablet`
        display: none;
    `};
`

export const GnbList = styled.ul`
    ${mixins.aic}
    column-gap: 30px; 
    width: 100%;

    ${({ theme }) => theme.laptop`
        column-gap: 20px;
        max-width: 44.516vw;
        overflow-x: auto;
    `};

    @media (max-width: 850px){
        max-width: 40vw;
    }
`

export const GnbItem = styled.li`
    position: relative;
    font-size: ${({ theme }) => theme.fontSizes.f14};
    ${mixins.font('NexonMaplestory', '#333')}

    &.disabled{
        color: rgba(0, 0, 0, 0.6);
        ${mixins.disabled}
    }

    &.active{
        >a{
            color: #1C559C; 
            font-weight: bold;

            &::before{
                width: 100%;
            }
        }
    }

    &.more{
        display: none;
    }

    @media (hover: hover){
            &:hover:not(.active){
                >a{
                    color: #1C559C; 
                    text-shadow: 0 0 .01px #1C559C, 0 0 .01px #1C559C, 0 0 .01px #1C559C;

                    &::before{
                        width: 100%;
                    }
                }
            }
        }

    >a{
        position: relative;
        transition: .3s ease-in-out;

        &::before{
            content: ''; 
            position: absolute; 
            left: 0;
            bottom: -1px;
            width: 0;
            height: 1px; 
            transition: .3s width ease-in-out;
            background-color: #1C559C;
        }
    }

    ${({ theme }) => theme.tablet`
        &.more{
            display: flex;
        }
    `};
`

export const ShortArea = styled.div`
    margin-left: 30px;
    margin-right: 20px;
    font-size: ${({ theme }) => theme.fontSizes.f12};
    ${mixins.font('nexonLv1Gothic', '#666')};

    >a{
        display: block;
        white-space: nowrap;
    }

    ${({ theme }) => theme.tablet`
        display: none;
    `};
`

export const OpenInNewArea = styled.div`
    
`

export const BtnOpenInNew = styled.button.attrs({ type: 'button' })`
    ${mixins.aic}
    width: 18px;
    height: 18px;
    background: url('/images/common/ico-open-in-new.svg') no-repeat center;
`