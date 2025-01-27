import type { CSSProperties } from 'react';
import styled from 'styled-components';

type StyledPageProviderProps = {
    $shouldUsePadding?: boolean;
    $usableHeight?: CSSProperties['height'];
};

export const StyledPageProvider = styled.div<StyledPageProviderProps>`
    height: ${({ $usableHeight }) => ($usableHeight ? `${$usableHeight}px` : undefined)};
    position: relative;
    ${({ $shouldUsePadding }) =>
        $shouldUsePadding
            ? `
        padding: 15px 10px 20px;
        @media screen and (min-width: 33.5em) {
            padding: 35px 43px 30px;
        }
    `
            : 'padding: 0px;'}

    .color-scheme-provider:first-child:not(td) {
        & > h1,
        & > .h1,
        & > h2,
        & > .h2,
        & > h3,
        & > .h3,
        & > h4,
        & > .h4,
        & > h5,
        & > .h5 {
            &:first-of-type:first-child {
                margin-top: 0;
            }
        }
    }
`;
