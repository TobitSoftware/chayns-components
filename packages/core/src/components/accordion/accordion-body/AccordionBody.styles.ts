import { m } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { AccordionBodyProps } from './AccordionBody';

type StyledMotionAccordionBodyProps = Pick<AccordionBodyProps, 'maxHeight'>;

export const StyledMotionAccordionBody = styled(m.div)<StyledMotionAccordionBodyProps>`
    overflow: hidden;

    ${({ maxHeight }) =>
        typeof maxHeight === 'number' &&
        css`
            max-height: ${maxHeight}px;
            overflow-y: scroll;
        `}
`;
