import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Filter from '../src/components/filter/Filter';

export default {
    title: 'Core/Filter',
    component: Filter,
    args: {
        children: '10.000 Euro',
    },
} as Meta<typeof Filter>;

const Template: StoryFn<typeof Filter> = ({ ...args }) => <Filter {...args} />;

export const General = Template.bind({});
