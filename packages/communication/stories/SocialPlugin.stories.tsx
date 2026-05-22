import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { SocialPlugin } from '../src';

export default {
    title: 'Communication/SocialPlugin',
    component: SocialPlugin,
    args: {
        commentType: 5,
        postingId: '787cb5d13e8b43d98347a012b3eab261',
    },
} as Meta<typeof SocialPlugin>;

const Template: StoryFn<typeof SocialPlugin> = (args) => {
    return <SocialPlugin {...args} />;
};

export const General = Template.bind({});
