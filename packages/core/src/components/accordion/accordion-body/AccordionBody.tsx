import React, { FC } from 'react';
import type { AccordionProps } from '../Accordion';
import { AccordionGroupContext } from '../accordion-group/AccordionGroup';
import { StyledMotionAccordionBody } from './AccordionBody.styles';

export type AccordionBodyProps = {
    /**
     * Maximum height of the element. This automatically makes the content of the element scrollable.
     */
    maxHeight: AccordionProps['bodyMaxHeight'];
};

const AccordionBody: FC<AccordionBodyProps> = ({ children, maxHeight }) => (
    <StyledMotionAccordionBody
        animate={{ height: 'auto', opacity: 1 }}
        className="beta-chayns-accordion-body"
        exit={{ height: 0, opacity: 0 }}
        initial={{ height: 0, opacity: 0 }}
        maxHeight={maxHeight}
    >
        <AccordionGroupContext.Provider value={{ openAccordionUuid: undefined }}>
            {children}
        </AccordionGroupContext.Provider>
    </StyledMotionAccordionBody>
);

AccordionBody.displayName = 'AccordionBody';

export default AccordionBody;
