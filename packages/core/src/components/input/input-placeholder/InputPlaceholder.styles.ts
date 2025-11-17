import styled from 'styled-components';
import { motion } from 'motion/react';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';
import { InputPlaceholderMode } from './InputPlaceholder.types';

type StyledMotionInputPlaceholderProps = WithTheme<{
    $hasValue: boolean;
    $isInvalid: boolean;
    $placeholderMode: InputPlaceholderMode;
}>;

export const StyledMotionInputPlaceholder = styled(motion.div)<StyledMotionInputPlaceholderProps>`
    align-items: center;
    color: ${({ theme, $isInvalid }) =>
        `rgba(${($isInvalid ? theme.wrong : theme['text-rgb']) ?? ''}, 0.65)`};
    font-size: ${({ $placeholderMode, $hasValue }) =>
        $placeholderMode === InputPlaceholderMode.Floating && $hasValue ? '12px' : '18px'};
    line-height: 1em;
    opacity: ${({ $hasValue, $placeholderMode }) =>
        $placeholderMode === InputPlaceholderMode.Floating || !$hasValue ? 1 : 0};
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    text-overflow: ellipsis;
    transition:
        font-size 0.2s ease,
        opacity 0.2s ease;
    user-select: none;
    white-space: nowrap;
`;
