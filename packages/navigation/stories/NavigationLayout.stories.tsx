import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import NavigationLayout from '../src/components/navigation-layout/NavigationLayout';
import {
    NavigationLayoutGroup,
    NavigationLayoutProps,
} from '../src/components/navigation-layout/NavigationLayout.types';

const NAVIGATION_LAYOUT_GROUPS: NavigationLayoutGroup[] = [
    {
        title: 'Allgemein',
        items: [
            {
                id: 'dashboard',
                label: 'Dashboard',
            },
            {
                id: 'messages',
                label: 'Nachrichten',
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
        selectedItemId: 'dashboard',
        children: (
            <div style={{ padding: '24px' }}>
                <h2>Navigation Layout</h2>
                <p>Minimalbeispiel für den Content-Bereich.</p>
            </div>
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
