import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import { keyboardFocusHighlightingRingCss } from '../../utils/keyboardFocusHighlighting.styles';

type StyledTagInputProps = WithTheme<{
    $shouldChangeColor: boolean;
    $shouldShowKeyboardHighlighting: boolean;
    $shouldShowTagHighlighting: boolean;
}>;

type StyledTagInputTagFocusWrapperProps = {
    $isSelected: boolean;
    $shouldShowKeyboardHighlighting: boolean;
};

export const StyledTagInput = styled.div<StyledTagInputProps>`
    display: flex;
    flex-wrap: wrap;
    min-height: 42px;
    padding: 5px;
    align-items: center;
    gap: 6px;
    background-color: ${({ theme, $shouldChangeColor }: StyledTagInputProps) =>
        theme.colorMode === 'classic' || $shouldChangeColor ? theme['000'] : theme['100']};
    border: 1px solid rgba(160, 160, 160, 0.3);

    ${({ $shouldShowKeyboardHighlighting, $shouldShowTagHighlighting }) =>
        $shouldShowKeyboardHighlighting &&
        !$shouldShowTagHighlighting &&
        css`
            &:focus-within {
                transition: none;
                ${keyboardFocusHighlightingRingCss}
            }
        `}
`;

export const StyledTagInputTagWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const StyledTagInputTagFocusWrapper = styled.div<StyledTagInputTagFocusWrapperProps>`
    display: inline-flex;

    ${({ $isSelected, $shouldShowKeyboardHighlighting }) =>
        $isSelected &&
        $shouldShowKeyboardHighlighting &&
        css`
            ${StyledTagInput}:focus-within & > .beta-chayns-badge {
                transition: none;
                ${keyboardFocusHighlightingRingCss}
                border-radius: 999px;
                outline-offset: 0;
            }
        `}
`;

export const StyledTagInputTagWrapperText = styled.p`
    margin: 0;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 15px;
`;

type StyledTagInputTagInputProps = WithTheme<unknown>;

export const StyledTagInputTagInput = styled.input<StyledTagInputTagInputProps>`
    border: none;
    height: 24px;
    flex-grow: 1;
    background-color: transparent;
    color: ${({ theme }: StyledTagInputTagInputProps) => theme.text};
`;

export const StyledTagInputIconWrapper = styled.div`
    align-items: baseline;
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    margin-left: 5px;
`;
