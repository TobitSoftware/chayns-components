import styled, { css } from 'styled-components';
import { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledContextMenuProps = WithTheme<{
    $isActive: boolean;
    $shouldAddHoverEffect: boolean;
}>;

export const StyledContextMenu = styled.span<StyledContextMenuProps>`
    align-items: center;
    background-color: ${({ $isActive, theme }: StyledContextMenuProps) =>
        $isActive ? theme['201'] : 'transparent'};
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    padding: 6px;
    transition: background-color 0.3s ease;

    ${({ $shouldAddHoverEffect, theme }: StyledContextMenuProps) =>
        $shouldAddHoverEffect &&
        css`
            &:hover {
                background-color: ${theme['201']};
            }
        `}
`;
