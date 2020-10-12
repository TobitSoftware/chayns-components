import React from 'react';
import DateInfo from './DateInfo';

export default {
    title: 'chayns-components/DateInfo',
    component: DateInfo,
};

const Template = (args) => <DateInfo {...args} />;

export const BasicExample = Template.bind({});
BasicExample.args = {
    date: new Date(),
};
