import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledMotionAccordionBodyProps = WithTheme<{
    $maxHeight?: number;
}>;

export const StyledMotionAccordionBody = styled(motion.div)<StyledMotionAccordionBodyProps>`
    overflow: hidden;
    transition: none !important;

    ${({ $maxHeight }) =>
        typeof $maxHeight === 'number' &&
        css`
            max-height: ${$maxHeight}px;
            overflow-y: scroll;
        `}
`;
