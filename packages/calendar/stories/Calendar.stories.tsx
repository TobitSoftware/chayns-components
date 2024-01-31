import { Meta, StoryFn } from '@storybook/react';
import Calendar from '../src/components/calendar/Calendar';

export default {
    title: 'Calendar/Calendar',
    component: Calendar,
    args: {
        startDate: new Date('01-01-2020'),
        endDate: new Date('31-12-2026'),
    },
} as Meta<typeof Calendar>;

const Template: StoryFn<typeof Calendar> = ({ ...args }) => <Calendar {...args} />;

export const General = Template.bind({});
