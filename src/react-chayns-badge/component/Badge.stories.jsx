import React from 'react';
import Accordion from '../../react-chayns-accordion/component/Accordion';
import Badge from './Badge';

export default {
    title: 'chayns-components/Badge',
    component: Badge,
};

export const BasicExample = (args) => (
    <div style={{ display: 'flex' }}>
        <Badge {...args} />
    </div>
);
BasicExample.args = {
    children: 12,
};

export const InAccordionHead = (args) => {
    return (
        <Accordion
            head="The Badge is on the right -->"
            right={<Badge {...args} />}
        >
            <div />
        </Accordion>
    );
};
InAccordionHead.args = {
    children: 12,
};

export const WithText = (args) => {
    return (
        <Accordion
            head="The Badge is on the right -->"
            right={<Badge {...args} />}
        >
            <div />
        </Accordion>
    );
};
WithText.args = {
    children: '12 remaining',
};
