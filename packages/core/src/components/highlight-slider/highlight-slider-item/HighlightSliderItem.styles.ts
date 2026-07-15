import styled, { css } from 'styled-components';
import { motion } from 'motion/react';
import { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';
import { keyboardFocusHighlightingRingCss } from '../../../utils/keyboardFocusHighlighting.styles';

type StyledHighlightSliderItemProps = {
    $shouldShowKeyboardHighlighting?: boolean;
};

export const StyledHighlightSliderItem = styled.div<StyledHighlightSliderItemProps>`
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    cursor: pointer;

    ${({ $shouldShowKeyboardHighlighting }) =>
        $shouldShowKeyboardHighlighting &&
        css`
            &:focus-visible {
                ${keyboardFocusHighlightingRingCss}
            }
        `}
`;
type StyledHighlightSliderItemProgressProps = WithTheme<{ $backgroundColor: string }>;

export const StyledHighlightSliderItemProgress = styled(
    motion.div,
)<StyledHighlightSliderItemProgressProps>`
    height: 4px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: ${({ $backgroundColor }: StyledHighlightSliderItemProgressProps) =>
        $backgroundColor};
`;

type StyledHighlightSliderItemBackgroundProps = WithTheme<{ $backgroundColor: string }>;

export const StyledHighlightSliderItemBackground = styled(
    motion.div,
)<StyledHighlightSliderItemBackgroundProps>`
    height: 4px;
    width: 100%;
    border-radius: 2px;
    background-color: ${({ $backgroundColor }: StyledHighlightSliderItemBackgroundProps) =>
        $backgroundColor};
`;
