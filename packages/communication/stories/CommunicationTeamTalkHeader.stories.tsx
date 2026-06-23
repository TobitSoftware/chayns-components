import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { CommunicationTeamTalkHeader } from '../src';

export default {
    title: 'Communication/CommunicationTeamTalkHeader',
    component: CommunicationTeamTalkHeader,
    args: {},
} as Meta<typeof CommunicationTeamTalkHeader>;

const Template: StoryFn<typeof CommunicationTeamTalkHeader> = (args) => {
    const [value, setValue] = useState('');

    return (
        <CommunicationTeamTalkHeader
            {...args}
            value={value}
            onChange={(newValue) => setValue(newValue)}
        />
    );
};

export const General = Template.bind({});
