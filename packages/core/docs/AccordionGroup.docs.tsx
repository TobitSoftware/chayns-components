import React, { FC } from 'react';
import { AccordionGroup, Accordion, AccordionContent } from '@chayns-components/core';

const Component: FC = () => {
    return (
        <AccordionGroup>
            <Accordion title="Accordion">
                <AccordionContent>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel finibus nunc, a
                    cursus magna.
                </AccordionContent>
            </Accordion>
        </AccordionGroup>
    );
};

Component.displayName = 'Component';

export default Component;
