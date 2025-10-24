import React, { FC } from 'react';
import { AccordionGroup, Accordion, AccordionItem } from '@chayns-components/core';

const Component: FC = () => {
    return (
        <AccordionGroup>
            <Accordion title="Accordion">
                <AccordionItem>Lorem ipsum dolor sit amet</AccordionItem>
            </Accordion>
        </AccordionGroup>
    );
};

Component.displayName = 'Component';

export default Component;
