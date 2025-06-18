import styled, { css } from 'styled-components';
import { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import { DropdownDirection } from '../../types/dropdown';
import type { CSSProperties } from 'react';
import { BrowserName } from '../../types/chayns';

export const StyledDropdownBodyWrapper = styled.div``;

type StyledDropdownBodyWrapperContentProps = WithTheme<{
    $width: number;
    $maxHeight: number;
    $translateX: string;
    $translateY: string;
    $minWidth: number;
    $direction: DropdownDirection;
    $overflowY: CSSProperties['overflowY'];
    $browser: BrowserName;
}>;

export const StyledDropdownBodyWrapperContent = styled.div<StyledDropdownBodyWrapperContentProps>`
    width: ${({ $width }) => $width}px;
    max-height: ${({ $maxHeight }) => $maxHeight}px;
    min-width: ${({ $minWidth }) => $minWidth}px;
    transform: ${({ $translateX, $translateY }) => `translate(${$translateX}, ${$translateY})`};
    overflow-y: ${({ $overflowY }) => $overflowY};

    // Basic styles
    background: ${({ theme }: StyledDropdownBodyWrapperContentProps) => theme['000']};
    position: absolute;
    z-index: 4;
    border: 1px solid rgba(160, 160, 160, 0.3);
    overflow-x: hidden;
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledDropdownBodyWrapperContentProps) => theme['009-rgb']}, 0.08) inset;

    ${({ $direction }) => {
        if (
            [
                DropdownDirection.BOTTOM,
                DropdownDirection.BOTTOM_LEFT,
                DropdownDirection.BOTTOM_RIGHT,
            ].includes($direction)
        ) {
            return css`
                border-bottom-left-radius: 3px;
                border-bottom-right-radius: 3px;
                box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);
            `;
        }

        return css`
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
            box-shadow: 0 -3px 10px 0 rgba(0, 0, 0, 0.2);
        `;
    }}

    // Styles for custom scrollbar
    ${({ $browser, theme }: StyledComboBoxBodyProps) =>
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
