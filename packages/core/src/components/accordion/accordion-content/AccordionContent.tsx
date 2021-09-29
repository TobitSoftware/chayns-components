import React, { FC, ReactNode } from 'react';
import { AccordionContext } from '../Accordion';
import { StyledAccordionContent } from './AccordionContent.styles';

type AccordionContentProps = {
    /**
     * The content of the accordion body
     */
    children: ReactNode;
};

const AccordionContent: FC<AccordionContentProps> = ({ children }) => (
    <AccordionContext.Consumer>
        {({ isWrapped }) => (
            <StyledAccordionContent className="beta-chayns-accordion-content" isWrapped={isWrapped}>
                {children}
            </StyledAccordionContent>
        )}
    </AccordionContext.Consumer>
);

AccordionContent.displayName = 'AccordionContent';

export default AccordionContent;
