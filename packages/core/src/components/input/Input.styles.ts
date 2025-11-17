import { CSSProperties } from 'react';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import { InputDesign } from './Input.types';

type StyledInputProps = WithTheme<{
    $design: InputDesign;
    $isDisabled: boolean;
    $isFocused: boolean;
}>;

export const StyledInput = styled.div<StyledInputProps>`
    background-color: ${({ theme }) => (theme.colorMode === 'dark' ? theme['103'] : theme['000'])};
    border: 2px solid
        ${({ theme, $isFocused }) =>
            $isFocused ? `rgba(${theme['primary-rgb'] ?? ''}, 0.6)` : 'rgba(116, 116, 116, 0.4)'};
    border-radius: ${({ $design }) => ($design === InputDesign.Rounded ? '26px' : '6px')};
    box-shadow: 0 3px 6px ${({ $isFocused }) => ($isFocused ? '#00000016' : '#00000000')};
    display: flex;
    font-size: 18px;
    min-height: 52px;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    padding: 2px ${({ $design }) => ($design === InputDesign.Rounded ? '18px' : '12px')};
    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        opacity 0.2s ease;
    width: 100%;
`;

export const StyledInputContentWrapper = styled.div`
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    position: relative;
    width: 100%;
`;

type StyledInputFieldProps = WithTheme<{
    $color?: CSSProperties['color'];
    $isInvalid?: boolean;
}>;

export const StyledInputField = styled.input<StyledInputFieldProps>`
    background: none;
    border: none;
    color: ${({ theme, $color, $isInvalid }: StyledInputFieldProps) =>
        $color ?? ($isInvalid ? theme.wrong : theme.text)};
    flex: 1 1 auto;
    height: 100%;
    line-height: 1em;
    padding: 0;
    width: 100%;
`;
