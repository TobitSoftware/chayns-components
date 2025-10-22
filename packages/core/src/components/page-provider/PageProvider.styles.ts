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

    // ToDo: Remove .h1...
    .color-scheme-provider :is(h1,.h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6):first-child {
        margin-top: 0;
    }
`;
