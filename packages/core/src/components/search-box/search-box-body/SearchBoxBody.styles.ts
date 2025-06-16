import styled, { css } from 'styled-components';
import { BrowserName } from '../../../types/chayns';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

export const StyledSearchBoxBody = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledSearchBoxBodyHead = styled.div<StyledSearchBoxHeadProps>`
    padding: 10px 10px 5px;
    display: flex;
    flex-direction: column;

    ${({ $hasGroupName }) =>
        $hasGroupName &&
        css`
            gap: 15px;
        `}

    ${({ $hasScrolled }) =>
        $hasScrolled &&
        css`
            box-shadow: 0 1px 4px #0000001a;
        `}
`;

type StyledSearchBoxHeadProps = WithTheme<{ $hasScrolled: boolean; $hasGroupName: boolean }>;

type StyledSearchBoxBodyHeadGroupNameNameProps = WithTheme<unknown>;

export const StyledSearchBoxBodyHeadGroupName = styled.div<StyledSearchBoxBodyHeadGroupNameNameProps>`
    color: ${({ theme }: StyledSearchBoxBodyHeadGroupNameNameProps) => theme.text};
    font-weight: bold;
`;

type StyledSearchBoxBodyContentProps = WithTheme<{
    $height: number;
    $headHeight: number;
    $browser: BrowserName;
}>;

export const StyledSearchBoxBodyContent = styled.div<StyledSearchBoxBodyContentProps>`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    width: 100%;
    max-height: ${({ $headHeight }) => 300 - $headHeight}px;
    overflow-y: ${({ $height, $headHeight }) => ($height + $headHeight <= 300 ? 'hidden' : 'auto')};

    // Styles for custom scrollbar
    ${({ $browser, theme }: StyledSearchBoxBodyContentProps) =>
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
