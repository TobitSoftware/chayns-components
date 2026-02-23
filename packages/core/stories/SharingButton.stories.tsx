import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ContextMenuAlignment } from '../src/components/context-menu/ContextMenu.types';
import SharingButton from '../src/components/sharing-button/SharingButton';

export default {
    title: 'Core/SharingButton',
    component: SharingButton,
    args: {
        link: 'https://components.chayns.net/',
        alignment: ContextMenuAlignment.BottomRight,
        children: 'Teilen',
    },
} as Meta<typeof SharingButton>;

const Template: StoryFn<typeof SharingButton> = (args) => <SharingButton {...args} />;

export const General = Template.bind({});

export const TopAlignment = Template.bind({});
TopAlignment.args = {
    alignment: ContextMenuAlignment.TopCenter,
};

export const BottomRightAlignment = Template.bind({});
BottomRightAlignment.args = {
    alignment: ContextMenuAlignment.BottomRight,
};

export const CustomLink = Template.bind({});
CustomLink.args = {
    link: 'https://github.com/TobitSoftware/chayns-components',
    alignment: ContextMenuAlignment.BottomLeft,
};

export const Disabled = Template.bind({});
Disabled.args = {
    isDisabled: true,
};
