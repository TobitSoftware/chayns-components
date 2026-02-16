import { motion } from 'motion/react';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledMultiActionButton = styled(motion.div)`
    align-items: stretch;
    display: inline-flex;
    max-width: 100%;
    position: relative;
    transition: width 0.2s ease;
    width: fit-content;
`;

type StyledSeparatorProps = WithTheme<{
    $gapColor?: string;
}>;

export const StyledSeparator = styled.span<StyledSeparatorProps>`
    align-self: stretch;
    background: ${({ $gapColor, theme }) => $gapColor || theme?.['cw-body-background'] || '#fff'};
    flex: 0 0 1px;
    width: 1px;
`;
