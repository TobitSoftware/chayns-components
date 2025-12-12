import { motion } from 'motion/react';
import { CSSProperties } from 'react';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import { InputAnimationState, InputDesign } from './Input.types';

type StyledInputProps = WithTheme<{
    $animationState: InputAnimationState;
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
    position: relative;
    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        opacity 0.2s ease,
        width 0.5s ease;
    width: ${({ $animationState }) =>
        $animationState === InputAnimationState.Idle ? '52px' : '100%'};
`;

export const StyledMotionInputWrapper = styled(motion.div)`
    display: flex;
    min-height: 48px;
    padding: 2px;
    width: 100%;
`;

export const StyledMotionInputAnimationElementWrapper = styled(motion.div)`
    align-items: center;
    display: flex;
    height: 48px;
    justify-content: center;
    position: absolute;
    right: 0;
    width: 48px;
`;

type StyledInputContentWrapperProps = WithTheme<{
    $hasLeftElement?: boolean;
    $hasRightElement?: boolean;
}>;

export const StyledInputContentWrapper = styled.div<StyledInputContentWrapperProps>`
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    padding: 0 ${({ $hasRightElement }) => ($hasRightElement ? 6 : 12)}px 0
        ${({ $hasLeftElement }) => ($hasLeftElement ? 6 : 12)}px;
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
    padding: 0 0 1px 0;
    width: 100%;
`;
