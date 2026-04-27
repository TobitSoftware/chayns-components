import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { CommunicationHeader } from '../src';

export default {
    title: 'Communication/CommunicationHeader',
    component: CommunicationHeader,
    args: {
        title: 'Lorem Ipsum',
        from: {
            id: 'MIC-HAEL1',
            name: 'Michael Gesenhues',
            actions: [{ icons: ['fa fa-pen'], label: 'Email schreiben', onClick: () => {} }],
        },
        to: [
            {
                id: 'JAN-NIK96',
                name: 'Jannik Weise',
                actions: [
                    { icons: ['fa fa-pen'], label: 'Email schreiben', onClick: () => {} },
                    { icons: ['fa fa-copy'], label: 'Email kopieren', onClick: () => {} },
                ],
            },
        ],
        cc: [
            {
                id: '131-99998',
                name: 'Luca Jesußek',
                actions: [{ icons: ['fa fa-pen'], label: 'Email schreiben', onClick: () => {} }],
            },
        ],
        date: '2026-04-24T13:23:01.087Z',
    },
} as Meta<typeof CommunicationHeader>;

const Template: StoryFn<typeof CommunicationHeader> = (args) => <CommunicationHeader {...args} />;

export const General = Template.bind({});
