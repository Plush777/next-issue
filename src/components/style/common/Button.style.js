import styled from 'styled-components';
import mixins from 'components/style/mixins';

export const BtnArea = styled.div`
    ${mixins.jcc};
    width: 100%;
    margin-top: 25px;
`

export const Btn = styled.button.attrs({ type: 'button' })`
    ${mixins.aic};
    justify-content: center;
    height: ${props => props.height};
    padding: ${props => props.padding};
    border: ${props => props.border};
    border-radius: ${props => props.radius};
    background-color: ${props => props.background};
    color: ${props => props.color};
    font-family: 'nexonLv1Gothic';
    font-size: ${props => props.fontSize};

    &.white{
        ${({ theme }) => theme.laptop`
            height: 50px;
            font-size: ${({ theme }) => theme.fontSizes.f18};
        `}

        ${({ theme }) => theme.tablet`
            height: 44px;
            font-size: ${({ theme }) => theme.fontSizes.f16};
        `}

        ${({ theme }) => theme.small`
            max-width: 87px; 
            height: 38px;
            font-size: ${({ theme }) => theme.fontSizes.f14};
        `}
    }
`