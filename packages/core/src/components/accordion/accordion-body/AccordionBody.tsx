import { motion } from 'framer-motion';
import React, { FC } from 'react';
import styled from 'styled-components';

type AccordionBodyProps = {};

const StyledMotionAccordionBody = styled(motion.div)`
    overflow: hidden;
`;

const AccordionBody: FC<AccordionBodyProps> = ({ children }) => (
    <StyledMotionAccordionBody
        animate={{ height: 'auto', opacity: 1 }}
        className="beta-chayns-accordion-body"
        exit={{ height: 0, opacity: 0 }}
        initial={{ height: 0, opacity: 0 }}
    >
        {children}
    </StyledMotionAccordionBody>
);

AccordionBody.displayName = 'AccordionBody';

export default AccordionBody;
