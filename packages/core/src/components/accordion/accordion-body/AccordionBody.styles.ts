import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

type StyledMotionAccordionBodyProps = { $maxHeight?: number };

export const StyledMotionAccordionBody = styled(motion.div)<StyledMotionAccordionBodyProps>`
    overflow: hidden;

    ${({ $maxHeight }) =>
        typeof $maxHeight === 'number' &&
        css`
            max-height: ${$maxHeight}px;
            overflow-y: scroll;
        `}
`;
