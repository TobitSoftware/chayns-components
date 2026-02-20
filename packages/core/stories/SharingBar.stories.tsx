import { Meta, StoryFn } from '@storybook/react';
import SharingBar from '../src/components/sharing-bar/SharingBar';
import React from 'react';
import { ContextMenuAlignment } from '../src';

export default {
    title: 'Core/SharingBar',
    component: SharingBar,
    args: {
        label: 'Teilen',
        link: 'https://components.chayns.net/',
        popupAlignment: ContextMenuAlignment.BottomRight,
    },
} as Meta<typeof SharingBar>;

const Template: StoryFn<typeof SharingBar> = (args) => <SharingBar {...args} />;

export const General = Template.bind({});
