import Timeline from '../src/components/timeline/Timeline';
import mockData from '../mocks/mocks.json';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'Timeline/Timeline',
    component: Timeline,
    args: {
        events: mockData
    }
} as Meta<typeof Timeline>;

const Template: StoryFn<typeof Timeline> = (args) => <Timeline {...args} />;

export const General = Template.bind({});
