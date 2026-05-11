import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { CommunicationMessage, CommunicationMessageAlignment } from '../src';
import BaseCommunicationMessage from '../src/components/communication-message/CommunicationMessage';
import { CommunicationMessageStatus } from '../src/components/communication-message/CommunicationMessage.types';

const TEST_PLUGIN = (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            color: 'white',
            fontFamily: 'sans-serif',
        }}
    >
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
            }}
        >
            <img
                src="https://tsimg.cloud/JAN-NIK96/profile_w200-h200.png"
                alt=""
                style={{
                    width: 40,
                    height: 40,
                    objectFit: 'cover',
                }}
            />
            <span
                style={{
                    fontSize: 24,
                }}
            >
                →
            </span>
            <img
                src="https://tsimg.cloud/MIC-HAEL1/profile_w200-h200.png"
                alt=""
                style={{
                    width: 40,
                    height: 40,
                    objectFit: 'cover',
                }}
            />
        </div>
        <div
            style={{
                fontSize: 24,
                fontWeight: 600,
            }}
        >
            1,00 €
        </div>
        <div
            style={{
                fontSize: 14,
            }}
        >
            Test-Buchung
        </div>
    </div>
);

export default {
    title: 'Communication/CommunicationMessage',
    component: BaseCommunicationMessage,
    args: {
        metadata: {
            id: 'message',
            status: CommunicationMessageStatus.DELIVERED,
            author: {
                name: 'Michael Gesenhues',
                id: 'MIC-HEAL1',
                imageUrl: 'https://tsimg.cloud/MIC-HAEL1/profile_w200-h200.png',
            },
            creationTime: new Date().toISOString(),
        },
        alignment: CommunicationMessageAlignment.RIGHT,
    },
} as Meta<typeof BaseCommunicationMessage>;

const SystemTemplate: StoryFn<typeof CommunicationMessage.System> = (args) => {
    return <CommunicationMessage.System {...args} />;
};

const DateTemplate: StoryFn<typeof CommunicationMessage.Date> = (args) => {
    return <CommunicationMessage.Date {...args} />;
};

const PluginTemplate: StoryFn<typeof CommunicationMessage.Plugin> = (args) => {
    return <CommunicationMessage.Plugin {...args} />;
};

const TextTemplate: StoryFn<typeof CommunicationMessage.Text> = (args) => {
    return <CommunicationMessage.Text {...args} />;
};

const AgreeTemplate: StoryFn<typeof CommunicationMessage.Agree> = (args) => {
    return <CommunicationMessage.Agree {...args} />;
};

export const SystemMessage = SystemTemplate.bind({});
export const DateMessage = DateTemplate.bind({});
export const PluginMessage = PluginTemplate.bind({});
export const TextMessage = TextTemplate.bind({});
export const DeletedMessage = TextTemplate.bind({});
export const AgreeMessage = AgreeTemplate.bind({});

SystemMessage.args = {
    content: 'Michael Gesenhues hat Jannik Weise hinzugefügt',
};

DateMessage.args = {
    date: new Date().toISOString(),
};

PluginMessage.args = {
    content: TEST_PLUGIN,
};

TextMessage.args = {
    options: [
        {
            key: 'delete',
            icons: ['fa fa-trash'],
            text: 'Löschen',
            onClick: () => {},
        },
    ],
    content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in arcu turpis. Nunc sapien nisi, ultrices eu est vel, pulvinar sollicitudin libero. Proin blandit nunc non massa congue, in eleifend ligula condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer porta erat id justo dictum feugiat. Praesent fringilla nisi sit amet tincidunt tincidunt. In hendrerit pulvinar felis, vitae commodo urna. Praesent fermentum odio molestie, tempor risus eu, interdum tellus. Aliquam at lorem arcu. Ut augue nibh, efficitur nec sodales sed, pellentesque in ligula. Mauris sem purus, condimentum in facilisis quis, faucibus eget justo. Nullam pretium volutpat nunc, a gravida nisi. Nulla in placerat magna. Mauris hendrerit ante sit amet ipsum vulputate bibendum at in lorem. Nullam vulputate turpis nec mauris dignissim suscipit et sed augue.',
};

AgreeMessage.args = {};

DeletedMessage.args = {
    metadata: {
        id: 'message',
        status: CommunicationMessageStatus.DELIVERED,
        author: {
            name: 'Michael Gesenhues',
            id: 'MIC-HEAL1',
            imageUrl: 'https://tsimg.cloud/MIC-HAEL1/profile_w200-h200.png',
        },
        creationTime: new Date().toISOString(),
        deletionTime: new Date().toISOString(),
    },
};
