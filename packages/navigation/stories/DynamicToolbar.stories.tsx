import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import DynamicToolbar from '../src/components/dynamic-toolbar/DynamicToolbar';

export default {
    title: 'Navigation/DynamicToolbar',
    component: DynamicToolbar,
} as Meta<typeof DynamicToolbar>;

const Template: StoryFn<typeof DynamicToolbar> = ({ ...args }) => <DynamicToolbar {...args} />;

export const General = Template.bind({});

General.args = {
    // Add args here
};
