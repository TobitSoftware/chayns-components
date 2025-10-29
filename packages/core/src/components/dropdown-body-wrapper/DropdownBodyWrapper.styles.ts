import styled, { css } from 'styled-components';
import { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import { DropdownDirection } from './Dropdown.types';

export const StyledDropdownBodyWrapper = styled.div``;

type StyledDropdownBodyWrapperContentProps = WithTheme<{
    $width: number;
    $maxHeight: number;
    $minWidth: number;
    $direction: DropdownDirection;
}>;

export const StyledDropdownBodyWrapperContent = styled.div<StyledDropdownBodyWrapperContentProps>`
    width: ${({ $width }) => $width}px;
    max-height: ${({ $maxHeight }) => $maxHeight}px;
    min-width: ${({ $minWidth }) => $minWidth}px;

    // Basic styles
    background: ${({ theme }: StyledDropdownBodyWrapperContentProps) => theme['000']};
    border: 1px solid rgba(160, 160, 160, 0.3);
    overflow: hidden;
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
`;
