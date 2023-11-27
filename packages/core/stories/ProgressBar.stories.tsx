import { Meta, StoryFn } from '@storybook/react';
import ProgressBar from '../src/components/progress-bar/ProgressBar';

export default {
    title: 'Core/ProgressBar',
    component: ProgressBar,
    args: {
        percentage: 34,
    },
} as Meta<typeof ProgressBar>;

const Template: StoryFn<typeof ProgressBar> = ({ ...args }) => <ProgressBar {...args} />;

export const General = Template.bind({});
