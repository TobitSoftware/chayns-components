import { Meta, StoryFn } from '@storybook/react';
import ProgressBar from '../src/components/progress-bar/ProgressBar';
import React, { useState } from 'react';

export default {
    title: 'Core/ProgressBar',
    component: ProgressBar,
    args: {
        percentage: 34,
        label: 'Uploading...',
    },
} as Meta<typeof ProgressBar>;

const Template: StoryFn<typeof ProgressBar> = ({ ...args }) => <ProgressBar {...args} />;
const MovingTemplate: StoryFn<typeof ProgressBar> = ({ ...args }) => {
    const [percentage, setPercentage] = useState<number>(0);

    window.setTimeout(() => {
        setPercentage(Math.random() * 100);
    }, 1000 * 2);

    return <ProgressBar {...args} percentage={percentage as 0} />;
};

export const General = Template.bind({});
export const InfinityProgressBar = Template.bind({});
export const AIServiceProgress = Template.bind({});
export const MovingThumbLabel = MovingTemplate.bind({});

InfinityProgressBar.args = {
    percentage: undefined,
};

AIServiceProgress.args = {
    steps: [25, 50, 75, 95],
    shouldShowLabelInline: true,
    label: '34% verbraucht',
};

MovingThumbLabel.args = {
    shouldShowThumbLabel: true,
    thumbLabel: 'Beispiel Thumblabel',
};
