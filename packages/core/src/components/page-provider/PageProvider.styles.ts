import type { CSSProperties } from 'react';
import styled from 'styled-components';

type StyledPageProviderProps = {
    $padding?: CSSProperties['padding'];
    $usableHeight?: CSSProperties['height'];
};

export const StyledPageProvider = styled.div<StyledPageProviderProps>`
    padding: ${({ $padding }) => $padding};
    height: ${({ $usableHeight }) => ($usableHeight ? `${$usableHeight}px` : undefined)};

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
