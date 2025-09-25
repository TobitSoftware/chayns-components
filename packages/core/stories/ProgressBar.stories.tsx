import { Meta, StoryFn } from '@storybook/react';
import ProgressBar from '../src/components/progress-bar/ProgressBar';
import React from 'react';

export default {
    title: 'Core/ProgressBar',
    component: ProgressBar,
    args: {
        percentage: 34,
        label: 'Uploading...',
    },
} as Meta<typeof ProgressBar>;

const Template: StoryFn<typeof ProgressBar> = ({ ...args }) => <ProgressBar {...args} />;

export const General = Template.bind({});
export const InfinityProgressBar = Template.bind({});
export const AIServiceProgress = Template.bind({});

InfinityProgressBar.args = {
    percentage: undefined,
};

AIServiceProgress.args = {
    steps: [25, 50, 75, 95],
    shouldShowLabelInline: true,
    label: '34% verbraucht',
};
