import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import type { DisplayState } from './AmountControl';

type StyledAmountControlProps = WithTheme<{
    $isDisabled: boolean;
}>;

export const StyledAmountControl = styled.div<StyledAmountControlProps>`
    background-color: ${({ theme }: StyledAmountControlProps) => theme['202']};
    display: flex;
    width: fit-content;
    border-radius: 3px;
    overflow: hidden;
    transition: opacity 0.2s ease;
    height: 28px;

    ${({ $isDisabled }) =>
        $isDisabled &&
        css`
            opacity: 0.5;
            pointer-events: none;
        `}
`;

type StyledAmountControlInputProps = WithTheme<{
    $displayState: DisplayState;
    $shouldShowIcon: boolean;
    $hasFocus: boolean;
    $shouldShowWideInput: boolean;
}>;

export const StyledInputWrapper = styled.div<WithTheme<unknown>>`
    background-color: ${({ theme }) => theme['408']};
`;

export const StyledAmountControlInput = styled.input<StyledAmountControlInputProps>`
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    height: 28px;
    width: ${({ $shouldShowWideInput }) => ($shouldShowWideInput ? 90 : 55)}px;
    text-align: center;
    cursor: ${({ $hasFocus }) => ($hasFocus ? 'text' : 'pointer')};

    ${({ $displayState }) =>
        $displayState === 'maxAmount' &&
        css`
            border-bottom-right-radius: 3px;
            border-top-right-radius: 3px;
        `}
    ${({ $displayState, $shouldShowIcon }) =>
        $displayState === 'default' &&
        !$shouldShowIcon &&
        css`
            border-bottom-left-radius: 3px;
            border-top-left-radius: 3px;
        `};
`;

type StyledAmountControlPseudoInputProps = WithTheme<{
    $shouldShowWideInput: boolean;
    $shouldShowRightIcon: boolean;
}>;

export const StyledAmountControlPseudoInput = styled.div<StyledAmountControlPseudoInputProps>`
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    height: 28px;
    min-width: ${({ $shouldShowWideInput }) => ($shouldShowWideInput ? 90 : 55)}px;
    padding: 1px 8px;
    text-align: center;
    cursor: pointer;
    user-select: none;

    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom-left-radius: ${({ $shouldShowRightIcon }) =>
        $shouldShowRightIcon ? '3px' : 'unset'};
    border-top-left-radius: ${({ $shouldShowRightIcon }) =>
        $shouldShowRightIcon ? '3px' : 'unset'};
`;

type StyledAmountControlButtonProps = WithTheme<{
    $isDisabled: boolean;
    $color?: string;
}>;

export const StyledMotionAmountControlButton = styled(
    motion.button,
)<StyledAmountControlButtonProps>`
    align-items: center;
    background-color: ${({ theme, $color }: StyledAmountControlButtonProps) =>
        $color ?? theme['408']};
    display: flex;
    justify-content: center;
    overflow: hidden;
    transition: background-color 0.2s ease-in-out;

    ${({ $isDisabled }) =>
        $isDisabled &&
        css`
            opacity: 0.5;
        `}
`;
