import React from 'react';
import ChooseButton from './ChooseButton';

export default {
    title: 'chayns-components/ChooseButton',
    component: ChooseButton,
};

const Template = (args) => <ChooseButton {...args} />;

export const BasicExample = Template.bind({});
BasicExample.args = { children: 'Choose Pizza' };
