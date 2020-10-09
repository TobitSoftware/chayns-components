import React from 'react';
import Calendar from './Calendar';

export default {
    title: 'chayns-components/Calendar',
    component: Calendar,
};

const Template = (args) => {
    window.chayns = { env: { language: 'de' } };

    return <Calendar {...args} />;
};

export const BasicExample = Template.bind({});
BasicExample.args = {};
