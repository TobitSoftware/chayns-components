import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import AnimatedNumber from '../src/components/animated-number/AnimatedNumber';

export default {
    title: 'Core/AnimatedNumber',
    component: AnimatedNumber,
    args: {
        value: 935936,
    },
} as Meta<typeof AnimatedNumber>;

const Template: StoryFn<typeof AnimatedNumber> = (args) => <AnimatedNumber {...args} />;

export const General = Template.bind({});
