import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React, { useEffect, useState } from 'react';
import DynamicToolbar from '../src/components/dynamic-toolbar/DynamicToolbar';
import {
    DynamicToolbarItem,
    DynamicToolbarLayout,
} from '../src/components/dynamic-toolbar/DynamicToolbar.types';

const TOOLBAR_ITEMS: DynamicToolbarItem[] = [
    { id: 'chat', icons: ['far fa-comment'], label: 'Chat', badgeCount: 4 },
    { id: 'customers', icons: ['far fa-users'], label: 'Kunden' },
    { id: 'files', icons: ['far fa-folder-open'], label: 'Dateien' },
    { id: 'notifications', icons: ['far fa-bell'], label: 'Benachrichtigungen', badgeCount: 28 },
    { id: 'tasks', icons: ['far fa-check-circle'], label: 'Aufgaben' },
    { id: 'announcements', icons: ['far fa-bullhorn'], label: 'Ankündigungen', isDisabled: true },
    { id: 'settings', icons: ['far fa-cog'], label: 'Einstellungen' },
];

export default {
    title: 'Navigation/DynamicToolbar',
    component: DynamicToolbar,
    parameters: {
        docs: {
            description: {
                component:
                    'Die DynamicToolbar blendet Aktionen je nach Breite automatisch aus, gruppiert sie im Overflow-Menü und lässt sich zwischen Floating- und Flush-Layout umschalten.',
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
        items: TOOLBAR_ITEMS,
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

export const FloatingLayout = Template.bind({});

export const FlushLayout = Template.bind({});

FlushLayout.args = {
    layout: DynamicToolbarLayout.Flush,
    activeItemId: 'files',
};

FlushLayout.parameters = {
    docs: {
        description: {
            story: 'Die FLUSH-Variante dockt bündig am unteren Viewportrand an und blendet keine zusätzlichen Aktionen aus.',
        },
    },
};
