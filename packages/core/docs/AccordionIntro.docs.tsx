import React, { FC } from 'react';
import { AccordionGroup, Accordion, AccordionIntro } from '@chayns-components/core';

const Component: FC = () => {
    return (
        <AccordionGroup>
            <Accordion title="Accordion">
                <AccordionIntro>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel finibus nunc, a
                    cursus magna.
                </AccordionIntro>
            </Accordion>
        </AccordionGroup>
    );
};

Component.displayName = 'Component';

export default Component;
