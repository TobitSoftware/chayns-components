import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Input from '../src/components/input/Input';
import Icon from '../src/components/icon/Icon';
import Button from '../src/components/button/Button';

export default {
    title: 'Core/Input',
    component: Input,
    args: {
        placeholder: 'Try me out',
        shouldUseAutoFocus: true,
    },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const General = Template.bind({});

export const WithIconAndButton = Template.bind({});

WithIconAndButton.args = {
    leftElement: <Icon icons={['fa fa-search']} />,
    rightElement: <Button onClick={() => console.log('Button clicked!')}>Scan</Button>,
};
