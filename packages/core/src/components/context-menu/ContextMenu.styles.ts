import styled, { css } from 'styled-components';
import { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledContextMenuProps = WithTheme<{
    $isActive: boolean;
    $shouldAddHoverEffect: boolean;
    $shouldUseDefaultTriggerStyles: boolean;
}>;

export const StyledContextMenu = styled.span<StyledContextMenuProps>`
    align-items: center;
    cursor: pointer;
    display: flex;

    ${({ $isActive, $shouldUseDefaultTriggerStyles, theme }: StyledContextMenuProps) =>
        $shouldUseDefaultTriggerStyles
            ? css`
                  background-color: ${$isActive ? theme['201'] : 'transparent'};
                  border-radius: 3px;
                  padding: 6px;
                  transition: background-color 0.3s ease;
              `
            : css`
                  background-color: transparent;
                  border-radius: inherit;
                  padding: 0;

                  > * {
                      width: 100%;
                  }
              `}

    ${({ $shouldAddHoverEffect, theme }: StyledContextMenuProps) =>
        $shouldAddHoverEffect &&
        css`
            &:hover {
                background-color: ${theme['201']};
            }
        `}
`;
