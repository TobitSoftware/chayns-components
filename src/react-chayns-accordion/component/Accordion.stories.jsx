import React from 'react';
import Accordion from './Accordion';

export default {
    title: 'chayns-components/Accordion',
    component: Accordion,
};

const Template = (args) => <Accordion {...args} />;

export const BasicExample = Template.bind({});
BasicExample.args = {
    head: 'Overview',
    children: (
        <div className="accordion__content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fuga
            cum, omnis officia quo similique cupiditate atque incidunt
            accusantium impedit.
        </div>
    ),
};
