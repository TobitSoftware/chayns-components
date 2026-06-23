import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { AudioInput } from '../src';

export default {
    title: 'Communication/AudioInput',
    component: AudioInput,
    args: {},
} as Meta<typeof AudioInput>;

const Template: StoryFn<typeof AudioInput> = (args) => {
    const [isMuted, setIsMuted] = useState(false);

    return <AudioInput {...args} onMuteChange={(muted) => setIsMuted(muted)} isMuted={isMuted} />;
};

export const General = Template.bind({});
