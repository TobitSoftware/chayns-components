import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { CommunicationButton } from '../src';

export default {
    title: 'Communication/CommunicationButton',
    component: CommunicationButton,
    args: {
        icons: ['fa fa-thumbs-up'],
        iconColor: 'white',
    },
} as Meta<typeof CommunicationButton>;

const Template: StoryFn<typeof CommunicationButton> = (args) => {
    return <CommunicationButton {...args} />;
};

export const General = Template.bind({});

export const WithAgent = Template.bind({});

WithAgent.args = {
    personId: 'TKT-EEV5Q',
};
