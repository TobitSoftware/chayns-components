import { Meta, StoryFn } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';
import { CommunicationButton, CommunicationInput, CornerType, Size } from '../src';
import { Icon } from '@chayns-components/core';
import { CommunicationInputRef } from '../src/components/communication-input/CommunicationInput.types';

export default {
    title: 'Communication/CommunicationInput',
    component: CommunicationInput,
    args: {
        placeholder: 'Nachricht schreiben',
        contextMenuItems: [{ key: 'copy', text: 'Copy', onClick: () => {}, icons: ['fa fa-copy'] }],
    },
} as Meta<typeof CommunicationInput>;

const Template: StoryFn<typeof CommunicationInput> = (args) => {
    const [value, setValue] = useState('');

    const ref = useRef<CommunicationInputRef>(null);

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            ref.current?.startAnimation();
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div
            style={{
                height: 800,
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

            <CommunicationInput
                {...args}
                ref={ref}
                value={value}
                onInput={(ev, text) => setValue(text)}
            />
        </div>
    );
};

export const General = Template.bind({});
export const Small = Template.bind({});
export const WithChips = Template.bind({});
export const WithContent = Template.bind({});
export const WithAnimation = Template.bind({});
export const WithRightElement = Template.bind({});
export const WithRoundedCorners = Template.bind({});

WithChips.args = {
    chips: [
        {
            label: 'Details',
            onClick: () => {},
        },
        {
            label: 'Offene Punkte',
            onClick: () => {},
        },
        {
            label: 'Statements',
            onClick: () => {},
        },
        {
            label: 'Stimmungsanalyse',
            onClick: () => {},
        },
        {
            label: 'Stimme zu!',
            onClick: () => {},
        },
    ],
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
};

WithRoundedCorners.args = {
    cornerType: CornerType.ROUNDED,
};

Small.args = {
    size: Size.SMALL,
};

WithAnimation.args = {
    shouldUseInitialAnimation: true,
    rightElement: <CommunicationButton icons={['fa ts-sidekick']} iconColor="white" />,
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
