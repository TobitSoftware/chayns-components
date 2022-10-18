import React, { FC, ReactNode } from 'react';
import { StyledAccordionIntro } from './AccordionIntro.styles';

export type AccordionIntroProps = {
    /**
     * The content of the accordion content element
     */
    children: ReactNode;
};

const AccordionIntro: FC<AccordionIntroProps> = ({ children }) => (
    <StyledAccordionIntro className="beta-chayns-accordion-intro">{children}</StyledAccordionIntro>
);

AccordionIntro.displayName = 'AccordionIntro';

export default AccordionIntro;
