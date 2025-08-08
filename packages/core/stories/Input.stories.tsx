import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Input from '../src/components/input/Input';

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
