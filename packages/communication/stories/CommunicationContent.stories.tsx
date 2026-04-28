import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { CommunicationContent } from '../src';

export default {
    title: 'Communication/CommunicationContent',
    component: CommunicationContent,
    args: {
        children: <div style={{ width: '100%', height: '400px', backgroundColor: 'red' }} />,
        content: <div style={{ width: '100%', height: '100%', backgroundColor: 'blue' }} />,
        shouldShowContent: true,
        breakPoint: 200,
    },
} as Meta<typeof CommunicationContent>;

const Template: StoryFn<typeof CommunicationContent> = (args) => <CommunicationContent {...args} />;

export const General = Template.bind({});

export const Mobile = Template.bind({});

Mobile.args = {
    breakPoint: 1000,
};
