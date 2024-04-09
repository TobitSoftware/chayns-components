import type { Browser } from 'detect-browser';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledAccordionContentProps = WithTheme<{
    $isWrapped: boolean;
    $maxHeight?: number;
    $browser: Browser | 'bot' | null | undefined;
}>;

export const StyledAccordionContent = styled.div<StyledAccordionContentProps>`
    color: ${({ theme }: StyledAccordionContentProps) => theme.text};
    padding: ${({ $isWrapped }) => ($isWrapped ? '0 9px 18px 26px' : '0 9px 9px 10px')};

    ${({ $maxHeight }) =>
        typeof $maxHeight === 'number' &&
        css`
            max-height: ${$maxHeight}px;
            overflow-y: scroll;
        `}

    // Styles for custom scrollbar
    ${({ $browser, theme }: StyledAccordionContentProps) =>
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
