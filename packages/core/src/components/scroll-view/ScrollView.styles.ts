import type { Browser } from 'detect-browser';
import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledScrollViewProps = WithTheme<{
    $maxHeight: CSSProperties['height'];
    $browser: Browser | 'bot' | null | undefined;
}>;

export const StyledScrollView = styled.div<StyledScrollViewProps>`
    max-height: ${({ $maxHeight }) => $maxHeight};
    overflow-y: scroll;

    // Styles for custom scrollbar
    ${({ $browser, theme }: StyledScrollViewProps) =>
        $browser === 'firefox'
            ? css`
                  scrollbar-color: rgba(${theme['text-rgb']}, 0.15) transparent;
                  scrollbar-width: thin;
              `
            : css`
                  &::-webkit-scrollbar {
                      width: 5px;
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
                  }
              `}
`;
