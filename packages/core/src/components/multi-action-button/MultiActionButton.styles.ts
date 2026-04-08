import { motion } from 'motion/react';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledMultiActionButton = styled(motion.div)`
    align-items: stretch;
    display: inline-flex;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    position: relative;
    transition: width 0.2s ease;
    width: fit-content;
`;

type StyledSeparatorProps = WithTheme<{
    $gapColor?: string;
    $isHidden?: boolean;
}>;

export const StyledSeparator = styled.span<StyledSeparatorProps>`
    align-self: stretch;
    background: ${({ $gapColor, theme }) => $gapColor || theme?.['cw-body-background'] || '#fff'};
    flex: 0 0 ${({ $isHidden }) => ($isHidden ? 0 : 1)}px;
    opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
    overflow: hidden;
    transition:
        flex-basis 0.2s ease,
        opacity 0.2s ease,
        width 0.2s ease;
    width: ${({ $isHidden }) => ($isHidden ? 0 : 1)}px;
`;
