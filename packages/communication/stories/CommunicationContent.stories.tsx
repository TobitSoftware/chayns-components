import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { CommunicationContent } from '../src';

export default {
    title: 'Communication/CommunicationContent',
    component: CommunicationContent,
    args: {},
} as Meta<typeof CommunicationContent>;

const Template: StoryFn<typeof CommunicationContent> = (args) => <CommunicationContent {...args} />;

export const General = Template.bind({});
