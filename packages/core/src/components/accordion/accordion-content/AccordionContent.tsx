import React, { FC } from 'react';
import styled from 'styled-components';

type AccordionContentProps = {
    isWrapped?: boolean;
};

const StyledAccordionContent = styled.div<AccordionContentProps>`
    padding: ${({ isWrapped }) => (isWrapped ? '0 9px 18px 26px' : '0 9px 9px 10px')};
`;

const AccordionContent: FC<AccordionContentProps> = ({ children, isWrapped }) => (
    <StyledAccordionContent className="beta-chayns-accordion-content" isWrapped={isWrapped}>
        {children}
    </StyledAccordionContent>
);

AccordionContent.displayName = 'AccordionContent';

export default AccordionContent;
