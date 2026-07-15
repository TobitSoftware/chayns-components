import styled, { css } from 'styled-components';
import { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import {
    keyboardFocusHighlightingCircleRingCss,
    keyboardFocusHighlightingRingCss,
} from '../../utils/keyboardFocusHighlighting.styles';

type StyledContextMenuProps = WithTheme<{
    $isActive: boolean;
    $shouldAddHoverEffect: boolean;
    $shouldShowWrapperKeyboardHighlighting: boolean;
    $shouldUseDefaultTriggerStyles: boolean;
}>;

export const StyledContextMenu = styled.span<StyledContextMenuProps>`
    align-items: center;
    cursor: pointer;
    display: flex;
    position: relative;

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

    ${({
        $shouldShowWrapperKeyboardHighlighting,
        $shouldUseDefaultTriggerStyles,
    }: StyledContextMenuProps) =>
        $shouldShowWrapperKeyboardHighlighting &&
        ($shouldUseDefaultTriggerStyles
            ? css`
                  &:focus-visible {
                      outline: none;
                      box-shadow: none;
                  }

                  &:focus-visible > .beta-chayns-icon {
                      position: relative;
                      color: inherit;
                  }

                  &:focus-visible > .beta-chayns-icon::after {
                      ${keyboardFocusHighlightingCircleRingCss};
                      content: '';
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      width: calc(100% + 8px);
                      height: calc(100% + 8px);
                      transform: translate(-50%, -50%);
                      pointer-events: none;
                  }
              `
            : css`
                  &:focus-visible {
                      outline: none;
                      box-shadow: none;
                  }

                  &:focus-visible > * {
                      ${keyboardFocusHighlightingRingCss}
                  }
              `)}
`;
