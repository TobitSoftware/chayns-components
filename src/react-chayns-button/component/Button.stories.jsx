import React from 'react';
import Button from './Button';

export default {
    title: 'chayns-components/Button',
    component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = { children: 'Submit' };

export const ChooseButton = Template.bind({});
ChooseButton.args = { ...Primary.args, chooseButton: true };

export const Secondary = Template.bind({});
Secondary.args = { ...Primary.args, secondary: true };
