import styled from "styled-components";
import mixins from 'components/style/mixins';

export const Wrap = styled.div`
    position: relative;
    ${mixins.jcc};
    border-radius: 4px;
    height: 400px;

    ${({ theme }) => theme.tablet`
        flex-direction: column;
        box-shadow: 0px 5px 5px ${({theme}) => theme.colors.rgbaBlack};
    `};

    ${({ theme }) => theme.mobile`
        height: auto;
    `};

    > .skeleton{
        position: absolute;
    }
`