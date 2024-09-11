import type { CSSProperties } from 'react';
import styled from 'styled-components';

type StyledPageProviderProps = {
    $padding?: CSSProperties['padding'];
    $usableHeight?: CSSProperties['height'];
};

export const StyledPageProvider = styled.div<StyledPageProviderProps>`
    padding: ${({ $padding }) => $padding};
    height: ${({ $usableHeight }) => ($usableHeight ? `${$usableHeight}px` : undefined)};
`;
