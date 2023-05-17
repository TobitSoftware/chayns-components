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
`;

type StyledAmountControlInputProps = WithTheme<{
    displayState: DisplayState;
}>;

export const StyledAmountControlInput = styled.input<StyledAmountControlInputProps>`
    background-color: ${({ theme }: StyledAmountControlInputProps) => theme['202']};
    border: none;
    height: 28px;
    width: 95px;
    text-align: center;
    ${({ displayState }) =>
        displayState !== 'normal' &&
        css`
            border-bottom-right-radius: 3px;
            border-top-right-radius: 3px;
        `}
`;

type StyledAmountControlButtonProps = WithTheme<{
    disabled: boolean;
}>;

export const StyledMotionAmountControlButton = styled(
    motion.button
)<StyledAmountControlButtonProps>`
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.2);
    height: 28px;
    width: 40px;

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.5;
        `}
`;
