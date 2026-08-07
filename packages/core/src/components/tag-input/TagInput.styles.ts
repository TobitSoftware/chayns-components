import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import type { InputSize } from '../input/Input';

type StyledTagInputProps = WithTheme<{
    $shouldChangeColor: boolean;
    $shouldShowKeyboardHighlighting: boolean;
    $shouldShowTagHighlighting: boolean;
    $size: InputSize;
}>;

type StyledTagInputTagFocusWrapperProps = {
    $isSelected: boolean;
    $shouldShowKeyboardHighlighting: boolean;
};

export const StyledTagInput = styled.div<StyledTagInputProps>`
    display: flex;
    flex-wrap: wrap;
    min-height: ${({ $size }) => ($size === 'medium' ? '42px' : '32px')};
    padding: ${({ $size }) => ($size === 'medium' ? '5px' : '4px')};
    align-items: center;
    gap: ${({ $size }) => ($size === 'medium' ? '6px' : '4px')};
    background-color: ${({ theme, $shouldChangeColor }: StyledTagInputProps) =>
        theme.colorMode === 'classic' || $shouldChangeColor ? theme['000'] : theme['100']};
    border: 1px solid rgba(160, 160, 160, 0.3);

    ${({ $shouldShowKeyboardHighlighting, $shouldShowTagHighlighting }) =>
        $shouldShowKeyboardHighlighting &&
        !$shouldShowTagHighlighting &&
        css`
            &:focus-within {
                transition: none;
            }
        `}
`;

type StyledTagInputTagWrapperProps = {
    $size: InputSize;
};

export const StyledTagInputTagWrapper = styled.div<StyledTagInputTagWrapperProps>`
    display: flex;
    align-items: center;
    gap: ${({ $size }) => ($size === 'medium' ? '4px' : '2px')};
`;

export const StyledTagInputTagFocusWrapper = styled.div<StyledTagInputTagFocusWrapperProps>`
    display: inline-flex;

    ${({ $isSelected, $shouldShowKeyboardHighlighting }) =>
        $isSelected &&
        $shouldShowKeyboardHighlighting &&
        css`
            ${StyledTagInput}:focus-within & > .beta-chayns-badge {
                transition: none;

                border-radius: 999px;
                outline-offset: 0;
            }
        `}
`;

type StyledTagInputTagWrapperTextProps = {
    $size: InputSize;
};

export const StyledTagInputTagWrapperText = styled.p<StyledTagInputTagWrapperTextProps>`
    margin: 0;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${({ $size }) => ($size === 'medium' ? '15px' : '13px')};
`;

type StyledTagInputTagInputProps = WithTheme<{
    $size: InputSize;
}>;

export const StyledTagInputTagInput = styled.input<StyledTagInputTagInputProps>`
    border: none;
    height: ${({ $size }) => ($size === 'medium' ? '24px' : '20px')};
    flex-grow: 1;
    background-color: transparent;
    color: ${({ theme }: StyledTagInputTagInputProps) => theme.text};
    font-size: ${({ $size }) => ($size === 'medium' ? '15px' : '13px')};
`;

type StyledTagInputIconWrapperProps = {
    $size: InputSize;
};

export const StyledTagInputIconWrapper = styled.div<StyledTagInputIconWrapperProps>`
    align-items: baseline;
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    margin-left: ${({ $size }) => ($size === 'medium' ? '5px' : '4px')};
`;
