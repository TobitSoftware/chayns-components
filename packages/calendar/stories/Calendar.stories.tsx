import { Meta, StoryFn } from '@storybook/react';
import Calendar from '../src/components/calendar/Calendar';

export default {
    title: 'Calendar/Calendar',
    component: Calendar,
    args: {},
} as Meta<typeof Calendar>;

const Template: StoryFn<typeof Calendar> = ({ ...args }) => <Calendar {...args} />;

export const General = Template.bind({});
