import React, { FC } from 'react';
import { StyledMotionAccordionBody } from './AccordionBody.styles';

const AccordionBody: FC = ({ children }) => (
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
