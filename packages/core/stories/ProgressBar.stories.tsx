import { ComponentMeta, ComponentStory } from '@storybook/react';
import ProgressBar from '../src/components/progress-bar/ProgressBar';

export default {
    title: 'Core/ProgressBar',
    component: ProgressBar,
    args: {
        percentage: 34,
    },
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = ({ ...args }) => <ProgressBar {...args} />;

export const General = Template.bind({});
