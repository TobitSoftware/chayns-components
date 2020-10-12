import React from 'react';
import Checkbox from './Checkbox';

export default {
    title: 'chayns-components/Checkbox',
    component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />;

export const BasicExample = Template.bind({});
BasicExample.args = {
    children: 'Agree to the terms of service',
};

export const ToggleButton = Template.bind({});
ToggleButton.args = {
    children: 'Unlock bike',
    toggleButton: true,
};
