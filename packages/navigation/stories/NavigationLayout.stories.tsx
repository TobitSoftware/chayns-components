import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React, { useEffect, useRef, useState } from 'react';
import { MultiActionButton } from '@chayns-components/core';
import {
    NavigationLayout,
    NavigationLayoutGroup,
    NavigationLayoutItemReorderEvent,
    NavigationLayoutProps,
    UserImage,
    reorderNavigationLayoutGroups,
} from '../src';

const NAVIGATION_LAYOUT_GROUPS: NavigationLayoutGroup[] = [
    {
        isPinned: true,
        id: 'main',
        items: [
            {
                id: 'infocenter',
                label: 'InfoCenter',
                imageElement: (
                    <img
                        alt="InfoCenter"
                        src="https://tsimg.cloud/static/tobit-team/team_icon.svg"
                        style={{ height: 28, width: 28, filter: 'invert(1)' }}
                    />
                ),
            },
        ],
    },
    {
        id: 'pages',
        isReorderable: true,
        items: [
            {
                id: 'sidekick',
                label: 'SideKick',
                icons: ['fa ts-sidekick-chat'],
                isDisabled: true,
                disabledReason: 'SideKick ist nicht verfügbar!',
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
        isReorderable: true,
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
                isDisabled: true,
            },
            {
                id: 'spam',
                label: 'Spam',
                icons: ['fa fa-ban'],
            },
            {
                id: 'transit',
                label: 'Transit',
                icons: ['fa fa-arrow-up-arrow-down'],
            },
            {
                id: 'trash',
                label: 'Papierkorb',
                icons: ['fa fa-trash'],
            },
            {
                id: 'contacts',
                label: 'Adressen',
                icons: ['fa fa-address-card'],
            },
        ],
    },
];

const HEADER_CONTENT = (
    <div
        style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}
    >
        <span style={{ margin: 0, fontSize: 20 }}>Example Header</span>
        <UserImage />
    </div>
);

const CHILDREN = (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'lightgray', padding: 12 }}>
        <h2>Navigation Layout</h2>
        <p>Minimalbeispiel für den Content-Bereich.</p>
    </div>
);

const SIDEBAR_TOP_CONTENT = (
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
);

const meta: Meta<typeof NavigationLayout> = {
    title: 'Navigation/NavigationLayout',
    component: NavigationLayout,
    args: {
        groups: NAVIGATION_LAYOUT_GROUPS,
        headerContent: HEADER_CONTENT,
        config: {
            sidebarMaxWidth: 300,
            color: '#FFFFFF',
        },
        shouldShowCollapsedLabel: true,
        children: CHILDREN,
        sidebarTopContent: SIDEBAR_TOP_CONTENT,
        onItemReorder: action('onItemReorder'),
    },
};

export default meta;

const Template: StoryFn<typeof NavigationLayout> = (args: NavigationLayoutProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [groups, setGroups] = useState(args.groups);

    useEffect(() => {
        if (ref.current) {
            const body = ref.current.closest('body');

            if (body) {
                body.style.padding = '0';

                return () => {
                    body.style.padding = '1rem';
                };
            }
        }

        return () => {};
    }, []);

    useEffect(() => {
        setGroups(args.groups);
    }, [args.groups]);

    const handleItemReorder = (event: NavigationLayoutItemReorderEvent) => {
        args.onItemReorder?.(event);
        setGroups((previousGroups) =>
            reorderNavigationLayoutGroups({ groups: previousGroups, event }),
        );
    };

    return (
        <div ref={ref} style={{ height: '100vh' }}>
            <NavigationLayout {...args} groups={groups} onItemReorder={handleItemReorder} />
        </div>
    );
};

export const General = Template.bind({});

export const WithBackgroundImage = Template.bind({});

export const Mobile = Template.bind({});

WithBackgroundImage.args = {
    config: {
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        backgroundImage: 'https://tsimg.cloud/static/tobit-team/team_background.png',
        sidebarMaxWidth: 300,
        headerHeight: 70,
    },
    sidebarBottomContent: (
        <div style={{ maxWidth: 200, margin: '0 auto' }}>
            <img
                alt="Sidebar footer"
                style={{ width: '100%', filter: 'invert(1)' }}
                src="https://tsimg.cloud/static/tobit-team/team_david_icon.svg"
            />
        </div>
    ),
};

Mobile.args = {
    config: {
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        backgroundImage: 'https://tsimg.cloud/static/tobit-team/team_background.png',
        sidebarMaxWidth: 300,
        headerHeight: 70,
    },
    sidebarBottomContent: (
        <div style={{ maxWidth: 200, margin: '0 auto' }}>
            <img
                alt="Sidebar footer"
                style={{ width: '100%', filter: 'invert(1)' }}
                src="https://tsimg.cloud/static/tobit-team/team_david_icon.svg"
            />
        </div>
    ),
    isMobile: true,
};
