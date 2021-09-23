import React, { FC } from 'react';
import styled from 'styled-components';

type AccordionBodyProps = {};

const StyledAccordionBody = styled.div``;

const AccordionBody: FC<AccordionBodyProps> = ({ children }) => (
    <StyledAccordionBody>{children}</StyledAccordionBody>
);

AccordionBody.displayName = 'AccordionBody';

export default AccordionBody;
