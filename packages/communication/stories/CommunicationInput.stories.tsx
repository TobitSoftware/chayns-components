import { Meta, StoryFn } from '@storybook/react';
import { Icon } from '@chayns-components/core';
import React, { useState } from 'react';
import { CommunicationButton, CommunicationInput } from '../src';

export default {
    title: 'Communication/CommunicationInput',
    component: CommunicationInput,
    args: {
        contextMenuItems: [{ key: 'copy', text: 'Copy', onClick: () => {}, icons: ['fa fa-copy'] }],
        rightElement: (
            <div
                style={{
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 44,
                    width: 44,
                }}
            >
                <Icon icons={['fa fa-paper-plane']} />
            </div>
        ),
    },
} as Meta<typeof CommunicationInput>;

const Template: StoryFn<typeof CommunicationInput> = (args) => {
    const [value, setValue] = useState('');

    return (
        <div
            style={{
                height: 500,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor, tortor at
                vehicula ultricies, lacus felis rutrum enim, ullamcorper aliquam sem orci non diam.
                Sed vulputate ullamcorper libero at molestie. Phasellus mi ipsum, dapibus a accumsan
                vel, efficitur quis quam. Etiam mollis turpis massa, eu volutpat dolor rhoncus eu.
                Vivamus vehicula, nulla ut posuere consectetur, dui massa pulvinar leo, condimentum
                semper quam massa vel nunc. Nullam dignissim ut sem a vulputate. Etiam eget sem
                orci. Nam et condimentum nunc, maximus auctor enim. Sed ultrices id sem ut pretium.
                Quisque luctus pellentesque erat. Nunc pharetra egestas massa, id laoreet lacus
                tempus et. Quisque ornare volutpat sem, nec fermentum nunc mattis sed. Nam aliquet
                mauris ut quam pellentesque efficitur. Nulla in justo dignissim, vulputate leo sit
                amet, suscipit felis. Aenean at orci tincidunt, placerat est quis, dapibus eros.
                Etiam tempor mollis ultrices.
            </p>

            <CommunicationInput {...args} value={value} onInput={(ev, text) => setValue(text)} />
        </div>
    );
};

export const General = Template.bind({});
export const WithChips = Template.bind({});
export const WithContent = Template.bind({});
export const WithRightElement = Template.bind({});

WithChips.args = {
    chips: [
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

WithContent.args = {
    chips: [
        {
            icons: ['fa fa-file'],
            label: 'Anhänge',
            onRemove: () => {},
        },
    ],
    content: (
        <div style={{ padding: '6px', height: 50, backgroundColor: 'lightblue' }}>
            Hier wird super Content angezeigt
        </div>
    ),
};

WithRightElement.args = {
    rightElement: <CommunicationButton icons={['fa fa-thumbs-up']} personId="TKT-EEV5Q" />,
};
