import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledAmountControlProps = WithTheme<unknown>;

export const StyledAmountControl = styled.div<StyledAmountControlProps>`
    background-color: ${({ theme }: StyledAmountControlProps) => theme['202']};
    display: flex;
    width: fit-content;
    border-radius: 3px;
`;

type StyledAmountControlInputProps = WithTheme<unknown>;

export const StyledAmountControlInput = styled.input<StyledAmountControlInputProps>`
    background-color: ${({ theme }: StyledAmountControlInputProps) => theme['202']};
    border: none;
    height: 28px;
    width: 95px;
    text-align: center;
`;

type StyledAmountControlButtonProps = WithTheme<{
    disabled: boolean;
}>;

export const StyledAmountControlButton = styled.button<StyledAmountControlButtonProps>`
    background-color: rgba(255, 255, 255, 0.2);
    height: 28px;
    width: 40px;

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.5;
        `}
`;
