import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { SocialPlugin } from '../src';

export default {
    title: 'Communication/SocialPlugin',
    component: SocialPlugin,
    args: {},
} as Meta<typeof SocialPlugin>;

const Template: StoryFn<typeof SocialPlugin> = (args) => {
    return <SocialPlugin />;
};

export const General = Template.bind({});
