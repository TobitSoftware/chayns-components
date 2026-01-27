import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React, { useEffect, useState } from 'react';
import DynamicToolbar from '../src/components/dynamic-toolbar/DynamicToolbar';
import {
    DynamicToolbarItem,
    DynamicToolbarLayout,
} from '../src/components/dynamic-toolbar/DynamicToolbar.types';

const BASIC_TOOLBAR_ITEMS: DynamicToolbarItem[] = [
    { id: 'sidekick', icons: ['ts-sidekick'], label: 'Sidekick', hasRightSeparator: true },
    { id: 'chat', icons: ['ts-chat'], label: 'Chat' },
    { id: 'witness', icons: ['fa fa-microphone'], label: 'Gespräche', badgeCount: 7 },
    { id: 'frontline', icons: ['fa fa-user-question'], label: 'Anfragen' },
    { id: 'notifications', icons: ['fa fa-bell'], label: 'Benachrichtigungen', badgeCount: 28 },
    { id: 'tasks', icons: ['fa fa-check-circle'], label: 'Aufgaben' },
    { id: 'settings', icons: ['fa fa-cog'], label: 'Einstellungen' },
];

const SCANNER_TOOLBAR_ITEMS: DynamicToolbarItem[] = [
    { id: 'chayns', icons: ['ts-chayns'], label: 'chayns' },
    { id: 'chat', icons: ['ts-chat'], label: 'Chat', badgeCount: 19 },
    { id: 'sidekick', icons: ['ts-sidekick-chat'], label: 'Sidekick' },
    { id: 'cards', icons: ['fa fa-rectangle-history'], label: 'Cards' },
    { id: 'id', icons: ['ts-fingerprint'], label: 'ID' },
    { id: 'money', icons: ['fa fa-euro-sign'], label: 'Geld', badgeCount: 5 },
    { id: 'space', icons: ['ts-space'], label: 'Space', isDisabled: true },
    { id: 'pages', icons: ['fa fa-list'], label: 'Pages' },
    { id: 'settings', icons: ['fa fa-cog'], label: 'Einstellungen' },
    { id: 'map', icons: ['fa fa-circle-location-arrow'], label: 'Map' },
];

export default {
    title: 'Navigation/DynamicToolbar',
    component: DynamicToolbar,
    parameters: {
        docs: {
            description: {
                component:
                    'Die DynamicToolbar blendet Aktionen je nach Breite automatisch aus, gruppiert sie im Overflow-Menü und lässt sich zwischen Floating- und Area-Layout umschalten.',
            },
        },
    },
    argTypes: {
        layout: {
            control: { type: 'inline-radio' },
            options: Object.values(DynamicToolbarLayout),
        },
        isVisible: { control: { type: 'boolean' } },
        items: { control: false },
    },
    args: {
        activeItemId: 'chat',
        items: BASIC_TOOLBAR_ITEMS,
        layout: DynamicToolbarLayout.Floating,
        onItemSelect: action('onItemSelect'),
    },
} as Meta<typeof DynamicToolbar>;

const Template: StoryFn<typeof DynamicToolbar> = (args) => {
    const [activeItemId, setActiveItemId] = useState(args.activeItemId ?? null);

    useEffect(() => {
        setActiveItemId(args.activeItemId ?? null);
    }, [args.activeItemId]);

    const handleItemSelect = (item: DynamicToolbarItem) => {
        args.onItemSelect?.(item);
        setActiveItemId(item.id);
    };

    return (
        <div style={{ minHeight: '140vh', padding: '32px 16px', background: '#f5f6f8' }}>
            <p style={{ maxWidth: 480 }}>
                Scrolle die Seite oder passe die Controls an, um Overflow-Trigger,
                Auto-Hide-Verhalten und unterschiedliche Layout-Varianten zu prüfen.
            </p>
            <DynamicToolbar
                {...args}
                activeItemId={activeItemId ?? undefined}
                onItemSelect={handleItemSelect}
            />
        </div>
    );
};

export const FloatingBasicLayout = Template.bind({});

export const FloatingScannerLayout = Template.bind({});

export const FlushBasicLayout = Template.bind({});

export const FlushScannerLayout = Template.bind({});

FloatingScannerLayout.args = {
    items: SCANNER_TOOLBAR_ITEMS,
};

FlushBasicLayout.args = {
    layout: DynamicToolbarLayout.Area,
};

FlushScannerLayout.args = {
    layout: DynamicToolbarLayout.Area,
    items: SCANNER_TOOLBAR_ITEMS,
};
