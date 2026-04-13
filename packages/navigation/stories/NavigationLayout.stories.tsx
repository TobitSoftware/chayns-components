import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import NavigationLayout from '../src/components/navigation-layout/NavigationLayout';
import { MultiActionButton } from '@chayns-components/core';
import {
    NavigationLayoutGroup,
    NavigationLayoutProps,
} from '../src/components/navigation-layout/NavigationLayout.types';

const NAVIGATION_LAYOUT_GROUPS: NavigationLayoutGroup[] = [
    {
        isPinned: true,
        id: 'main',
        items: [
            {
                id: 'infocenter',
                label: 'InfoCenter',
                imageUrl: 'https://tsimg.cloud/static/tobit-team/team_icon.svg',
            },
        ],
    },
    {
        id: 'pages',
        items: [
            {
                id: 'sidekick',
                label: 'SideKick',
                icons: ['fa ts-sidekick-chat'],
            },
            {
                id: 'chat',
                label: 'Chat',
                icons: ['fa ts-chat'],
            },
            {
                id: 'calendar',
                label: 'Kalender',
                icons: ['fa ts-event-inverted'],
            },
        ],
    },
    {
        id: 'folder',
        items: [
            {
                id: 'inbox',
                label: 'Eingang',
                icons: ['fa fa-inbox-in'],
                children: [
                    {
                        id: 'asdhfkfjhsdsdg',
                        label: 'Erledigt',
                        icons: ['fa fa-folder'],
                    },
                    {
                        id: 'hsfahiafhi',
                        label: 'ToDos',
                        icons: ['fa fa-folder'],
                    },
                    {
                        id: 'sdfsdf',
                        label: 'Watcher',
                        icons: ['fa fa-folder'],
                        children: [
                            {
                                id: 'sdfsdgsg',
                                label: 'TeamDavid',
                                icons: ['fa fa-folder'],
                            },
                            {
                                id: 'sgsdgsdgsd',
                                label: 'chayns.de',
                                icons: ['fa fa-folder'],
                            },
                        ],
                    },
                ],
            },
            {
                id: 'outbox',
                label: 'Ausgang',
                icons: ['fa fa-inbox-out'],
            },
            {
                id: 'drafts',
                label: 'Entwürfe',
                icons: ['fa fa-pen-nib'],
            },
        ],
    },
];

const meta: Meta<typeof NavigationLayout> = {
    title: 'Navigation/NavigationLayout',
    component: NavigationLayout,
    argTypes: {
        children: { control: false },
        groups: { control: false },
        sidebarTopContent: { control: false },
    },
    args: {
        groups: NAVIGATION_LAYOUT_GROUPS,
        config: {
            color: '#FFFFFF',
            backgroundColor: 'transparent',
            sidebarMaxWidth: 300,
        },
        selectedItemId: 'sdfsdgsg',
        children: (
            <div style={{ width: '100%' }}>
                <h2>Navigation Layout</h2>
                <p>Minimalbeispiel für den Content-Bereich.</p>
            </div>
        ),
        sidebarTopContent: (
            <MultiActionButton
                primaryAction={{
                    icon: 'fa fa-plus',
                    label: 'Erstellen',
                    onClick: () => {},
                }}
                secondaryContextMenu={[
                    {
                        key: 'mail',
                        icons: ['fa fa-envelope'],
                        text: 'Mail',
                        onClick: () => {},
                    },
                    {
                        key: 'chat',
                        icons: ['fa ts-chat'],
                        text: 'Chat',
                        onClick: () => {},
                    },
                    {
                        key: 'contact',
                        icons: ['fa fa-address-book'],
                        text: 'Kontakt',
                        onClick: () => {},
                    },
                    {
                        key: 'appointment',
                        icons: ['fa fa-calendar'],
                        text: 'Termin',
                        onClick: () => {},
                    },
                ]}
                shouldUseFullWidth
                shouldAutoCollapse
                backgroundColor="rgba(30, 30, 30, 0.3)"
                gapColor="transparent"
            />
        ),
    },
};

export default meta;

const Template: StoryFn<typeof NavigationLayout> = (args: NavigationLayoutProps) => (
    <div style={{ height: '100vh' }}>
        <NavigationLayout {...args} />
    </div>
);

export const General = Template.bind({});
