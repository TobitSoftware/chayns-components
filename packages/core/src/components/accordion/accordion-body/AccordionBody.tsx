import React, { FC } from 'react';
import { AccordionGroupContext } from '../accordion-group/AccordionGroup';
import { StyledMotionAccordionBody } from './AccordionBody.styles';

const AccordionBody: FC = ({ children }) => (
    <StyledMotionAccordionBody
        animate={{ height: 'auto', opacity: 1 }}
        className="beta-chayns-accordion-body"
        exit={{ height: 0, opacity: 0 }}
        initial={{ height: 0, opacity: 0 }}
    >
        <AccordionGroupContext.Provider value={{ openAccordionUuid: undefined }}>
            {children}
        </AccordionGroupContext.Provider>
    </StyledMotionAccordionBody>
);

AccordionBody.displayName = 'AccordionBody';

export default AccordionBody;
