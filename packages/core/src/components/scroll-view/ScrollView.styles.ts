import type { CSSProperties } from 'react';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledScrollViewProps = WithTheme<{ maxHeight: CSSProperties['height'] }>;

export const StyledScrollView = styled.div<StyledScrollViewProps>`
    max-height: ${({ maxHeight }) => maxHeight};
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(160, 160, 160, 1);
    }
`;
