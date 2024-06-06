import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import type { DisplayState } from './AmountControl';

type StyledAmountControlProps = WithTheme<unknown>;

export const StyledAmountControl = styled.div<StyledAmountControlProps>`
    background-color: ${({ theme }: StyledAmountControlProps) => theme['202']};
    display: flex;
    width: fit-content;
    border-radius: 3px;
    overflow: hidden;
`;

type StyledAmountControlInputProps = WithTheme<{
    $displayState: DisplayState;
    $shouldShowIcon: boolean;
    $hasFocus: boolean;
    $shouldShowWideInput: boolean;
}>;

export const StyledAmountControlInput = styled.input<StyledAmountControlInputProps>`
    background-color: ${({ theme }: StyledAmountControlInputProps) => theme['202']};
    color: ${({ theme }: StyledAmountControlInputProps) => theme.text};
    border: none;
    height: 28px;
    width: ${({ $shouldShowWideInput }) => ($shouldShowWideInput ? 90 : 55)}px;
    text-align: center;
    cursor: ${({ $hasFocus }) => ($hasFocus ? 'text' : 'pointer')};

    ${({ $displayState }) =>
        $displayState !== 'normal' &&
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
}>;

export const StyledAmountControlPseudoInput = styled.div<StyledAmountControlPseudoInputProps>`
    background-color: ${({ theme }: StyledAmountControlPseudoInputProps) => theme['202']};
    color: ${({ theme }: StyledAmountControlPseudoInputProps) => theme.text};
    border: none;
    height: 28px;
    width: ${({ $shouldShowWideInput }) => ($shouldShowWideInput ? 90 : 55)}px;
    text-align: center;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
`;

type StyledAmountControlButtonProps = WithTheme<{
    $isDisabled: boolean;
    $color?: string;
    $isWide?: boolean;
}>;

export const StyledMotionAmountControlButton = styled(
    motion.button,
)<StyledAmountControlButtonProps>`
    overflow: hidden;
    background-color: ${({ $color }) => $color ?? 'rgba(255, 255, 255, 0.2)'};
    transition: background-color 0.2s ease-in-out;
    height: 28px;
    width: ${({ $isWide }) => ($isWide ? 40 : 28)}px;

    ${({ $isDisabled }) =>
        $isDisabled &&
        css`
            opacity: 0.5;
        `}
`;
