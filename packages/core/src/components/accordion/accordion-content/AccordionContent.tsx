import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { AccordionContext } from '../Accordion';

type AccordionContentProps = {
    /**
     * The content of the accordion body
     */
    children: ReactNode;
};

type StyledAccordionContentProps = {
    isWrapped: boolean;
};

const StyledAccordionContent = styled.div<StyledAccordionContentProps>`
    padding: ${({ isWrapped }) => (isWrapped ? '0 9px 18px 26px' : '0 9px 9px 10px')};
`;

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
