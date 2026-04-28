import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { AudioInput } from '../src';

export default {
    title: 'Communication/AudioInput',
    component: AudioInput,
    args: {},
} as Meta<typeof AudioInput>;

const Template: StoryFn<typeof AudioInput> = (args) => <AudioInput {...args} />;

export const General = Template.bind({});
