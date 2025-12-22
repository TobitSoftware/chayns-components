import styled, { css } from 'styled-components';
import { BrowserName, WithTheme } from '@chayns-components/core';

export const StyledPersonFinderBody = styled.div<{ $shouldRenderInline?: boolean }>`
    display: flex;
    flex-direction: column;
    height: ${({ $shouldRenderInline }) => ($shouldRenderInline ? 'auto' : '300px')};
`;

type StyledPersonFinderBodyContentProps = WithTheme<{ $browser: BrowserName }>;

export const StyledPersonFinderBodyContent = styled.div<StyledPersonFinderBodyContentProps>`
    height: 100%;
    overflow-y: auto;
    padding-bottom: 10px;

    // Styles for custom scrollbar
    ${({ $browser, theme }: StyledPersonFinderBodyContentProps) =>
        $browser === 'firefox'
            ? css`
                  scrollbar-color: rgba(${theme['text-rgb']}, 0.15) transparent;
                  scrollbar-width: thin;
              `
            : css`
                  &::-webkit-scrollbar {
                      width: 10px;
                      height: 10px;
                  }

                  &::-webkit-scrollbar-track {
                      background-color: transparent;
                  }

                  &::-webkit-scrollbar-button {
                      background-color: transparent;
                      height: 5px;
                      width: 5px;
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
