import type { Browser } from 'detect-browser';
import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledScrollViewProps = WithTheme<{
    $maxHeight?: CSSProperties['height'];
    $height?: CSSProperties['height'];
    $maxWidth?: CSSProperties['width'];
    $width?: CSSProperties['width'];
    $browser: Browser | 'bot' | null | undefined;
}>;

export const StyledScrollView = styled.div<StyledScrollViewProps>`
    ${({ $maxHeight }) =>
        !!$maxHeight &&
        css`
            max-height: ${$maxHeight};
        `}
    ${({ $height }) =>
        !!$height &&
        css`
            height: ${$height};
        `} 
    ${({ $maxWidth }) =>
        !!$maxWidth &&
        css`
            max-width: ${$maxWidth};
        `} 
    ${({ $width }) =>
        !!$width &&
        css`
            width: ${$width};
        `} 
    overflow: auto;

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
              `}
`;
