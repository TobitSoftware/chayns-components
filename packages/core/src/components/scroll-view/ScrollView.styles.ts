import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledScrollViewProps = WithTheme<{
    $maxHeight?: CSSProperties['height'] | null;
    $height?: CSSProperties['height'];
    $maxWidth?: CSSProperties['width'];
    $width?: CSSProperties['width'];
    $overflowX: 'scroll' | 'auto';
    $overflowY: 'scroll' | 'auto';
}>;

export const StyledScrollView = styled.div<StyledScrollViewProps>`
    ${({ $maxHeight }) =>
        $maxHeight &&
        css`
            max-height: ${typeof $maxHeight === 'number' ? `${$maxHeight}px` : $maxHeight};
        `}
    ${({ $height }) =>
        $height &&
        css`
            height: ${typeof $height === 'number' ? `${$height}px` : $height};
        `}
    ${({ $maxWidth }) =>
        $maxWidth &&
        css`
            max-width: ${typeof $maxWidth === 'number' ? `${$maxWidth}px` : $maxWidth};
        `}
    ${({ $width }) =>
        $width &&
        css`
            width: ${typeof $width === 'number' ? `${$width}px` : $width};
        `}
    ${({ $overflowX }) => css`
        overflow-x: ${$overflowX};
    `}
    ${({ $overflowY }) => css`
        overflow-y: ${$overflowY};
    `}
`;
