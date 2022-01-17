import React, { FC } from 'react';
import { StyledAccordionIntro } from './AccordionIntro.styles';

const AccordionIntro: FC = ({ children }) => (
    <StyledAccordionIntro className="beta-chayns-accordion-intro">{children}</StyledAccordionIntro>
);

AccordionIntro.displayName = 'AccordionIntro';

export default AccordionIntro;
