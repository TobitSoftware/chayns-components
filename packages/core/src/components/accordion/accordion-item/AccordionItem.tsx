import React, { FC, ReactNode } from 'react';
import { AccordionContext } from '../Accordion';
import { StyledAccordionItem } from './AccordionItem.styles';

export type AccordionItemProps = {
    /**
     * The content of the accordion content element
     */
    children: ReactNode;
};

const AccordionItem: FC<AccordionItemProps> = ({ children }) => (
    <AccordionContext.Consumer>
        {({ isWrapped }) => (
            <StyledAccordionItem className="beta-chayns-accordion-item" isWrapped={isWrapped}>
                {children}
            </StyledAccordionItem>
        )}
    </AccordionContext.Consumer>
);

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
