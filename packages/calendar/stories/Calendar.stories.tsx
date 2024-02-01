import { Meta, StoryFn } from '@storybook/react';
import Calendar from '../src/components/calendar/Calendar';

export default {
    title: 'Calendar/Calendar',
    component: Calendar,
    args: {
        startDate: new Date('2023-02-01T00:00:00+00:00'),
        endDate: new Date('2024-03-01T00:00:00+00:00'),
        highlightedDates: [
            {
                dates: [
                    new Date('Sat Feb 03 2024 00:00:00 GMT+0000'),
                    new Date('Thu Feb 01 2024 00:00:00 GMT+0000'),
                    new Date('Thu Feb 22 2024 00:00:00 GMT+0000'),
                ],
                style: { textColor: 'white', backgroundColor: 'blue' },
            },
            {
                dates: [new Date('Wed Feb 21 2024 00:00:00 GMT+0000')],
                style: { textColor: 'white', backgroundColor: 'red' },
            },
            {
                dates: [new Date('Tue Feb 20 2024 00:00:00 GMT+0000')],
                style: { textColor: 'white', backgroundColor: 'green' },
            },
        ],
    },
} as Meta<typeof Calendar>;

const Template: StoryFn<typeof Calendar> = ({ ...args }) => <Calendar {...args} />;

export const General = Template.bind({});
