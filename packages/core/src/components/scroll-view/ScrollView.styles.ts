import type { Browser } from 'detect-browser';
import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledScrollViewProps = WithTheme<{
    $maxHeight?: CSSProperties['height'];
    $height?: CSSProperties['height'];
    $maxWidth?: CSSProperties['width'];
    $width?: CSSProperties['width'];
    $overflowX: 'scroll' | 'auto';
    $overflowY: 'scroll' | 'auto';
    $browser: Browser | 'bot' | null | undefined;
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
    ${({ $overflowX }) => css`overflow-x: ${$overflowX};`}
    ${({ $overflowY }) => css`overflow-y: ${$overflowY};`}

    // Styles for custom scrollbar
    ${({ $browser, theme }: StyledScrollViewProps) =>
        $browser === 'firefox'
            ? css`
                  scrollbar-color: rgba(${theme['text-rgb']}, 0.15) transparent;
                  scrollbar-width: thin;
              `
            : css`
                  &::-webkit-scrollbar {
                      width: 10px;
                  }

                  &::-webkit-scrollbar-track {
                      background-color: transparent;
                  }

                  &::-webkit-scrollbar-button {
                      background-color: transparent;
                      height: 5px;
                  }

                  &::-webkit-scrollbar-thumb {
                      background-color: rgba(${theme['text-rgb']}, 0.15);
                      border-radius: 20px;
                      background-clip: padding-box;
                      border: solid 3px transparent;
                  }
            
                  &::-webkit-scrollbar-corner {
                      background-color: transparent;
                  }
              `}
`;
