import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { CommunicationMessage, CommunicationMessageAlignment } from '../src';
import BaseCommunicationMessage from '../src/components/communication-message/CommunicationMessage';
import { CommunicationMessageStatus } from '../src/components/communication-message/CommunicationMessage.types';
import { Button, Checkbox } from '@chayns-components/core';

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

const PreviewTemplate: StoryFn<typeof CommunicationMessage.Preview> = (args) => {
    const metadata = args.metadata;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
            }}
        >
            <CommunicationMessage.Preview
                {...args}
                metadata={{
                    ...metadata,
                    author: {
                        name: 'Jannik Weise',
                        id: 'JAN-NIK96',
                        imageUrl: 'https://tsimg.cloud/JAN-NIK96/profile_w200-h200.png',
                    },
                    plugin: {
                        icon: 'fa fa-money-bill',
                        name: 'Geldanfrage',
                    },
                }}
            />
            <CommunicationMessage.Preview
                {...args}
                metadata={{
                    ...metadata,
                    author: {
                        name: 'Jannik Weise',
                        id: 'JAN-NIK96',
                        imageUrl: 'https://tsimg.cloud/JAN-NIK96/profile_w200-h200.png',
                    },
                    files: [
                        {
                            type: 'image',
                            previewUrl:
                                'https://tsimg.cloud/77896-21884/8aee1a304297729a4542b97325940a656a3da8f2.png',
                        },
                    ],
                }}
            />
            <CommunicationMessage.Preview
                {...args}
                metadata={{
                    ...metadata,
                    author: {
                        name: 'Jannik Weise',
                        id: 'JAN-NIK96',
                        imageUrl: 'https://tsimg.cloud/JAN-NIK96/profile_w200-h200.png',
                    },
                    files: [
                        {
                            type: 'video',
                            previewUrl:
                                'https://tsimg.cloud/77896-21884/25399416f38c1d960f521a3530c8a2bc70a88bb9.png',
                        },
                    ],
                    plainText:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta erat ipsum, sed',
                }}
                onRemove={() => {}}
            />
            <CommunicationMessage.Preview
                {...args}
                metadata={{
                    ...metadata,
                    files: [
                        {
                            type: 'file',
                            fileName: 'Dokument.pdf',
                        },
                    ],
                }}
            />
            <CommunicationMessage.Preview
                {...args}
                metadata={{
                    ...metadata,
                    plainText:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta erat ipsum, sed sollicitudin tortor suscipit at. Donec felis libero, molestie quis libero quis, commodo dignissim leo.',
                }}
            />
            <CommunicationMessage.Preview
                {...args}
                metadata={{
                    ...metadata,
                    plugin: {
                        name: '',
                    },
                }}
            />
            <CommunicationMessage.Preview
                {...args}
                metadata={{
                    ...metadata,
                    plainText: 'Lorem ipsum dolor.',
                }}
                onRemove={() => {}}
            />
        </div>
    );
};

export const SystemMessage = SystemTemplate.bind({});
export const DateMessage = DateTemplate.bind({});
export const PluginMessage = PluginTemplate.bind({});
export const TextMessage = TextTemplate.bind({});
export const DeletedMessage = TextTemplate.bind({});
export const AgreeMessage = AgreeTemplate.bind({});
export const PreviewMessage = PreviewTemplate.bind({});

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
    content: (
        <div>
            <CommunicationMessage.Preview
                metadata={{
                    id: 'message',
                    status: CommunicationMessageStatus.DELIVERED,
                    author: {
                        name: 'Jannik Weise',
                        id: 'JAN-NIK96',
                        imageUrl: 'https://tsimg.cloud/JAN-NIK96/profile_w200-h200.png',
                    },
                    plainText: 'An dieser Stelle würde ich einen Context benutzen.',
                    creationTime: new Date().toISOString(),
                }}
                onClick={() => {}}
            />
            <p>Ja stimmt. Das ist hier die bessere Wahl. 👍</p>
        </div>
    ),
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

PreviewMessage.args = {
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
    onClick: () => {},
};
