import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import ActionMenuButton from '../src/components/action-menu-button/ActionMenuButton';

export default {
    title: 'Core/ActionMenuButton',
    component: ActionMenuButton,
    args: {
        label: 'Erstellen',
        icon: 'ts-plus',
    },
} as Meta<typeof ActionMenuButton>;

const Template: StoryFn<typeof ActionMenuButton> = (args) => <ActionMenuButton {...args} />;

const contextMenuItems = [
    {
        key: '1',
        onClick: () => console.log('Chat clicked'),
        text: 'Chat',
        icons: ['ts-sidekick-chat'],
    },
    {
        key: '2',
        onClick: () => console.log('Gespräch clicked'),
        text: 'Gespräch',
        icons: ['fa fa-microphone'],
    },
];

export const Split = Template.bind({});

Split.args = {
    contextMenuItems,
    onClick: (e) => {
        alert('Primary Action Clicked');
        console.log(e);
    },
};

export const ActionOnly = Template.bind({});

ActionOnly.args = {
    onClick: (e) => {
        alert('Action Clicked');
        console.log(e);
    },
};

export const MenuOnly = Template.bind({});

MenuOnly.args = {
    contextMenuItems,
    label: 'Menu Button',
};

export const Disabled = Template.bind({});

Disabled.args = {
    contextMenuItems,
    onClick: () => {},
    isDisabled: true,
};
