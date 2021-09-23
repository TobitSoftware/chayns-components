import React, { FC } from 'react';
import styled from 'styled-components';

type AccordionHeadProps = {
    title: string;
};

const StyledAccordionHead = styled.div``;

const AccordionHead: FC<AccordionHeadProps> = ({ title }) => (
    <StyledAccordionHead>{title}</StyledAccordionHead>
);

AccordionHead.displayName = 'AccordionHead';

export default AccordionHead;
