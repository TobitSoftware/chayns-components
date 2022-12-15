import React, { FC, ReactNode, UIEvent } from 'react';
import { AccordionContext } from '../Accordion';
import { StyledAccordionContent } from './AccordionContent.styles';

export type AccordionContentProps = {
    /**
     * The content of the accordion content element
     */
    children: ReactNode;
    /**
     * Maximum height of the element. This automatically makes the content of the element scrollable.
     */
    maxHeight?: number;
    /**
     * Function that is executed when the element will be scrolled
     */
    onScroll?: (event: UIEvent<HTMLDivElement>) => void;
};

const AccordionContent: FC<AccordionContentProps> = ({ children, maxHeight, onScroll }) => (
    <AccordionContext.Consumer>
        {({ isWrapped }) => (
            <StyledAccordionContent
                className="beta-chayns-accordion-content"
                isWrapped={isWrapped}
                maxHeight={maxHeight}
                onScroll={onScroll}
            >
                {children}
            </StyledAccordionContent>
        )}
    </AccordionContext.Consumer>
);

AccordionContent.displayName = 'AccordionContent';

export default AccordionContent;
