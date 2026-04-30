import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { CommunicationInput } from '../src';

export default {
    title: 'Communication/CommunicationInput',
    component: CommunicationInput,
    args: {
        contextMenuItems: [{ key: 'copy', text: 'Copy', onClick: () => {}, icons: ['fa fa-copy'] }],
    },
} as Meta<typeof CommunicationInput>;

const Template: StoryFn<typeof CommunicationInput> = (args) => {
    const [value, setValue] = useState('');

    return (
        <div style={{ height: '500px', display: 'flex' }}>
            <CommunicationInput
                {...args}
                value={value}
                onChange={(ev) => setValue(ev.target.value)}
            />
        </div>
    );
};

export const General = Template.bind({});
export const WithChips = Template.bind({});

WithChips.args = {
    chips: [
        {
            icons: ['fa fa-poll-people'],
            label: 'Umfragen',
            onRemove: () => {},
        },
        {
            label: 'Details',
        },
        {
            label: 'Offene Punkte',
        },
        {
            label: 'Statements',
        },
        {
            label: 'Stimmungsanalyse',
        },
        {
            label: 'Stimme zu!',
        },
    ],
};
